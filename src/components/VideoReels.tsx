import ReelEmbed from "@/components/ReelEmbed";
import type { Reel } from "@/lib/site-data";

export function ReelCard({ reel }: { reel: Reel }) {
  return (
    <>
      <ReelEmbed url={reel.url} title={`${reel.title}${reel.tag ? `, ${reel.tag}` : ""}`} />
      <p className="mt-3 font-display text-lg font-semibold tracking-tight">{reel.title}</p>
      <p className="text-sm text-foreground/60">
        {reel.tag ? `${reel.tag}. ` : ""}
        <a
          href={reel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Otvori na Facebooku
        </a>
      </p>
    </>
  );
}

export default function VideoReels({ items }: { items: Reel[] }) {
  return (
    <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:-mx-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
      {items.map((r) => (
        <li key={r.url} className="w-[68vw] shrink-0 snap-start sm:w-64 lg:w-auto">
          <ReelCard reel={r} />
        </li>
      ))}
    </ul>
  );
}
