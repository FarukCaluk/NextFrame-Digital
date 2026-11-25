// The home page hero: film strips made of the studio's photos, curved through space, in plain WebGL2.
// World units are CSS pixels at depth 0, with the origin in the middle of the canvas and y pointing up.
// Vertices are computed here every frame, so the same numbers draw the film and answer "what was clicked".

export type Frame = {
  slug: string;
  title: string;
  src: string;
  aspect: number; // width / height
  urls: [width: number, url: string][]; // ascending widths
};

export type Layout = { width: number; height: number; areaTop: number; areaHeight: number };

type Strip = {
  screenY: number; // wanted centre on screen
  depth: number; // distance behind the screen plane, as a share of the camera distance
  size: number; // film height on screen
  wave: number; // up and down, share of the film height
  swing: number; // towards and away from the camera, share of the canvas width
  twist: number; // radians
  slope: number;
  speed: number; // px per second along the film
  follow: number; // how much drag and scroll move it
  dim: number;
  blur: number; // texture level of detail bias, a cheap depth of field
  phase: number;
  first: number; // frame that starts the cycle, so the strips do not look alike
};

type Slot = { frame: number; start: number; width: number };

type Built = Strip & {
  h: number;
  z: number;
  y: number;
  scale: number; // world units per screen pixel at this depth
  slots: Slot[];
  length: number;
  reach: number; // visible distance from the middle, along the film
  pitch: number; // sprocket holes
  textPeriod: number;
  u: Float32Array; // horizontal position for evenly spaced distances along the film
  offset: number;
};

type Shape = { slot: number; frame: number; points: number[] };

const VERTEX = `#version 300 es
layout(location = 0) in vec3 aPosition;
layout(location = 1) in vec2 aLocal;
layout(location = 2) in vec2 aLight;
uniform mat4 uMatrix;
out vec2 vLocal;
out vec2 vLight;
void main() {
  vLocal = aLocal;
  vLight = aLight;
  gl_Position = uMatrix * vec4(aPosition, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;
in vec2 vLocal;   // x along the film from the frame start, y from the top edge
in vec2 vLight;   // x fade at the ends, y light on the surface
uniform vec2 uSize;
uniform vec2 uWindow; // photo inset: side and band
uniform float uStart, uPitch, uTextPeriod, uDim, uBlur, uReady, uAlpha;
uniform float uCard; // above 0 while drawing a lifted photo on its own
uniform sampler2D uPhoto, uText;
out vec4 color;

float box(vec2 p, vec2 halfSize, float r) {
  vec2 q = abs(p) - halfSize + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec2 p = vLocal;
  float h = uSize.y;
  float band = uWindow.y;
  float aa = max(fwidth(p.y), 0.6);
  float along = p.x + uStart;
  vec3 gold = vec3(0.992, 0.733, 0.012);

  // Smoked glass base with a lit top edge and a gold bottom edge.
  vec3 col = mix(vec3(0.17, 0.165, 0.17), vec3(0.06, 0.06, 0.07), p.y / h) * vLight.y;
  col += 0.42 * (1.0 - smoothstep(0.0, 2.2 * aa, p.y));
  col += gold * 0.6 * (1.0 - smoothstep(0.0, 2.2 * aa, h - p.y));
  float alpha = 0.92;

  // Edge print under the photo.
  float ty = (p.y - (h - band * 0.97)) / (band * 0.4);
  float ink = texture(uText, vec2(along / uTextPeriod, ty), uBlur).a;
  col = mix(col, gold, ink * step(0.0, ty) * step(ty, 1.0) * 0.85);

  // Sprocket holes, see-through with a glass rim.
  vec2 hp = vec2(mod(along, uPitch) - uPitch * 0.5, min(p.y, h - p.y) - band * 0.34);
  float hole = box(hp, vec2(uPitch * 0.23, band * 0.17), band * 0.08);
  float rim = 1.0 - smoothstep(0.0, 1.6 * aa, abs(hole));
  alpha *= smoothstep(-aa, aa, hole);
  col = mix(col, vec3(0.75), rim * 0.5);
  alpha = max(alpha, rim * 0.45);

  // The photo, in true colour apart from a little shade where the film turns away.
  vec2 inner = uSize - 2.0 * uWindow;
  float d = box(p - uSize * 0.5, inner * 0.5, h * 0.032);
  vec3 photo = texture(uPhoto, (p - uWindow) / inner, uBlur).rgb;
  photo = mix(vec3(0.1), photo, uReady) * min(1.0, mix(1.0, vLight.y, 0.3));
  float inside = 1.0 - smoothstep(-aa, aa, d);
  float edge = 1.0 - smoothstep(0.0, 1.4 * aa, abs(d));
  float shown = vLight.x * uAlpha;

  if (uCard > 0.0) {
    // A lifted print: the same photo, a bright edge and a soft shadow on the film below.
    float shadow = (1.0 - inside) * 0.55 * uCard * (1.0 - smoothstep(0.0, 18.0, d));
    float a = max(inside + shadow, edge * 0.4);
    color = vec4(photo * inside + edge * 0.4 * uCard, a) * shown;
    return;
  }

  col = mix(col, photo, inside) + 0.2 * edge;
  alpha = mix(alpha, 1.0, inside);
  color = vec4(col * uDim, 1.0) * alpha * shown;
}`;

type Mat = number[]; // column major 4x4

const multiply = (a: Mat, b: Mat): Mat => {
  const out = new Array<number>(16);
  for (let c = 0; c < 4; c++)
    for (let r = 0; r < 4; r++)
      out[c * 4 + r] =
        a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
  return out;
};

/** Perspective camera `distance` away from the screen plane, tilted by yaw and pitch around the origin. */
function camera(width: number, height: number, distance: number, yaw: number, pitch: number): Mat {
  const near = distance * 0.1;
  const far = distance * 8;
  const f = (2 * distance) / height;
  const projection = [f * (height / width), 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) / (near - far), -1, 0, 0, (2 * far * near) / (near - far), 0];
  const back = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -distance, 1];
  const [cx, sx, cy, sy] = [Math.cos(pitch), Math.sin(pitch), Math.cos(yaw), Math.sin(yaw)];
  const rotateX = [1, 0, 0, 0, 0, cx, sx, 0, 0, -sx, cx, 0, 0, 0, 0, 1];
  const rotateY = [cy, 0, -sy, 0, 0, 1, 0, 0, sy, 0, cy, 0, 0, 0, 0, 1];
  return multiply(projection, multiply(back, multiply(rotateX, rotateY)));
}

const smooth = (from: number, to: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - from) / (to - from)));
  return t * t * (3 - 2 * t);
};
const wrap = (x: number, length: number) => ((((x + length / 2) % length) + length) % length) - length / 2;

function inside(points: number[], x: number, y: number) {
  let hit = false;
  for (let i = 0, j = points.length - 2; i < points.length; j = i, i += 2) {
    const [xi, yi, xj, yj] = [points[i], points[i + 1], points[j], points[j + 1]];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

function compile(gl: WebGL2RenderingContext) {
  const p = gl.createProgram();
  for (const [type, source] of [
    [gl.VERTEX_SHADER, VERTEX],
    [gl.FRAGMENT_SHADER, FRAGMENT],
  ] as const) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(p, shader);
    gl.deleteShader(shader);
  }
  gl.linkProgram(p);
  return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
}

const COLUMN = 9; // px between vertex columns; wider ones bend the print where the film twists
const STEP = 8; // px between entries of the distance table
const FLOATS = 7;

export type Film = ReturnType<typeof createFilm>;

/** Returns null when WebGL2 is not available. `still` turns off all self-running motion. */
export function createFilm(canvas: HTMLCanvasElement, frames: Frame[], still: boolean) {
  const context = canvas.getContext("webgl2", { antialias: true, alpha: true, premultipliedAlpha: true });
  const compiled = context && compile(context);
  if (!context || !compiled) return null;
  const gl: WebGL2RenderingContext = context;
  const program: WebGLProgram = compiled;

  const uniform = Object.fromEntries(
    ["uMatrix", "uSize", "uWindow", "uStart", "uPitch", "uTextPeriod", "uDim", "uBlur", "uReady", "uAlpha", "uCard", "uPhoto", "uText"].map(
      (name) => [name, gl.getUniformLocation(program, name)],
    ),
  );
  const vao = gl.createVertexArray();
  const buffer = gl.createBuffer();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  [3, 2, 2].reduce((offset, size, location) => {
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, FLOATS * 4, offset * 4);
    return offset + size;
  }, 0);

  const anisotropy = gl.getExtension("EXT_texture_filter_anisotropic");
  const texture = (source: TexImageSource | null, repeat = false) => {
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    if (source) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      if (anisotropy) gl.texParameterf(gl.TEXTURE_2D, anisotropy.TEXTURE_MAX_ANISOTROPY_EXT, 4);
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
    return t;
  };

  const empty = texture(null);
  const photos = frames.map(() => ({ texture: null as WebGLTexture | null, ready: 0, requested: false }));
  let text = empty;
  let textAspect = 16;
  let alive = true;

  // The film's edge print, drawn once in the page font.
  document.fonts.ready.then(() => {
    if (!alive) return;
    const c = document.createElement("canvas");
    const g = c.getContext("2d")!;
    const font = `700 44px ${getComputedStyle(document.body).fontFamily}`;
    const words = "NEXTFRAME DIGITAL   ▸   OD IDEJE DO VIZIJE   ▸   ";
    g.font = font;
    g.letterSpacing = "4px";
    c.width = Math.ceil(g.measureText(words).width);
    c.height = 64;
    g.font = font;
    g.letterSpacing = "4px";
    g.textBaseline = "middle";
    g.fillStyle = "#fff";
    g.fillText(words, 0, 34);
    textAspect = c.width / c.height;
    text = texture(c, true);
    if (built.length) resize(layout!);
  });

  let layout: Layout | null = null;
  let built: Built[] = [];
  let distance = 1000;
  let dpr = 1;
  let photoHeight = 0;
  let vertices = new Float32Array(0);

  const pointer = { x: 0, y: 0 }; // -1..1, where the camera wants to look from
  const look = { x: 0, y: 0 };
  let scrolled = 0; // 0..1 share of the hero scrolled away
  let velocity = 0; // px per second given by drag and scroll
  let hovered = -1; // slot of the front strip
  const lift: number[] = [];
  let pace = 1;
  let clock = 0;
  let last = 0;
  let request = 0;
  let dirty = true;
  let shapes: Shape[] = [];

  /** Downloads a photo when its frame first comes near the screen, at the size the front strip needs. */
  function fetchPhoto(i: number) {
    if (photos[i].requested) return;
    photos[i].requested = true;
    const f = frames[i];
    // A little spare, because the nearest and the lifted photos are drawn larger than the film is tall.
    const wanted = f.aspect * photoHeight * dpr * 1.15;
    const [, url] = f.urls.find(([w]) => w >= wanted) ?? f.urls[f.urls.length - 1];
    const image = new Image();
    image.decoding = "async";
    image.src = url;
    image
      .decode()
      .then(() => {
        if (!alive) return;
        photos[i].texture = texture(image);
        dirty = true;
      })
      .catch(() => {}); // the frame keeps its dark placeholder
  }

  /** Point, up and normal of a strip at `s` pixels along the film. */
  function surface(strip: Built, s: number, grow: number) {
    const { u, reach, h, scale } = strip;
    const width = layout!.width * scale;
    const position = Math.min(u.length - 1.001, Math.max(0, s / STEP + (u.length - 1) / 2));
    const i = Math.floor(position);
    const x = u[i] + (u[i + 1] - u[i]) * (position - i);
    const at = (px: number) => {
      const t = (px / width) * Math.PI * 2;
      return [
        px,
        strip.y + grow * strip.wave * h * Math.sin(t / 1.45 + strip.phase) + px * strip.slope * grow,
        strip.z + grow * strip.swing * width * Math.sin(t / 1.3 + strip.phase * 0.6 - 1.1),
      ];
    };
    const p = at(x);
    const a = at(x - 2);
    const b = at(x + 2);
    const length = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    const t = [(b[0] - a[0]) / length, (b[1] - a[1]) / length, (b[2] - a[2]) / length];
    // Up is the world's up made square to the film, then twisted around it.
    let up = [-t[0] * t[1], 1 - t[1] * t[1], -t[2] * t[1]];
    const upLength = Math.hypot(...up);
    up = up.map((v) => v / upLength);
    const n = [t[1] * up[2] - t[2] * up[1], t[2] * up[0] - t[0] * up[2], t[0] * up[1] - t[1] * up[0]];
    const roll = grow * strip.twist * Math.sin(((x / width) * Math.PI * 2) / 1.2 + strip.phase * 1.7);
    const [c, sn] = [Math.cos(roll), Math.sin(roll)];
    return {
      p,
      up: [up[0] * c + n[0] * sn, up[1] * c + n[1] * sn, up[2] * c + n[2] * sn],
      normal: [n[0] * c - up[0] * sn, n[1] * c - up[1] * sn, n[2] * c - up[2] * sn],
      fade: 1 - smooth(reach * 0.78, reach, Math.abs(s)),
    };
  }

  function resize(next: Layout) {
    layout = next;
    const { width, height, areaTop, areaHeight } = next;
    // Cap the pixel count: sharp on phones and laptops without melting large screens.
    dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(4_500_000 / (width * height)));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    distance = height / 2 / Math.tan((15 * Math.PI) / 180);

    const narrow = width < 768;
    const main = Math.min(areaHeight * 0.7, width * 0.68, 390);
    const middle = height / 2 - (areaTop + areaHeight * 0.5);
    const strips: Strip[] = [
      // Back to front: two soft strips for depth, then the one people grab.
      { screenY: height * 0.04, depth: 1.05, size: main * 0.58, wave: 0.7, swing: 0.1, twist: 0.5, slope: 0.16, speed: 12, follow: 0.18, dim: narrow ? 0.22 : 0.3, blur: 2.4, phase: 4.1, first: 9 },
      { screenY: height * (narrow ? 0.4 : 0.24), depth: 0.55, size: main * 0.66, wave: 0.45, swing: 0.12, twist: 0.42, slope: -0.13, speed: 20, follow: -0.35, dim: narrow ? 0.3 : 0.46, blur: 1.3, phase: 2.2, first: 5 },
      { screenY: middle, depth: 0, size: main, wave: 0.12, swing: 0.15, twist: 0.2, slope: 0.035, speed: -26, follow: 1, dim: 1, blur: 0, phase: 0.8, first: 0 },
    ];

    built = strips.map((strip, index) => {
      const z = -strip.depth * distance;
      const scale = (distance - z) / distance;
      const h = strip.size * scale;
      const band = h * 0.14;
      const widths = frames.map((f) => (h - 2 * band) * f.aspect + h * 0.05);
      const widest = Math.max(...widths);
      const reach = (width / 2) * scale * 1.3 + 60;
      const slots: Slot[] = [];
      let length = 0;
      for (let i = 0; i < frames.length || length < 2 * (reach + widest); i++) {
        const frame = (strip.first + i) % frames.length;
        slots.push({ frame, start: length, width: widths[frame] });
        length += widths[frame];
      }

      // Distance along the film for many horizontal positions, then inverted into even steps.
      const span = reach + widest + 40;
      const half = Math.ceil(span / STEP);
      const u = new Float32Array(half * 2 + 1);
      const w = width * scale;
      const speedAt = (x: number) => {
        const t = (x / w) * Math.PI * 2;
        const dy = strip.wave * h * Math.cos(t / 1.45 + strip.phase) * ((Math.PI * 2) / 1.45 / w) + strip.slope;
        const dz = strip.swing * w * Math.cos(t / 1.3 + strip.phase * 0.6 - 1.1) * ((Math.PI * 2) / 1.3 / w);
        return Math.hypot(1, dy, dz);
      };
      for (const direction of [1, -1]) {
        let x = 0;
        for (let i = 1; i <= half; i++) {
          x += (direction * STEP) / speedAt(x + (direction * STEP) / 2);
          u[half + direction * i] = x;
        }
      }

      const textHeight = band * 0.4;
      return {
        ...strip,
        h,
        z,
        scale,
        y: strip.screenY * scale,
        slots,
        length,
        reach,
        pitch: length / Math.round(length / (h * 0.085)),
        textPeriod: length / Math.max(1, Math.round(length / (textHeight * textAspect))),
        u,
        offset: built[index]?.offset ?? -slots[0].width / 2, // a new film starts with a photo in the middle
      };
    });

    const longest = Math.max(...built.flatMap((s) => s.slots.map((slot) => slot.width)));
    vertices = new Float32Array((Math.ceil(longest / COLUMN) + 2) * 2 * FLOATS);
    photoHeight = main * 0.72; // the film without its two perforated bands
    hovered = -1;
    dirty = true;
  }

  function draw() {
    const { width, height } = layout!;
    const intro = still ? 1 : 1 - Math.pow(1 - Math.min(1, clock / 2.2), 4);
    const matrix = camera(width, height, distance, -look.x * 0.085, look.y * 0.05 + scrolled * 0.16);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniformMatrix4fv(uniform.uMatrix, false, matrix);
    gl.uniform1i(uniform.uPhoto, 0);
    gl.uniform1i(uniform.uText, 1);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, text);
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1f(uniform.uAlpha, still ? 1 : Math.min(1, clock / 0.9));

    shapes = [];
    built.forEach((strip, index) => {
      const front = index === built.length - 1;
      const { h, length, reach, slots } = strip;
      const roll = (1 - intro) * width * 0.7 * Math.sign(-strip.speed);
      const visible = slots
        .map((slot, i) => ({ slot, i, centre: wrap(slot.start + slot.width / 2 + strip.offset + roll, length) }))
        .filter((v) => Math.abs(v.centre) - v.slot.width / 2 < reach)
        .map((v) => ({ ...v, z: surface(strip, v.centre, intro).p[2] }))
        .sort((a, b) => a.z - b.z); // farthest first

      gl.uniform1f(uniform.uPitch, strip.pitch);
      gl.uniform1f(uniform.uTextPeriod, strip.textPeriod);
      gl.uniform1f(uniform.uDim, strip.dim);
      gl.uniform1f(uniform.uBlur, strip.blur);

      const side = h * 0.025;
      const band = h * 0.14;
      for (const piece of visible) fetchPhoto(piece.slot.frame);
      const paint = ({ slot, centre }: (typeof visible)[number], card: number) => {
        // The whole piece of film, or only the photo (plus room for its shadow) when it is lifted.
        const margin = 18;
        const [x0, x1, y0, y1] = card
          ? [side - margin, slot.width - side + margin, band - margin, h - band + margin]
          : [0, slot.width, 0, h];
        const columns = Math.ceil((x1 - x0) / COLUMN);
        const middle = surface(strip, centre, intro);
        let n = 0;
        for (let column = 0; column <= columns; column++) {
          const x = x0 + ((x1 - x0) * column) / columns;
          const s = surface(strip, centre - slot.width / 2 + x, intro);
          const light = 0.62 + 0.5 * Math.max(0, s.normal[0] * 0.23 + s.normal[1] * 0.45 + s.normal[2] * 0.86);
          for (const y of [y0, y1]) {
            // A lifted photo grows about its middle and comes forward; its light stays the same.
            const vertex = s.p.map((v, axis) => {
              const flat = v + s.up[axis] * (h / 2 - y);
              return middle.p[axis] + (flat - middle.p[axis]) * (1 + 0.08 * card) + middle.normal[axis] * 40 * card;
            });
            vertices.set([vertex[0], vertex[1], vertex[2], x, y, s.fade, light], n);
            n += FLOATS;
          }
        }
        const photo = photos[slot.frame];
        gl.bindTexture(gl.TEXTURE_2D, photo.texture ?? empty);
        gl.uniform1f(uniform.uReady, photo.ready);
        gl.uniform1f(uniform.uCard, card);
        gl.uniform2f(uniform.uSize, slot.width, h);
        gl.uniform2f(uniform.uWindow, side, band);
        gl.uniform1f(uniform.uStart, slot.start);
        gl.bufferData(gl.ARRAY_BUFFER, vertices.subarray(0, n), gl.DYNAMIC_DRAW);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, n / FLOATS);
        return n;
      };

      for (const piece of visible) {
        const n = paint(piece, 0);
        if (!front) continue;
        // Outline on screen, for clicking: along the top edge, then back along the bottom.
        const top: number[] = [];
        const bottom: number[][] = [];
        for (let v = 0; v < n; v += FLOATS) {
          const [x, y, z] = [vertices[v], vertices[v + 1], vertices[v + 2]];
          const w = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15];
          const point = [
            (((matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12]) / w + 1) / 2) * width,
            ((1 - (matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13]) / w) / 2) * height,
          ];
          if ((v / FLOATS) % 2) bottom.unshift(point);
          else top.push(...point);
        }
        shapes.push({ slot: piece.i, frame: piece.slot.frame, points: [...top, ...bottom.flat()] });
      }
      if (front) {
        for (const piece of visible) if ((lift[piece.i] ?? 0) > 0.01) paint(piece, lift[piece.i]);
      }
    });
  }

  function tick(now: number) {
    request = requestAnimationFrame(tick);
    const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
    last = now;
    if (!layout) return;
    clock += dt;

    const ease = Math.min(1, dt * 4);
    const moving = Math.abs(velocity) > 1 || Math.abs(pointer.x - look.x) + Math.abs(pointer.y - look.y) > 0.001;
    look.x += (pointer.x - look.x) * ease;
    look.y += (pointer.y - look.y) * ease;
    pace += ((hovered < 0 ? 1 : 0.12) - pace) * ease;
    for (const strip of built) {
      strip.offset += ((still ? 0 : strip.speed * pace) + velocity * strip.follow) * dt;
    }
    velocity *= Math.exp(-dt * 3.2);

    let settling = false;
    const front = built[built.length - 1];
    for (let i = 0; i < front.slots.length; i++) {
      const target = i === hovered ? 1 : 0;
      const value = lift[i] ?? 0;
      if (Math.abs(target - value) > 0.002) settling = true;
      lift[i] = value + (target - value) * Math.min(1, dt * 9);
    }
    for (const photo of photos) {
      if (photo.texture && photo.ready < 1) {
        photo.ready = Math.min(1, photo.ready + dt * 2.5);
        settling = true;
      }
    }

    // A still film only repaints when something changed.
    if (!still || dirty || moving || settling) draw();
    dirty = false;
  }

  return {
    resize,
    run(on: boolean) {
      if (on && !request) {
        last = 0;
        request = requestAnimationFrame(tick);
      } else if (!on && request) {
        cancelAnimationFrame(request);
        request = 0;
      }
    },
    /** Camera parallax, from -1 to 1 on both axes. */
    look(x: number, y: number) {
      if (still) return;
      pointer.x = x;
      pointer.y = y;
    },
    scroll(share: number, delta: number) {
      scrolled = share;
      if (!still) velocity = Math.max(-1600, Math.min(1600, velocity - delta * 2.4));
      dirty = true;
    },
    /** Moves the film with the finger or mouse. */
    drag(dx: number) {
      velocity = 0;
      for (const strip of built) strip.offset += dx * strip.follow;
      dirty = true;
    },
    release(speed: number) {
      if (!still) velocity = Math.max(-2600, Math.min(2600, speed));
    },
    /** Frame of the front strip under a point of the canvas. */
    pick(x: number, y: number) {
      for (let i = shapes.length - 1; i >= 0; i--) {
        if (inside(shapes[i].points, x, y)) return shapes[i];
      }
      return null;
    },
    hover(slot: number) {
      if (slot !== hovered) dirty = true;
      hovered = slot;
    },
    destroy() {
      alive = false;
      cancelAnimationFrame(request);
      request = 0;
      for (const photo of photos) gl.deleteTexture(photo.texture);
      gl.deleteTexture(empty);
      if (text !== empty) gl.deleteTexture(text);
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    },
  };
}
