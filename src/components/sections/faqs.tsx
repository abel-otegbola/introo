import AnimateHeading from "../animations/animateHeading";
import { ChevronDownIcon } from "lucide-react";
import ScrollAnimate from "../animations/scrollAnimation";

export default function FAQs() {
    return (
    <section className="child flex flex-col items-center justify-center md:gap-12 gap-8 lg:px-[15%] sm:px-[5%] px-4 py-[80px]">
    <div className="flex flex-col items-center justify-center gap-4 w-full">
        <p className="text-sm font-medium uppercase tracking-[0.12em] opacity-50">
            Frequently Asked Questions
          </p>
        <AnimateHeading repeat={true} tag="h2" start="top 90%" className="font-medium text-center leading-[120%] tracking-[-2%] md:text-[28px] text-[24px]">
            What Creators Asked About Introo.
        </AnimateHeading>
        </div>

        <div className="flex flex-col gap-3 pb-4 md:w-[75%] mx-auto w-full">
        {[
            {
            question: "What can I create with Introo?",
            answer: "Introo helps you turn ideas, product updates, and launch messages into polished presentation videos with motion, narration, music, and ready-to-use templates.",
            },
            {
            question: "Do I need video editing experience?",
            answer: "No. Introo is designed for creators, founders, and teams who want to make professional videos without needing advanced editing or design skills.",
            },
            {
            question: "Can I use my own script, images, and brand assets?",
            answer: "Yes. Start with your own script and bring in the visuals, messaging, and brand details that make the video feel like yours.",
            },
            {
            question: "Can Introo generate narration and music?",
            answer: "Yes. You can add narration and music to your video, then adjust the presentation until the pacing and tone match your project.",
            },
            {
            question: "What video quality can I export?",
            answer: "Basic plans include 1080p exports. Pro and Creator plans include access to 4K exports when you need a sharper presentation for launches, clients, or larger screens.",
            },
            {
            question: "What are credits used for?",
            answer: "Credits support your monthly video creation workflow. Your plan determines how many credits are available each month, so you can choose the capacity that fits your projects.",
            },
            {
            question: "Can I use my exported videos commercially?",
            answer: "Yes. You can use your finished videos for your own projects, product launches, marketing, social content, and client work, subject to the rights for any assets you add.",
            },
            {
            question: "Can I change or cancel my plan?",
            answer: "Yes. You can move to a plan with more or less capacity as your workflow changes, or cancel when you no longer need a subscription.",
            },
        ].map((item, index) => (
            <ScrollAnimate animation="slideUp" key={item.question} delay={index * 0.1}>
                <details className="group bg-white dark:bg-[#101010] rounded-[12px] px-4 border border-gray-500/[0.2]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-medium [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <ChevronDownIcon size={16} className="shrink-0 text-[15px] transition-transform duration-500 group-open:rotate-180" />
                </summary>
                <p className="pb-5 leading-6 opacity-70">
                    {item.answer}
                </p>
                </details>
            </ScrollAnimate>
        ))}
        </div>
    </section>
    )
}