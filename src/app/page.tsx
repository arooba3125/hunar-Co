import { Hero } from "@/features/home/hero";
import { HowItWorks } from "@/features/home/how-it-works";
import { FeaturedDesigns } from "@/features/home/featured-designs";
import { FeaturedCreators } from "@/features/home/featured-creators";
import { AudienceActions } from "@/features/home/audience-actions";

// The home page is built from sections in src/features/home/.
export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturedDesigns />
      <FeaturedCreators />
      <AudienceActions />
    </>
  );
}
