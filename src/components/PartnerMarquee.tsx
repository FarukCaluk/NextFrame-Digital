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
                  <Link href="/partneri" tabIndex={copy === 1 ? -1 : undefined}>
                    <Image
                      src={p.logo!}
                      alt={copy === 0 ? p.name : ""}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
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
