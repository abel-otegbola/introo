import Button from "@/components/button/Button";

export default function Home() {
  return (
    <main className="bg-[url('/bg.svg')] bg-cover bg-top min-h-screen flex flex-col">
      <header className="flex justify-between 2xl:p-8 md:p-6 p-4 items-center">
        <h1>Introo.</h1>

        <Button variant="secondary" href="/auth/login">Sign in</Button>
      </header>

      <section className="flex flex-col items-center 2xl:gap-8 md:gap-6 gap-4 2xl:p-12 md:p-10 p-6">
        <h2 className="2xl:text-[48px] md:text-[40px] text-[32px] max-w-2xl md:leading-[60px] leading-[40px] font-semibold text-center">
          AI-Powered Video Pitch that Closes leads
        </h2>

        <p className="text-center max-w-2xl leading-[24px] mb-4">
          helps you turn your projects into short, personalized AI-powered videos that clearly explain how you delivered results and how you can do the same for your next client or employer.
        </p>

        <div className="relative">
          <div className="absolute dark:top-[20%] top-[5%] left-[6%] w-[88%] dark:h-[60%] h-[90%] z-[-1] btn-bg p-2 backdrop-blur-[15px] rounded-[12px] bg-opacity-80 ">
          </div>
          <Button className="z-2" href="/account/create-video">Get Started for free</Button>
        </div>
      </section>
    </main>
  );
}
