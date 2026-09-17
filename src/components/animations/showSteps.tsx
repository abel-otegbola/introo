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
    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (!wrapper || !content || stepCount < 1) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const stepElements = gsap.utils.toArray<HTMLElement>("[data-show-step]", content);
      const stepDistance = Math.max(stepCount - 0.5, 0.5) * 200;

      const setActiveStep = (step: number) => {
        const nextStep = Math.max(0, Math.min(step, stepCount - 1));

        if (nextStep !== activeStepRef.current) {
          onStepChange(nextStep);
        }

        gsap.to(stepElements, {
          opacity: (index) => (index === nextStep ? 1 : 0.25),
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const trigger = ScrollTrigger.create({
        trigger: wrapper,
        start: "top 18%",
        end: `+=${stepDistance}`,
        pin: content,
        scrub: true,
        snap: stepCount > 1 ? 1 / (stepCount - 1) : 1,
        onUpdate: (self) => {
          setActiveStep(Math.round(self.progress * (stepCount - 1)));
        },
      });

      setActiveStep(activeStepRef.current);

      cleanup = () => {
        trigger.kill();
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
        opacity: (index) => (index === activeStep ? 1 : 0.25),
        duration: 0.50,
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
