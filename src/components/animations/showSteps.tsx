"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ShowStepsProps = {
  children: ReactNode;
  stepCount: number;
  activeStep: number;
  onStepChange: (step: number) => void;
  className?: string;
};

export default function ShowSteps({
  children,
  stepCount,
  activeStep,
  onStepChange,
  className = "",
}: ShowStepsProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const activeStepRef = useRef(activeStep);

  activeStepRef.current = activeStep;

  useEffect(() => {
    const content = contentRef.current;

    if (!content || stepCount < 1) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const stepElements = gsap.utils.toArray<HTMLElement>("[data-show-step]", content);

      const setActiveStep = (step: number) => {
        const nextStep = Math.max(0, Math.min(step, stepCount - 1));

        if (nextStep !== activeStepRef.current) {
          onStepChange(nextStep);
        }

        gsap.to(stepElements, {
          opacity: (index) => (index === nextStep ? 1 : 0.45),
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const triggers = stepElements.map((stepElement, index) =>
        ScrollTrigger.create({
          trigger: stepElement,
          start: "top 62%",
          end: "bottom 38%",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        }),
      );

      setActiveStep(activeStepRef.current);

      cleanup = () => {
        triggers.forEach((trigger) => trigger.kill());
        gsap.killTweensOf(stepElements);
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [onStepChange, stepCount]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    void import("gsap").then(({ gsap }) => {
      const stepElements = gsap.utils.toArray<HTMLElement>("[data-show-step]", content);

      gsap.to(stepElements, {
        opacity: (index) => (index === activeStep ? 1 : 0.45),
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
    });
  }, [activeStep]);

  return (
    <div ref={wrapperRef} className={className}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
