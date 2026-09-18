import Topbar from "../components/topbar/topbar";
import ScrollTextReveal from "../components/animations/scroll-text-reveal";
import AnimateHeading from "../components/animations/animateHeading";
import EurroIcon from "../assets/clients/eurro";
import FimmerIcon from "../assets/clients/fimmer";
import InfiniIcon from "../assets/clients/infini";
import SitaraIcon from "../assets/clients/sitara";
import FAQs from "@/components/sections/faqs";
import PricingSection from "@/components/sections/PricingSection";
import TestimonialsPage from "../components/sections/testimonials";
import HowItWorks from "@/components/sections/howItWorks";
import Features from "@/components/sections/features";
import { Plus } from "lucide-react";
import Button from "@/components/button/Button";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Topbar />
      <header className="bg-[#FFF] dark:bg-[#202020]/[0.25] lg:px-[5%] p-4 md:pt-[6%] pt-[100px] w-full md:mx-auto flex flex-col justify-center items-center text-center gap-4">
            
        <div className="flex flex-col justify-center items-center text-center gap-2 md:px-[10%] sm:px-[10%] w-full">
          <ScrollTextReveal repeat={true} tag="p" delay={0.6} className="font-bold w-fit uppercase px-4 py-1 text-[10px] bg-primary/[0.09] rounded-full">
            AI powered UI Video creation tool
          </ScrollTextReveal>
          <AnimateHeading repeat={true} tag="h1" delay={0.4} className="font-medium xl:text-[4em] lg:text-[3.5em] sm:text-[3em] text-[38px] leading-[110%] tracking-[-2%]">
            <span className="text-secondary opacity-50">Generate motion</span> <br /> videos for your projects.
          </AnimateHeading>
          <ScrollTextReveal repeat={true} tag="p" delay={0.6} className="my-4 md:w-[65%] mx-auto font-medium opacity-75">
            Create motion launch videos for your projects with narration and music in minutes. No design skills needed.
          </ScrollTextReveal>

          
          <div className="relative my-4 md:w-[60%] w-full mx-auto flex flex-col border border-gray-400/[0.1] shadow-[0px_4px_24px_rgba(0,0,0,0.05)] p-2 overflow-hidden justify-between h-[140px] md:rounded-[16px] rounded-[12px] bg-[#FFF] dark:bg-[#141414]">
            <div className="flex items-end justify-between w-full flex-1">
              <textarea
                placeholder="Describe your video"
                className="w-full h-full p-2 bg-transparent border-none focus:ring-0 focus:outline-none text-sm"
              />
            </div>
            <div className="flex items-end justify-between w-full">
              <button className="flex items-center gap-1 p-[6px] rounded-[6px] bg-gray-200/[0.05] hover:bg-gray-200/[0.3] focus:bg-primary focus:text-white">
                <Plus size={16} />
                {/* <span className="text-[10px] font-medium">Add screenshots</span> */}
              </button>
              <Button size="sm" className="bg-secondary" disabled={false}>Generate video</Button>
            </div>
          </div>

        {/* ========== MARQUEE ========== */}
          <div className="child pt-4 pb-12 opacity-25 overflow-hidden sm:w-[700px] w-full">
            <div className="relative overflow-hidden lg:w-[70%] md:w-[90%] mx-auto py-2">
                  <span className="h-[60px] py-4 w-[20%] absolute top-0 left-0 bg-gradient-to-r from-[#FFF] dark:from-[#121212] z-2"></span>
                  <span className="h-[60px] py-4 w-[20%] absolute top-0 right-0 bg-gradient-to-r to-[#FFF] dark:to-[#121212] z-2"></span>
                <div className="marquee-track">
                    {[0, 1].map((rep) => (
                        <div key={rep} className="marquee-group flex items-center">
                            {[
                              { id: 0, icon: <EurroIcon className="h-[16px] w-auto" />}, 
                              {id: 1, icon: <FimmerIcon className="h-[16px] w-auto" />}, 
                              {id: 2, icon: <InfiniIcon className="h-[16px] w-auto" />}, 
                              {id: 4, icon: <SitaraIcon className="h-[16px] w-auto" />}
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-15 px-15 ">
                                    <span className="text-[10px] font-medium whitespace-nowrap uppercase">{item.icon}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
              </div>
          </div>

          {/* <ScrollAnimate className="" start="top 100%" delay={1} animation="slideUp">
            <Button className="">
              Get started for free
            </Button>
          </ScrollAnimate> */}
        </div>


      </header>

      <section className="lg:px-[10%] md:px-[5%] px-4 py-[40px] flex flex-col gap-6 justify-center">
        <AnimateHeading repeat={false} tag="h2" start="top 90%" className="font-medium text-center leading-[120%] tracking-[-2%] md:text-[28px] text-[24px]">
          Presentation styles.
        </AnimateHeading>
        <div className="child pt-4 pb-12 overflow-hidden w-full">
            <div className="relative overflow-hidden w-full py-2">
                  <span className="h-full py-4 w-[20%] absolute top-0 left-0 bg-gradient-to-r from-[#FFFFFF] dark:from-[#101010] z-2"></span>
                  <span className="h-full py-4 w-[20%] absolute top-0 right-0 bg-gradient-to-r to-[#FFFFFF] dark:to-[#101010] z-2"></span>
                <div className="marquee-track">
                    {[0, 1].map((rep) => (
                        <div key={rep} className="marquee-group flex items-center gap-6">
                            {[1, 2, 3, 4
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-20 px-15 h-[200px] w-auto aspect-video md:rounded-[20px] rounded-[10px] bg-gray-200 dark:bg-[#121212]">
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
              </div>
          </div>
      </section>
      <HowItWorks />
      <Features />
      <TestimonialsPage />

      <PricingSection />
      <FAQs />
    </main>
  );
}
