import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";
import { FAQSchema } from "@/components/seo/FAQSchema";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: { en: "/", es: "/es", "x-default": "/" },
  },
};

export default function Home() {
  return (
    <>
      <FAQSchema />
      <Hero />
      <ServicesPreview />
      <ProcessSteps />
      <WhyChooseUs />
      <FAQ />
      <CTABanner />
    </>
  );
}
