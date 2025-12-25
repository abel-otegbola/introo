import { useEffect, useState } from "react";
import Slider from "../slider/slider";

const slides = [
  {
    title: "Turn Your Projects Into Powerful Video Pitches",
    text: "Transform your portfolio into engaging AI-powered videos that showcase your results and expertise in seconds.",
    img: "/auth-bg.png",
  },
  {
    title: "Personalized Videos That Connect",
    text: "Create custom video presentations that clearly explain how you delivered results and how you can help your next client.",
    img: "/auth-bg.png",
  },
  {
    title: "Close More Leads With Video",
    text: "Stand out from the competition with short, compelling video pitches that demonstrate your value and win more clients.",
    img: "/auth-bg.png",
  },
];

function AuthOverlay() {
  const [activeSlider, setActiveSlider] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSlider((prev) => (prev === slides.length -1 ? 0 : prev + 1));
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeSlider]);

  return (
    <div className="h-screen sticky top-0 bg-[url('/auth-bg.png')] bg-cover bg-top 2xl:w-[35%] xl:w-[30%] md:w-[35%] md:block hidden relative">

      {/* Content Overlay */}
      <div className="relative flex flex-col h-full justify-between gap-6 w-full">

        <h1 className="text-white font-bold text-[32px] leading-[40px] tracking-[-1%] p-[12%]">Introo.</h1>

        <div className="bg-gradient-to-b via-primary/[0.6] to-primary px-[12%] pb-[5%] pt-[28%]">
          <div className="relative h-[170px] min-[1920px]:h-[140px] overflow-hidden">
            <div
              className="flex relative h-full"
            >
              <Slider slides={slides} activeSlider={activeSlider} />
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-start gap-3">
            {slides.map((_, i) => (
              <button onClick={() => setActiveSlider(i)}
                key={i}
                className={`cursor-pointer duration-500 rounded-lg ${activeSlider === i ? "w-8 h-[6px] bg-secondary" : "w-5 h-[6px] bg-gray-100"}`}
              ></button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AuthOverlay;
