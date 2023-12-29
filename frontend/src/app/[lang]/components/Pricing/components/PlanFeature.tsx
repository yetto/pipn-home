import { Feature } from "../common/pricing.interfaces";

export default function PlanFeature({
  feature,
  isIconStyles,
}: {
  feature: Feature;
  isIconStyles: string;
}) {
  return (
    <li key={feature.id} className="flex mb-2 space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={isIconStyles}
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span>{feature.attributes.name}</span>
    </li>
  );
}
