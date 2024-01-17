import { Hero } from "@/components/Hero";
import HomeHeader from "@/components/Header";
import { PrimaryFeatures } from "@/components/PrimaryFeatures";
import Footer from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { CallToAction } from "@/components/CTA";

export const metadata = {
  title: "FPL Mstr",
  description: "Win your mini-leagues, conquer FPL.",
};

export default async function Home() {
  const headerItems = [
    {
      title: "Sign In",
      href: `/signin`,
    },
  ];
  return (
    <div>
      <HomeHeader items={headerItems} />
      <Hero />
      <PrimaryFeatures />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}
