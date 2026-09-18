import AnimateHeading from "../animations/animateHeading";
import Button from "../button/Button";

const plans = [
  {
    name: "Basic",
    price: "$19",
    description: "A focused toolkit for getting your first videos moving.",
    features: [
      "500 credits/month",
      "50 video exports/month",
      "1080p video export",
      "All basic templates included",
    ],
  },
  {
    name: "Pro",
    price: "$39",
    description: "More room to create, refine, and ship polished work.",
    featured: true,
    features: [
      "1,000 credits/month",
      "120 video exports/month",
      "4K exports available",
      "All templates, including Pro templates",
    ],
  },
  {
    name: "Creator",
    price: "$99",
    description: "Unlimited creative capacity for your busiest workflow.",
    features: [
      "Unlimited credits/month",
      "Unlimited video exports/month",
      "4K exports available",
      "All templates, including Pro templates",
    ],
  },
];

export default function PricingSection({ fullPage = false }: { fullPage?: boolean }) {
  return (
    <section
      id="Pricing"
      className={`flex w-full flex-col items-center justify-center gap-10 py-[80px] lg:px-[10%] md:px-[5%] px-4 ${
        fullPage ? "min-h-[calc(100vh-56px)]" : ""
      }`}
    >
      <div className="flex max-w-[500px] flex-col items-center gap-3 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.12em] opacity-50">
          Simple pricing
        </p>
        <AnimateHeading repeat={false} tag="h2" start="top 90%" className="font-medium text-center leading-[120%] tracking-[-2%] md:text-[28px] text-[24px]">
            Choose the pace that fits your projects.
        </AnimateHeading>
        <p className="opacity-50 md:w-[75%] w-full text-center">
          Start with the essentials, then scale your video workflow when you are ready.
        </p>
      </div>

      <div className="grid w-full max-w-[1120px] grid-cols-1 gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`flex flex-col rounded-[12px] border p-6 md:p-8 ${
              plan.featured
                ? "border-secondary bg-secondary text-white shadow-[0px_20px_60px_#8263F433]"
                : "border-gray-500/[0.2] bg-white dark:bg-[#101010]"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-medium">{plan.name}</h3>
                <p className={`mt-2 text-sm ${plan.featured ? "opacity-80" : "opacity-60"}`}>
                  {plan.description}
                </p>
              </div>
              {plan.featured && (
                <span className="rounded-full bg-white/[0.16] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em]">
                  Popular
                </span>
              )}
            </div>

            <div className="mt-8 flex items-end gap-2">
              <span className="text-4xl font-medium tracking-[-2%]">{plan.price}</span>
              <span className={`pb-1 text-sm ${plan.featured ? "opacity-80" : "opacity-60"}`}>
                /month
              </span>
            </div>

            <ul className={`mt-8 flex flex-col gap-4 border-t pt-6 text-sm ${plan.featured ? "border-white/[0.2]" : "border-gray-500/[0.2]"}`}>
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${plan.featured ? "bg-white" : "bg-secondary"}`} />
                  <span className={plan.featured ? "opacity-90" : "opacity-75"}>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              href="/auth/signup"
              variant={plan.featured ? "secondary" : "primary"}
              className={`mt-10 w-full ${plan.featured ? "border-white/[0.3] bg-white text-primary hover:bg-white/[0.85]" : ""}`}
            >
              Get started
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}