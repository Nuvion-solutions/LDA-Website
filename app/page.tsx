import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <ProcessSteps />
      <WhyChooseUs />
      <FAQ />
      <CTABanner />
    </>
  );
}
