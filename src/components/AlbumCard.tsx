import Image from "next/image";
import Link from "next/link";
import Tilt from "@/components/Tilt";
import { plural, type Photo } from "@/lib/albums";

export type AlbumSummary = { slug: string; title: string; category: string; cover: Photo; count: number };

export default function AlbumCard({ album }: { album: AlbumSummary }) {
  return (
    <Tilt className="h-full">
      <Link href={`/galerija/${album.slug}`} className="group block h-full rounded-surface">
        <div className="glass-rim flex h-full flex-col rounded-surface p-1.5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[0.9rem] bg-surface">
            <Image
              src={album.cover.src}
              alt={album.cover.alt}
              fill
              quality={90}
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 24vw"
              className={`object-cover transition-transform duration-700 group-hover:scale-[1.05] ${
                album.slug === "dah-planine" ? "object-top" : ""
              }`}
            />
          </div>
          <div className="px-3 pb-2 pt-3">
            <p className="font-display text-base font-semibold leading-tight tracking-tight md:text-lg">{album.title}</p>
            <p className="mt-1 text-xs text-foreground/60 md:text-sm">
              {album.category}, {album.count} {plural(album.count, "fotografija", "fotografije", "fotografija")}
            </p>
          </div>
        </div>
      </Link>
    </Tilt>
  );
}
