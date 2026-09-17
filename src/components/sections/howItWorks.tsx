"use client";

import { useState } from "react";
import AnimateHeading from "../animations/animateHeading";
import ShowSteps from "../animations/showSteps";

const steps = [
  {
    number: "01",
    title: "Describe your project and upload screenshots",
    visualLabel: "Your project brief",
    description:
      "Tell Introo what you want to explain, then add the screenshots that show your project in action.",
  },
  {
    number: "02",
    title: "Choose a template and hit generate",
    visualLabel: "Your video generation",
    description:
      "Choose a visual direction that fits your project and let Introo turn your inputs into a polished motion presentation.",
  },
  {
    number: "03",
    title: "Export your generated video",
    visualLabel: "Your finished video",
    description:
      "Download your finished presentation immediately and share your product story wherever it needs to go.",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const selectedStep = steps[activeStep];

  return (
    <section
      id="HowItWorks"
      className="flex w-full flex-col gap-12 px-4 py-[80px] md:px-[5%] lg:px-[10%]"
    >
      <div className="mx-auto flex max-w-[600px] flex-col items-center gap-3 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.12em] opacity-50">
          How it works
        </p>
        <AnimateHeading
          repeat={false}
          tag="h2"
          start="top 90%"
          className="text-center text-[24px] font-medium leading-[120%] tracking-[-2%] md:text-[28px]"
        >
          From screenshots to a story people remember.
        </AnimateHeading>
        <p className="opacity-50 md:w-[75%] w-full text-center">
          Give Introo the raw material and the direction. It handles the motion,
          sound, and polish.
        </p>
      </div>

      <ShowSteps
        stepCount={steps.length}
        activeStep={activeStep}
        onStepChange={setActiveStep}
        className="mx-auto w-full max-w-[1120px]"
      >
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(360px,1fr)] md:items-center md:gap-12">
          <div className="relative flex aspect-[4/3] min-h-[280px] items-center justify-center overflow-hidden rounded-[12px] border border-gray-500/[0.2] bg-gray-200 dark:bg-[#202020]">
            <div className="absolute inset-4 rounded-[8px] border border-white/[0.5] dark:border-white/[0.08]" />
            <div className="relative flex flex-col items-center gap-3 text-center">
              <span className="text-4xl font-medium text-secondary opacity-80">
                {selectedStep.number}
              </span>
              <span className="text-xs uppercase tracking-[0.12em] opacity-40">
                {selectedStep.visualLabel}
              </span>
              <span className="text-xs opacity-30">Visual coming soon</span>
            </div>
          </div>

        <div className="flex flex-col gap-5">
          {steps.map((step, index) => {
            const isActive = index === activeStep;

            return (
              <button
                key={step.number}
                type="button"
                data-show-step
                aria-current={isActive ? "step" : undefined}
                onClick={() => setActiveStep(index)}
                className={`group relative flex flex-col w-full gap-2 px-6 text-left transition-opacity duration-300 ${
                  isActive ? "opacity-100 border-l-2 border-secondary" : "opacity-45 hover:opacity-75 border-l-2 border-gray-500/[0.1]"
                }`}
              >
                <span
                  className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-colors ${
                    isActive
                      ? "border-secondary bg-secondary text-white"
                      : "border-gray-500/[0.2]"
                  }`}
                >
                  {step.number}
                </span>
                <span className="flex flex-col gap-2">
                  <span className="w-[75%] font-medium leading-[120%]">
                    {step.title}
                  </span>
                  <span
                    className={`leading-6 transition-all w-[75%] text-sm duration-500 ${
                      isActive ? "max-h-40 opacity-70" : "max-h-0 overflow-hidden opacity-0"
                    }`}
                  >
                    {step.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        </div>
      </ShowSteps>
    </section>
  );
}
