import {
  Download,
  LayoutTemplate,
  MessageSquareText,
  PanelsTopLeft,
} from "lucide-react";
import AnimateHeading from "../animations/animateHeading";
import ScrollAnimate from "../animations/scrollAnimation";

const features = [
  {
    icon: PanelsTopLeft,
    title: "Screenshots to animated components",
    description:
      "Turn static product screens into motion-ready UI components that make every detail easier to follow.",
  },
  {
    icon: MessageSquareText,
    title: "Text to animated UI",
    description:
      "Explain your idea in words and bring the right messages to life with animated text and presentation pacing.",
  },
  {
    icon: LayoutTemplate,
    title: "Free and Pro templates to choose from",
    description:
      "Start with a visual direction that fits your project, from the essential library to premium Pro templates.",
  },
  {
    icon: Download,
    title: "High quality video export",
    description:
      "Export a polished presentation in high quality, ready to share with your audience, team, or clients.",
  },
];

export default function Features() {
  return (
    <section className="flex w-full flex-col gap-10 px-4 py-[80px] md:px-[5%] lg:px-[10%]">
      <div className="mx-auto flex max-w-[600px] flex-col items-center gap-3 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.12em] opacity-50">
          Built for better presentations
        </p>
        <AnimateHeading
          repeat={false}
          tag="h2"
          start="top 90%"
          className="text-center text-[24px] font-medium leading-[120%] tracking-[-2%] md:text-[28px]"
        >
          Everything you need to make your UI move.
        </AnimateHeading>
        <p className="opacity-50 md:w-[75%] w-full text-center">
          A focused toolkit for turning product screens into videos people want to watch.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 gap-4 md:grid-cols-2">
        {features.map((feature, index) => {

          return (
            <ScrollAnimate
              key={feature.title}
              animation={"slideUp"}
              delay={index * 0.08}
            >
              <article className="flex min-h-[210px] flex-col gap-4 justify-between rounded-[12px] border border-gray-500/[0.2] bg-white p-4 dark:bg-[#101010] md:p-4">
                {/* <Icon size={24} strokeWidth={1.6} className="text-secondary" /> */}
                <div className="h-[200px] rounded-[6px] bg-gray-200 dark:bg-[#202020]"></div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-medium leading-[120%]">
                    {feature.title}
                  </h3>
                  <p className="leading-6 opacity-50 text-sm">{feature.description}</p>
                </div>
              </article>
            </ScrollAnimate>
          );
        })}
      </div>
    </section>
  );
}
