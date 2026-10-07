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
      "/images/portfolio/vjencanja-stepenice.jpg",
      "/images/portfolio/vjencanja-crno-bijelo.jpg",
      "/images/portfolio/vjencanja-prstenje.jpg",
    ],
    reelGroup: "Vjenčanja",
    preview: "/images/portfolio/vjencanja-stepenice.jpg",
  },
  {
    slug: "foto-video",
    title: "Foto i video",
    short: "Sport, događaji, automobili",
    description:
      "Fotografija i video za sportske klubove, događaje, automobile i promotivne sadržaje.",
    images: [
      "/images/portfolio/sport-taekwondo-ogledalo.jpg",
      "/images/portfolio/auto-audi-cesta.jpg",
      "/images/portfolio/sport-fudbaler.jpg",
    ],
    preview: "/images/portfolio/sport-taekwondo-ogledalo.jpg",
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
    preview: "/images/dizajn/sejla-zonic.jpg",
  },
  {
    slug: "marketing",
    title: "Marketing",
    short: "Sadržaj i društvene mreže",
    description:
      "Digitalni marketing i vođenje društvenih mreža: planiranje sadržaja, snimanje i objavljivanje.",
    images: [],
    reelGroup: "Marketing",
  },
];

export type Category = "Vjenčanja" | "Sport" | "Automobili" | "Događaji" | "Dizajn";

export type Photo = {
  src: string;
  alt: string;
  w: number;
  h: number;
  category: Category;
};

const P = "/images/portfolio/";

export const photos: Photo[] = [
  { src: P + "vjencanja-stepenice.jpg", alt: "Mladenci na stepenicama modernog objekta", w: 1334, h: 2000, category: "Vjenčanja" },
  { src: P + "sport-taekwondo-ogledalo.jpg", alt: "Taekwondo majstor ispred ogledala u dvorani", w: 2000, h: 1334, category: "Sport" },
  { src: P + "auto-audi-krov.jpg", alt: "Audi A3 na krovu parking garaže", w: 2000, h: 1334, category: "Automobili" },
  { src: P + "vjencanja-prstenje.jpg", alt: "Ruke mladenaca sa vjenčanim prstenjem", w: 1334, h: 2000, category: "Vjenčanja" },
  { src: P + "sport-kickbox.jpg", alt: "Trener i kickboks takmičar u uglu ringa", w: 1616, h: 1080, category: "Sport" },
  { src: P + "sport-fudbaler.jpg", alt: "Portret mladog fudbalera na terenu", w: 1334, h: 2000, category: "Sport" },
  { src: P + "vjencanja-crno-bijelo.jpg", alt: "Mladenci, crno-bijela fotografija vjenčanja", w: 1334, h: 2000, category: "Vjenčanja" },
  { src: P + "sport-taekwondo-majstor.jpg", alt: "Taekwondo trener ispred polaznika u dvorani", w: 2000, h: 1334, category: "Sport" },
  { src: P + "auto-audi-cesta.jpg", alt: "Audi A3 u vožnji na cesti", w: 2000, h: 1334, category: "Automobili" },
  { src: P + "dogadjaji-zastava.jpg", alt: "Djevojka sa zastavom na prozoru automobila u noćnom kadru", w: 1334, h: 2000, category: "Događaji" },
  { src: P + "sport-taekwondo-trening.jpg", alt: "Trening taekwondo kluba u dvorani", w: 2000, h: 1334, category: "Sport" },
  { src: P + "auto-audi-avion.jpg", alt: "Audi A3 i avion u slijetanju", w: 2000, h: 1334, category: "Automobili" },
  { src: P + "sport-trener-bosna-rudar.jpg", alt: "Leđa trenera sa natpisom Bosna Rudar", w: 2000, h: 1334, category: "Sport" },
  { src: P + "dogadjaji-kamion.jpg", alt: "Kamion sa zastavom Bosne i Hercegovine u noćnom kadru", w: 1334, h: 2000, category: "Događaji" },
  { src: P + "auto-audi-dva.jpg", alt: "Dva Audija na krovu garaže", w: 2000, h: 1334, category: "Automobili" },
  { src: P + "sport-taekwondo-grupa.jpg", alt: "Grupa mladih taekwondo takmičara u dvorani", w: 2000, h: 1125, category: "Sport" },
  { src: P + "sport-taekwondo-mural.jpg", alt: "Djeca na taekwondo treningu ispred murala", w: 2000, h: 1125, category: "Sport" },
];

export const categories: Category[] = ["Vjenčanja", "Sport", "Automobili", "Događaji"];

export const designs: Photo[] = [
  { src: "/images/dizajn/adin-boutique.jpg", alt: "Objava za Adin Boutique, nova kolekcija", w: 1158, h: 2000, category: "Dizajn" },
  { src: "/images/dizajn/sejla-zonic.jpg", alt: "Plakat za koncert u Kaknju", w: 1320, h: 1657, category: "Dizajn" },
  { src: "/images/dizajn/dr-karic.jpg", alt: "Objava za stomatološku ordinaciju Dr. Karić", w: 1179, h: 1153, category: "Dizajn" },
  { src: "/images/dizajn/hercegovac-ismail.jpg", alt: "Objava za takmičara Taekwondo kolektiva Bosna Rudar", w: 1600, h: 2000, category: "Dizajn" },
  { src: "/images/dizajn/my-space.jpg", alt: "Objava za caffe klub My Space", w: 1179, h: 1466, category: "Dizajn" },
  { src: "/images/dizajn/apartman-visoko.jpg", alt: "Objava za apartman u Visokom", w: 1141, h: 2000, category: "Dizajn" },
  { src: "/images/dizajn/sbk-mezz.jpg", alt: "Objava za Sportski bilijar klub Mezz", w: 1179, h: 1504, category: "Dizajn" },
  { src: "/images/dizajn/svecana-noc-uspjeha.jpg", alt: "Poziv na Svečanu noć uspjeha taekwondo asocijacije", w: 2000, h: 1000, category: "Dizajn" },
  { src: "/images/dizajn/adin-nova-kolekcija.jpg", alt: "Priča nova kolekcija za Adin Boutique", w: 1139, h: 2000, category: "Dizajn" },
  { src: "/images/dizajn/apartman-kakanj.jpg", alt: "Objava za apartman u Kaknju", w: 1179, h: 1155, category: "Dizajn" },
  { src: "/images/dizajn/lisak-nedim.jpg", alt: "Objava za takmičara Taekwondo kolektiva Bosna Rudar", w: 1414, h: 2000, category: "Dizajn" },
  { src: "/images/dizajn/sbk-mezz-kokteli.jpg", alt: "Objava za Sportski bilijar klub Mezz, bilijar i kokteli", w: 1179, h: 1434, category: "Dizajn" },
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

export type Partner = {
  name: string;
  logo?: string;
  href: string;
};

const L = "/images/partners/";
const ig = (handle: string) => `https://www.instagram.com/${handle}/`;

export const partners: Partner[] = [
  { name: "Taekwondo kolektiv Bosna Rudar", logo: L + "bosna-rudar.jpg", href: ig("tkdkolektivbosnarudar") },
  { name: "Stomatološka ordinacija Dr. Karić", logo: L + "dr-karic.jpg", href: ig("dr.karic_dent") },
  { name: "Adin Boutique", logo: L + "adin-boutique.jpg", href: "https://www.facebook.com/adin.boutique" },
  { name: "MobiFon Shop", logo: L + "mobifon.jpg", href: ig("mobifon_shop") },
  { name: "Sky Parking & Fly", logo: L + "sky-parking.jpg", href: ig("skyparkingandflyba") },
  { name: "Caffe & Restaurant Rondo", logo: L + "rondo.jpg", href: ig("caffe.restaurant.rondo") },
  { name: "SBK Mezz", logo: L + "sbk-mezz.jpg", href: ig("sbk_mezz") },
  { name: "TS Group", logo: L + "ts-group.jpg", href: ig("tsgroup.doo") },
  { name: "Wool & Mama", logo: L + "wool-and-mama.jpg", href: ig("woolandmama") },
  { name: "My Space", href: ig("myspace28.03") },
];

export const logoWall = partners.filter((p) => p.logo);
