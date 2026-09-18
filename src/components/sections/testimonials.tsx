import AnimateHeading from "@/components/animations/animateHeading";
import ScrollAnimate from "@/components/animations/scrollAnimation";
import TestimonialCard from "@/components/testimonial/TestimonialCard";

const reviews = [
  {
    quote:
      "Introo helped me turn a rough product idea into a polished launch video before my morning coffee got cold.",
    name: "Maya Chen",
    role: "Product designer, Northstar",
    initials: "MC",
  },
  {
    quote:
      "The templates gave our small team a clear starting point, and the final exports looked like we had a full studio behind us.",
    name: "Andre Williams",
    role: "Founder, Framewise",
    initials: "AW",
    featured: true,
  },
  {
    quote:
      "I can move from script to a video that feels like my brand in one sitting. It has become part of my weekly workflow.",
    name: "Sofia Martins",
    role: "Content creator, Studio Sofia",
    initials: "SM",
  },
];

export default function TestimonialsPage() {
  return (
      <section className="flex w-full flex-1 flex-col items-center justify-center gap-10 px-4 py-[80px] md:px-[5%] lg:px-[10%]">
        <div className="flex max-w-[600px] flex-col items-center gap-3 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.12em] opacity-50">
            Reviews
          </p>
          <AnimateHeading repeat={false} tag="h2" start="top 90%" className="font-medium text-center leading-[120%] tracking-[-2%] md:text-[28px] text-[24px]"
          >
            What creators testified about Introo.
          </AnimateHeading>
          <p className="opacity-50 md:w-[75%] w-full text-center">
            See how creators use Introo to bring their ideas to life faster.
          </p>
        </div>

        <div className="grid w-full max-w-[1120px] grid-cols-1 gap-4 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <ScrollAnimate
              key={review.name}
              animation="slideUp"
              delay={index * 0.1}
            >
              <TestimonialCard {...review} />
            </ScrollAnimate>
          ))}
        </div>
      </section>
  );
}
