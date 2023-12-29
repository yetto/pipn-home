import Link from "next/link";
import Image from "next/image";
import HighlightedText from "../HighlightedText";
import { getStrapiMedia } from "../../utils/api-helpers";
import { renderButtonStyle } from "../../utils/render-button-style";
import cn from "clsx";
import s from "./Hero.module.css";
import classNames from "classnames";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

interface HeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    picture: Picture;
    buttons: Button[];
    isBackGround: boolean;
    darkurl: string | null | undefined;
    ligthUrl: string | null | undefined;
  };
}

export default function Hero({ data }: HeroProps) {
  const { darkurl, ligthUrl } = data;
  const imgUrl = getStrapiMedia(data.picture.data.attributes.url);

  const backgroundImage = `bg-[url(${'"' + ligthUrl + '"'})] dark:bg-[url(${
    '"' + darkurl + '"'
  })]`;

  const classNameRoot = cn({
    [s.root]: !data.isBackGround,
    [backgroundImage]: data.isBackGround,
  });

  return (
    <section className={classNames(classNameRoot)}>
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center p-6 text-center rounded-lg lg:max-w-md xl:max-w-lg lg:text-left">
          <HighlightedText
            text={data.title}
            tag="h1"
            className="mb-8 text-5xl font-bold leading-none sm:text-6xl"
            color="dark:text-yellow-400"
          />

          <HighlightedText
            text={data.description}
            tag="p"
            className="mb-8 text-lg tmt-6 sm:mb-12"
            color="dark:text-yellow-400"
          />
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            {data.buttons.map((button: Button, index: number) => (
              <Link
                key={index}
                href={button.url}
                target={button.newTab ? "_blank" : "_self"}
                className={renderButtonStyle(button.type)}
              >
                {button.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center h-full p-6 mt-8 lg:mt-0">
          <Image
            src={imgUrl || ""}
            alt={
              data.picture.data.attributes.alternativeText || "none provided"
            }
            className="object-contain h-full "
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  );
}
