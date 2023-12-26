"use client";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface Testimonial {
  text: string;
  authorName: string;
  picture: {
    data: {
      id: string;
      attributes: {
        name: string;
        alternativeText: string;
        url: string;
      };
    };
  };
}

interface TestimonialsProps {
  data: {
    id: string;
    title: string;
    description: string;
    testimonials: Testimonial[];
  };
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function Testimonial({ text, authorName, picture }: Testimonial) {
  const imageUrl = getStrapiMedia(picture.data.attributes.url);
  return (
    <div className="flex flex-col items-center mx-12 lg:mx-0">
      <div className="flex items-center">
        <div className="my-6">
          <Image
            src={imageUrl || ""}
            alt={picture.data.attributes.alternativeText || "none provided"}
            className="inline-block h-32 w-32 rounded-full"
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className="relative text-center">
        <p className="px-6 py-1 text-lg italic">{text}</p>
      </div>
      <span className="w-12 h-1 my-2 rounded-lg dark:bg-yellow-400"></span>
      <p>{authorName}</p>
    </div>
  );
}

export default function Testimonials({ data }: TestimonialsProps) {
  return (
    <section className="dark:bg-black dark:text-gray-100  m:py-12 lg:py-24">
      <div className="container mx-auto py-4 space-y-2 text-center">
        <h1 className="text-4xl font-semibold leading-none text-center">
          {data.title}
        </h1>
        <p className="mt-4 text-lg text-center">{data.description}</p>
      </div>
      <Carousel infinite={true} responsive={responsive} className="container mx-auto grid grid-cols-1 gap-8 lg:gap-20 md:px-10 md:pb-10 lg:grid-cols-2">
        {data.testimonials.map((testimonial: Testimonial, index: number) => (
          <Testimonial key={index} {...testimonial} />
        ))}
      </Carousel>
    </section>
  );
}
