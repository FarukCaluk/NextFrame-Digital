import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AlbumCard from "@/components/AlbumCard";
import CtaBand from "@/components/CtaBand";
import Gallery from "@/components/Gallery";
import { albums, categoryId } from "@/lib/albums";

export const dynamicParams = false;

export function generateStaticParams() {
  return albums.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/galerija/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = albums.find((a) => a.slug === slug);
  if (!found) return {};
  return {
    title: found.title,
    description: `${found.title}: ${found.category.toLowerCase()}, fotografije NextFrame Digital.`,
    openGraph: { images: [{ url: found.cover.src, width: found.cover.w, height: found.cover.h }] },
  };
}

export default async function AlbumPage({ params }: PageProps<"/galerija/[slug]">) {
  const { slug } = await params;
  const current = albums.find((a) => a.slug === slug);
  if (!current) notFound();

  // Up to four more albums, preferring the same category.
  const others = albums.filter((a) => a.slug !== slug);
  const start = albums.indexOf(current);
  const rotated = [...others.slice(start), ...others.slice(0, start)];
  const more = [
    ...rotated.filter((a) => a.category === current.category),
    ...rotated.filter((a) => a.category !== current.category),
  ].slice(0, 4);

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-12 md:px-8 md:pt-20">
        <Link
          href={`/galerija#${categoryId[current.category]}`}
          className="glass group inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm hover:border-white/30"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          {current.category}
        </Link>
        <h1 className="rise mt-8 max-w-4xl font-display text-4xl font-semibold leading-[0.98] tracking-tighter md:text-7xl">
          {current.title}
        </h1>
        <p className="mt-4 text-foreground/60">{current.category}</p>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <Gallery photos={current.photos} />
      </div>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <h2 className="mb-10 font-display text-3xl font-semibold tracking-tight md:text-5xl">Još albuma</h2>
          <ul className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
            {more.map((a) => (
              <li key={a.slug}>
                <AlbumCard
                  album={{ slug: a.slug, title: a.title, category: a.category, cover: a.cover, count: a.photos.length }}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
