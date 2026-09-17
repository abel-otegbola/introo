import Topbar from "@/components/topbar/topbar";
import PricingSection from "@/components/sections/PricingSection";

export default function PricingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Topbar />
      <PricingSection fullPage />
    </main>
  );
}