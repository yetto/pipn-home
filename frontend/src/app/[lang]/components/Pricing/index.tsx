import { Plan, PriceProps } from "./common/pricing.interfaces";
import PlanBody from "./components/PlanBody";

export default function Pricing({ data }: PriceProps) {
  return (
    <section className="py-20 dark:bg-black dark:text-gray-50 md:py-12 lg:py-24">
      <div className="container px-4 mx-auto ">
        <div className="max-w-2xl mx-auto mb-5 text-center">
          <span className="font-bold tracking-wider uppercase dark:text-yellow-400">
            Precios
          </span>
          <h2 className="text-4xl font-bold lg:text-5xl">{data.title}</h2>
        </div>
        <div className="flex flex-wrap items-stretch justify-center max-w-5xl mx-auto">
          {data.plans.map((plan: Plan) => (
            <PlanBody plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
