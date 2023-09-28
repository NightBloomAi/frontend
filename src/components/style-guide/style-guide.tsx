/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

export default function StyleGuide() {
  const router = useRouter();
  return (
    <section className="flex flex-col justify-center items-center">
      <div className="h-16"></div>
      <div className="flex flex-col justify-center items-center my-16 gap-y-4 md:my-32 md:gap-y-8">
        <h1 className="text-4xl md:text-5xl font-museo">Style Guide</h1>
        <h2 className="text-center">
          Embrace your curiousity - Explore popular styles
        </h2>
      </div>
      <div className="h-16"></div>
      <div className="flex items-center justify-center flex-wrap gap-x-7 gap-y-7">
        {styles?.map((item) => {
          return (
            <div
              key={item.displayName}
              className="bg-[var(--lightish-grey)] rounded-xl boxshadow w-72 h-96 flex-col flex items-start justify-start"
            >
              <div className="text-[var(--onDark)] my-5 mx-4 text-base">
                {item.displayName}
              </div>
              <img
                src={item.imgsrc}
                alt={item.displayName}
                className="w-full h-36 object-cover "
              />
              <div className="my-5 mx-4 text-sm">{item.descript}</div>
              <div className="w-full flex mt-auto items-center justify-end">
                <div
                  onClick={() => router.push(`/style-guide/${item.name}`)}
                  className="rounded-full h-10 w-24 border-2 border-[var(--onDark)] flex items-center justify-center my-5 mx-4 cursor-pointer hover:bg-[var(--onDark)] text-[var(--onDark)] hover:text-[var(--lightish-grey)] hover:-translate-y-1 duration-300"
                >
                  Explore
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-16"></div>
    </section>
  );
}

export type StylesType = {
  name: string;
  displayName: string;
  imgsrc: string;
  descript: string;
};

export const styles: StylesType[] = [
  {
    name: "isometric_anime",
    displayName: "Isometric Anime",
    imgsrc:
      "https://cdn.midjourney.com/86169245-149b-43ce-ac4c-0b6ea7af2850/0_0.png",
    descript:
      "Often seen in video games and futuristic-themed anime, this style provides a unique visual experience.",
  },
  {
    name: "2d_illustration",
    displayName: "2D Illustration",
    imgsrc:
      "https://cdn.midjourney.com/bd24f473-2bb8-44f8-975c-40a47544c0a9/0_0.png",
    descript:
      "Commonly used in children's books, graphic novels, and animation. Good at bringing concepts to life.",
  },
  {
    name: "pixel_art",
    displayName: "Pixel Art",
    imgsrc:
      "https://cdn.midjourney.com/5727ecaf-856b-40f7-b8ef-27e125f064e9/0_0.png",
    descript:
      "Popularized in the early days of video games and is still used today as a form of nostalgia.",
  },
  {
    name: "",
    displayName: "Oil Paint",
    imgsrc: "",
    descript:
      "This style is favored by many artists for its versatility and ability to create fine details and soft blends.",
  },
];
