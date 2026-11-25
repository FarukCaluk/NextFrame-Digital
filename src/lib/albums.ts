import data from "./albums.json";

// albums.json lists the files in public/images/radovi: one folder per album, numbered 01.jpg upwards.

export type Category = "Vjenčanja" | "Sport" | "Događaji" | "Brendovi";
export type Photo = { src: string; alt: string; w: number; h: number };
export type Album = { slug: string; title: string; category: Category; cover: Photo; photos: Photo[] };

export const categories: Category[] = ["Vjenčanja", "Sport", "Događaji", "Brendovi"];

/** Anchor of each category's section on the gallery page. */
export const categoryId: Record<Category, string> = {
  Vjenčanja: "vjencanja",
  Sport: "sport",
  Događaji: "dogadjaji",
  Brendovi: "brendovi",
};

/** Bosnian plural: 1 album, 2 to 4 albuma, 5 and more albuma (but 11 to 14 count as "more"). */
export function plural(n: number, one: string, few: string, many: string) {
  const teen = n % 100 >= 11 && n % 100 <= 14;
  if (n % 10 === 1 && !teen) return one;
  return n % 10 >= 2 && n % 10 <= 4 && !teen ? few : many;
}

export const albums: Album[] = data.albums.map((a) => {
  const photos = a.photos.map((p, i) => ({ ...p, alt: `${a.title}, fotografija ${i + 1}` }));
  return { slug: a.slug, title: a.title, category: a.category as Category, cover: photos[a.cover], photos };
});

const designAlts = [
  "Objava za MobiFon Shop, novi telefon",
  "Objava za stomatološku ordinaciju Dr. Karić, od pregleda do osmijeha",
  "Objava za stomatološku ordinaciju Dr. Karić, priča sa osmijehom",
  "Objava za MobiFon Shop, poređenje telefona",
  "Objava za Sky Parking & Fly, parking noću",
  "Objava za Sky Parking & Fly, video nadzor",
  "Objava za Sky Parking & Fly Sarajevo",
  "Objava za Caffe & Restaurant Rondo, novo izdanje",
  "Plakat za koncert Šejle Zonić u Kaknju",
];

export const designs: Photo[] = data.designs.map((d, i) => ({ ...d, alt: designAlts[i] ?? "Dizajn" }));

/** The designs sorted by who they were made for. */
export const designGroups = [
  { client: "Sky Parking & Fly", items: [4, 5, 6] },
  { client: "MobiFon Shop", items: [0, 3] },
  { client: "Stomatološka ordinacija Dr. Karić", items: [1, 2] },
  { client: "Rondo i plakati", items: [7, 8] },
].map((g) => ({ client: g.client, designs: g.items.map((i) => designs[i]) }));

export function album(slug: string): Album {
  const found = albums.find((a) => a.slug === slug);
  if (!found) throw new Error(`Unknown album: ${slug}`);
  return found;
}

/** Photo by its file number, e.g. photo("matura", 3) is /images/radovi/matura/03.jpg. */
export const photo = (slug: string, n: number): Photo => album(slug).photos[n - 1];
