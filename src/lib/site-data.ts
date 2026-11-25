export const site = {
  name: "NextFrame Digital",
  tagline: "Od ideje do vizije",
  description:
    "Fotografija, video, dron, dizajn i marketing na jednom mjestu. Za vjenčanja, sportske klubove i brendove.",
  instagram: "https://www.instagram.com/nextframe.digital/",
  facebook: "https://www.facebook.com/people/NextFrame/61566391409715/",
  linkedin: "https://www.linkedin.com/in/armin-%C5%A1olbi%C4%87-b1298325b/",
  email: "nextframe.digital2025@gmail.com",
};

export const nav = [
  { href: "/o-nama", label: "O nama" },
  { href: "/usluge", label: "Usluge" },
  { href: "/galerija", label: "Galerija" },
  { href: "/partneri", label: "Partneri" },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  images: string[];
  reelGroup?: ReelGroup;
  preview?: string;
};

export type ReelGroup = "Dron" | "Vjenčanja" | "Marketing";

const reel = (id: string) => `https://www.facebook.com/reel/${id}/`;

export const services: Service[] = [
  {
    slug: "vjencanja",
    title: "Vjenčanja",
    short: "Foto i video vjenčanja",
    description:
      "Foto i video priča vašeg vjenčanja, snimljena prirodno, od priprema do slavlja.",
    images: [
      "/images/radovi/vjencanje-03/02.jpg",
      "/images/radovi/vjencanje-06/11.jpg",
      "/images/radovi/vjencanje-09/02.jpg",
    ],
    reelGroup: "Vjenčanja",
    preview: "/images/radovi/vjencanje-06/09.jpg",
  },
  {
    slug: "foto-video",
    title: "Foto i video",
    short: "Sport, događaji, brendovi",
    description:
      "Fotografija i video za sportske klubove, koncerte, mature, brendove i promotivne sadržaje.",
    images: [
      "/images/radovi/bilijar/04.jpg",
      "/images/radovi/kakanjski-dani/03.jpg",
      "/images/radovi/matura/03.jpg",
    ],
    preview: "/images/radovi/kakanjski-dani/03.jpg",
  },
  {
    slug: "dron",
    title: "Dron",
    short: "Snimci iz zraka",
    description:
      "Snimci iz zraka za gradove, prirodu, objekte i događaje.",
    images: [],
    reelGroup: "Dron",
  },
  {
    slug: "dizajn",
    title: "Dizajn",
    short: "Brendovi i društvene mreže",
    description:
      "Dizajn za brendove i društvene mreže: objave, plakati i promotivne grafike.",
    images: [],
    preview: "/images/radovi/dizajn/09.jpg",
  },
  {
    slug: "marketing",
    title: "Marketing",
    short: "Sadržaj i društvene mreže",
    description:
      "Digitalni marketing i vođenje društvenih mreža: planiranje sadržaja, snimanje i objavljivanje.",
    images: [],
    reelGroup: "Marketing",
    preview: "/images/radovi/sweetspot/02.jpg",
  },
];

export type Reel = {
  url: string;
  title: string;
  tag?: string;
  group: ReelGroup;
  featured?: boolean;
};

// Facebook refuses to embed these, so they are left out: Kakanj iz zraka (1381225033688486),
// "dok je Bosna ne rodi" (960944763143288), "Malo je malo dana" (935646858820984)
// and the Adin Boutique trenerke video post.
export const reels: Reel[] = [
  { url: reel("1636356934156393"), title: "Neretva iz zraka", group: "Dron", featured: true },
  { url: reel("884225184613850"), title: "Gotiva iz ptičije perspektive", group: "Dron" },
  { url: reel("850736400638968"), title: "Plastenici iz zraka", group: "Dron" },
  { url: reel("1465524891605698"), title: "Vjenčanja", tag: "NextFrame", group: "Vjenčanja", featured: true },
  { url: reel("2085375498717968"), title: "Dr. Karić", tag: "Stomatološka ordinacija", group: "Marketing", featured: true },
  { url: reel("954010560459453"), title: "Dr. Karić", tag: "Rezervacija termina", group: "Marketing" },
  { url: reel("882032824911856"), title: "Adin Boutique", tag: "Nova kolekcija", group: "Marketing", featured: true },
  { url: reel("1058319456728179"), title: "Adin Boutique", tag: "Osvježi stil", group: "Marketing" },
  { url: reel("3484208181877704"), title: "MobiFon Shop", group: "Marketing" },
  { url: reel("1446142411906465"), title: "Sky Parking & Fly", group: "Marketing" },
  { url: reel("28825078587089597"), title: "Sky Parking & Fly", group: "Marketing" },
  { url: reel("27047715528147303"), title: "Priča uzgajivača", tag: "Video priča", group: "Marketing" },
];

export const reelGroups: ReelGroup[] = ["Dron", "Vjenčanja", "Marketing"];

/** The long film shown large above the reels. It lives on YouTube; the poster is a frame from it. */
export const featuredVideo = {
  youtube: "63Kq0qksdk8",
  title: "Tuning Show Breza – Edition One 2026",
  note: "Aftermovie prvog tuning showa u Brezi, sa snimcima iz zraka.",
  poster: "/images/video/breza-edition-one.jpg",
};

/** A picture on the partners page. `contain` shows designed graphics whole; `wide` takes two places. */
export type Shot = { src: string; contain?: boolean; wide?: boolean; position?: string };

export type Partner = {
  name: string;
  logo?: string;
  href?: string;
  /** Slug of the photo album shown for this partner. */
  album?: string;
  /** What was done for them, and up to three pictures of it. Partners without pictures only link out. */
  work?: string;
  shots?: Shot[];
};

const L = "/images/partners/";
const ig = (handle: string) => `https://www.instagram.com/${handle}/`;
const shot = (folder: string, n: number, more?: Omit<Shot, "src">): Shot => ({
  src: `/images/radovi/${folder}/${String(n).padStart(2, "0")}.jpg`,
  ...more,
});
const design = (n: number) => shot("dizajn", n, { contain: true });

export const partners: Partner[] = [
  {
    name: "Stomatološka ordinacija Dr. Karić",
    logo: L + "dr-karic.jpg",
    href: ig("dr.karic_dent"),
    album: "dr-karic",
    work: "Fotografija, video i dizajn za stomatološku ordinaciju.",
    shots: [shot("dr-karic", 2), shot("dr-karic", 4), shot("dr-karic", 6)],
  },
  {
    name: "Adin Boutique",
    logo: L + "adin-boutique.jpg",
    album: "adin-boutique",
    work: "Fotografija i video za butik.",
    shots: [shot("adin-boutique", 2), shot("adin-boutique", 3), shot("adin-boutique", 5)],
  },
  {
    name: "SBK Mezz",
    logo: L + "sbk-mezz.jpg",
    album: "sbk-mezz-turnir",
    work: "Fotografije sa bilijarskog turnira.",
    shots: [shot("sbk-mezz-turnir", 1), shot("sbk-mezz-turnir", 2), shot("sbk-mezz-turnir", 4)],
  },
  {
    name: "Caffe & Restaurant Rondo",
    logo: L + "rondo.jpg",
    album: "rondo",
    work: "Fotografija i dizajn za caffe i restoran.",
    shots: [shot("rondo", 1), design(8)],
  },
  {
    name: "Spartak GYM",
    album: "spartak-gym",
    work: "Fotografije za teretanu.",
    shots: [shot("spartak-gym", 5), shot("spartak-gym", 3, { position: "45% 50%" }), shot("spartak-gym", 4)],
  },
  {
    name: "Vikendica Dah Planine",
    album: "dah-planine",
    work: "Fotografije i objave za vikendicu na Ponijerima.",
    shots: [shot("dah-planine", 1, { contain: true }), shot("dah-planine", 5), shot("dah-planine", 7)],
  },
  {
    name: "Bosana Foundation",
    album: "bosana-foundation",
    work: "Fotografije za fondaciju.",
    shots: [shot("bosana-foundation", 1), shot("bosana-foundation", 2, { wide: true })],
  },
  {
    name: "Caffe bar Gotiva",
    album: "caffe-gotiva",
    work: "Fotografija i snimci dronom.",
    shots: [shot("caffe-gotiva", 1), shot("caffe-gotiva", 2)],
  },
  {
    name: "SweetSpot by Dejanbaa",
    album: "sweetspot",
    work: "Fotografije proizvoda i automobila.",
    shots: [shot("sweetspot", 1), shot("sweetspot", 2)],
  },
  {
    name: "MobiFon Shop",
    logo: L + "mobifon.jpg",
    href: ig("mobifon_shop"),
    work: "Dizajn i video za prodavnicu telefona.",
    shots: [design(1), design(4)],
  },
  {
    name: "Sky Parking & Fly",
    logo: L + "sky-parking.jpg",
    href: ig("skyparkingandflyba"),
    work: "Dizajn i video za parking u Sarajevu.",
    shots: [design(5), design(6), design(7)],
  },
  { name: "Taekwondo kolektiv Bosna Rudar", logo: L + "bosna-rudar.jpg", href: ig("tkdkolektivbosnarudar") },
  { name: "TS Group", logo: L + "ts-group.jpg", href: ig("tsgroup.doo") },
  { name: "Wool & Mama", logo: L + "wool-and-mama.jpg", href: ig("woolandmama") },
  { name: "My Space", href: ig("myspace28.03") },
];

export const logoWall = partners.filter((p) => p.logo);
