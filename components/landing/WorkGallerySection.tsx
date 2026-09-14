import Image from "next/image";
import { Camera, Wrench, Truck } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import CTAButton from "@/components/shared/CTAButton";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { BUSINESS, IMAGES, whatsappLink } from "@/lib/contact";

const photos = [
  {
    src: IMAGES.springInstall,
    alt: `${BUSINESS.owner} installing a new torsion spring on a residential garage door`,
    icon: Wrench,
    title: "Torsion spring replacement",
    caption:
      "New spring going in on a two-car door. Balanced, tested, and safe to use the same afternoon.",
  },
  {
    src: IMAGES.tomerTruck,
    alt: `${BUSINESS.owner} with the ${BUSINESS.name} truck loaded with springs and parts`,
    icon: Truck,
    title: "Stocked and ready",
    caption:
      "The truck carries springs, rollers, cables and openers, so most jobs are finished in one visit.",
  },
];

export default function WorkGallerySection() {
  return (
    <section id="our-work" className="py-20 px-4 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Real jobs, real photos"
          title="A look at the work"
          subtitle="No stock photos here. This is what a Kabriz visit actually looks like."
          centered
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {photos.map((p) => (
            <figure
              key={p.title}
              className="group relative rounded-[2rem] overflow-hidden bg-primary shadow-lg shadow-primary/10"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={1050}
                height={1400}
                className="w-full h-[360px] md:h-[440px] object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/70 to-transparent p-6 pt-20 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                    <p.icon className="w-4 h-4 text-gold" />
                  </span>
                  <h3 className="font-bold text-lg">{p.title}</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">{p.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 bg-gold-soft border border-gold/30 rounded-3xl p-6 md:p-7 flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
          <span className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
            <Camera className="w-6 h-6 text-gold" />
          </span>
          <div className="flex-1">
            <p className="font-bold text-primary text-lg">
              Send a photo of your door and get a straight answer
            </p>
            <p className="text-muted text-sm">
              A quick picture on WhatsApp helps {BUSINESS.owner} bring the
              right parts and give you an accurate price before the visit.
            </p>
          </div>
          <CTAButton
            href={whatsappLink(
              `Hi ${BUSINESS.owner}, here's a photo of my garage door. Can you tell me what's wrong and what it would cost?`
            )}
            variant="whatsapp"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Send a photo
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
