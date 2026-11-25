import Image from "next/image";
import Link from "next/link";
import { logoWall } from "@/lib/site-data";

export default function PartnerMarquee() {
  return (
    <section aria-label="Partneri" className="px-5 md:px-8">
      <div className="marquee glass mx-auto max-w-7xl overflow-hidden rounded-full py-4">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-12 pr-12">
              {logoWall.map((p) => (
                <li key={p.name}>
                  <Link href="/partneri" tabIndex={copy === 1 ? -1 : undefined} className="block rounded-full">
                    <Image
                      src={p.logo!}
                      alt={copy === 0 ? p.name : ""}
                      width={56}
                      height={56}
                      quality={90}
                      className="h-14 w-14 rounded-full object-cover ring-1 ring-white/15"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
