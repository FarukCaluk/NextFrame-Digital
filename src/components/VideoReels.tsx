import ReelEmbed from "@/components/ReelEmbed";
import { reels } from "@/lib/site-data";

export default function VideoReels({ limit }: { limit?: number }) {
  return (
    <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:-mx-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
      {reels.slice(0, limit).map((r) => (
        <li key={r.url} className="w-[68vw] shrink-0 snap-start sm:w-64 lg:w-auto">
          <ReelEmbed url={r.url} title={`${r.title}${r.tag ? `, ${r.tag}` : ""}`} />
          <p className="mt-3 font-display text-lg font-semibold tracking-tight">{r.title}</p>
          <p className="text-sm text-muted">
            {r.tag ? `${r.tag}. ` : ""}
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Otvori na Facebooku
            </a>
          </p>
        </li>
      ))}
    </ul>
  );
}
