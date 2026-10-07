import Image from "next/image";
import Link from "next/link";
import { logoWall } from "@/lib/site-data";

export default function PartnerMarquee() {
  return (
    <section aria-label="Partneri" className="marquee overflow-hidden border-b border-line py-8">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-14 pr-14">
            {logoWall.map((p) => (
              <li key={p.name}>
                <Link href="/partneri" tabIndex={copy === 1 ? -1 : undefined}>
                  <Image
                    src={p.logo!}
                    alt={copy === 0 ? p.name : ""}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
