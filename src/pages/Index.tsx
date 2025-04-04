
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeatureSection />
      <TestimonialSection />
      <CallToAction />
    </MainLayout>
  );
};

export default Index;
