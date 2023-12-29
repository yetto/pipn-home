import Link from "next/link";
import { Feature, Plan } from "../common/pricing.interfaces";
import PlanFeature from "./PlanFeature";
import { clsx } from "clsx";
import s from "../Pricing.module.css";

export default function PlanBody({ plan }: { plan: Plan }) {
  const { isRecommended } = plan;
  const planBodyStyles = clsx({
    [s.rootPlanBody]: true,
    [s.planBodyRecommended]: isRecommended,
    [s.planBodyNormal]: !isRecommended,
  });
  const planPricePeriodStyles = clsx({
    [s.rootPeriod]: true,
    [s.periodRecommended]: isRecommended,
    [s.periodNormal]: !isRecommended,
  });
  const planDescriptionStyles = clsx({
    [s.rootDescription]: true,
    [s.descriptionRecommended]: isRecommended,
    [s.descriptionNormal]: !isRecommended,
  });
  const planFeaturesStyles = clsx({
    [s.rootFeatures]: true,
    [s.featuresRecommended]: isRecommended,
    [s.featuresNormal]: !isRecommended,    
  });
  const iconFeaturesStyles = clsx({
    [s.rootIconFeatures]: true,
    [s.iconFeaturesRecommended]: isRecommended,
    [s.iconFeaturesNormal]: !isRecommended,
  });
  const planCtaStyles = clsx('btn-base', {
    [s.rootCta]: true,
    [s.ctaRecommended]: isRecommended,
    [s.ctaNormal]: !isRecommended,
  });
  return (
    <div
      key={plan.id}
      className="w-full p-4 mb-8 sm:mx-40 lg:mx-0 lg:w-1/3 lg:mb-0"
    >
      <div className={planBodyStyles}>
        <div className="space-y-2">
          <h4 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">{plan.name}</h4>
          <span className="text-6xl font-bold text-gray-800 dark:text-white">
            ${plan.price}
            <span className={planPricePeriodStyles}>
              {plan.pricePeriod.toLowerCase()}
            </span>
          </span>
        </div>
        <p className={planDescriptionStyles}>{plan.description}</p>
        <ul className={planFeaturesStyles}>
          {plan.product_features.data.map((feature: Feature) => (
            <PlanFeature feature={feature} isIconStyles={iconFeaturesStyles} />
          ))}
        </ul>
        <Link
          href={plan.url ? plan.url : "about:blank"}
          target={plan.newTab ? "_blank" : "_self"}
          className={planCtaStyles}
        >
          {plan.buttonLabel ? plan.buttonLabel : "Info"}
        </Link>
      </div>
    </div>
  );
}
