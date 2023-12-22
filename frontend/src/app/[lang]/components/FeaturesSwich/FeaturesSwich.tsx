"use client";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import cn from "clsx";
import s from "./FeaturesSwich.module.css";
interface FeaturesProps {
  data: {
    heading: string;
    description: string;
    feature: FeatureSwich[];
  };
}

interface FeatureSwich {
  id: string;
  title: string;
  description: string;
  showLink: boolean;
  newTab: boolean;
  url: string;
  text: string;
  variant: string;
}

enum Course {
  COMIPEMS = 'comipems',
  SUPERIOR = 'superior'
}

function FeatureSwich({ title, description, showLink, newTab, url, text, variant }: FeatureSwich) {

  const rootHeadingButtonClassName = cn({
    [s.buttonComipems]: variant === Course.COMIPEMS,
    [s.buttonSuperior]: variant === Course.SUPERIOR,
})
  return (
    <div className="flex flex-col items-center p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-8 h-8 dark:text-yellow-400"
      >
        <path
          fillRule="evenodd"
          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
          clipRule="evenodd"
        ></path>
      </svg>
      <h3 className="my-3 text-3xl font-semibold">{title}</h3>
      <div className="space-y-1 leading-tight my-6">
        <p>{description}</p>
      </div>
      {showLink && url && text && (
        <div>
          <Link
            href={url}
            target={newTab ? "_blank" : "_self"}
            className={rootHeadingButtonClassName}
          >
            {text}
          </Link>
        </div>
      )}
    </div>
  );
}

export default function FeaturesSwich({ data }: FeaturesProps) {

   const [courseSelected, setCourseSelected] = useState(Course.COMIPEMS);
   const [dataFilterByCourse, setDataFilterByCourse] = useState<FeatureSwich[]>([])
   const handleOnCourse = useCallback((course: Course) => () => {
      setCourseSelected(course);
    }, [setCourseSelected]);

  useEffect(() => {
    let dataFiler
    if(courseSelected === Course.COMIPEMS) {
      dataFiler = data.feature.filter((feature) => feature.variant === Course.COMIPEMS)
    } else {
      dataFiler = data.feature.filter((feature) => feature.variant === Course.SUPERIOR)
    }
    setDataFilterByCourse(dataFiler)
  }, [courseSelected])

  const rootHeadingButtonClassName = cn(s.buttonSelectedCourseLeft,{
    [s.buttonSelectedCourseComipems]: courseSelected === Course.COMIPEMS,
})

const rootHeadingButtonClassNameSuperior = cn(s.buttonSelectedCourseRight,{
  [s.buttonSelectedCourseSuperior]: courseSelected === Course.SUPERIOR,
})

  return (
    <section className="dark:bg-black dark:text-gray-100 m:py-12 lg:py-24">
      <div className="container mx-auto py-4 space-y-2 text-center">
        <h2 className="text-5xl font-bold">{data.heading}</h2>
        <p className="dark:text-gray-400">{data.description}</p>
        <Flex>
          <Button
            value={Course.COMIPEMS}
            className={rootHeadingButtonClassName}
            onClick={handleOnCourse(Course.COMIPEMS)}>
            Comipens
          </Button>
          <Button
            value={Course.SUPERIOR}
            className={rootHeadingButtonClassNameSuperior} 
            onClick={handleOnCourse(Course.SUPERIOR)}>
            Superior
          </Button>
        </Flex>
      </div>
      <div className="container mx-auto my-6 grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dataFilterByCourse.map((feature: FeatureSwich, index: number) => (
          <FeatureSwich key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}
