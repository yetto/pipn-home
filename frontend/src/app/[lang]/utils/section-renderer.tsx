import Hero from "../components/Hero/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import FeaturesSwich from "../components/FeaturesSwich/FeaturesSwich";
import Pricing from "../components/Pricing";
import Email from "../components/Email";
import RichTextPage from "../components/RichTextPage";

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.features":
      return <Features key={index} data={section} />;
    case "sections.features-swich":
      return <FeaturesSwich key={index} data={section}/>;
      case "sections.rich-text":
        return <RichTextPage key={index} data={section} />;
    case "sections.testimonials-group":
      return <Testimonials key={index} data={section} />;
    case "sections.pricing":
      return <Pricing key={index} data={section} />;
    case "sections.lead-form":
      return <Email key={index} data={section} />;
    default:
      return null;
  }
}
