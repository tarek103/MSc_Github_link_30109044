import FeatureSectionOverview from "./FeatureSectionOverview";
import FoodSectionOverview from "./FoodSectionOverview";
import GallerySectionOverview from "./GallerySectionOverview";
import HeroSectionOverview from "./HeroSectionOverview";
import ImpactSectionOverview from "./ImpactSectionOverview";

const HomepageOverview = () => {
  return (
    <div className="px-0 xl:px-6">
      <HeroSectionOverview />
      <FoodSectionOverview />
      <FeatureSectionOverview />
      <ImpactSectionOverview />
      <GallerySectionOverview />
    </div>
  );
};

export default HomepageOverview;
