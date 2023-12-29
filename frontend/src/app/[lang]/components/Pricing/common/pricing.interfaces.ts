export interface Feature {
  id: string;
  attributes: {
    name: string;
  };
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  pricePeriod: string;
  url: string;
  buttonLabel: string;
  newTab: string;
  isRecommended: boolean;
  product_features: {
    data: Feature[];
  };
}

export interface PriceProps {
  data: {
    id: string;
    title: string;
    plans: Plan[];
  };
}