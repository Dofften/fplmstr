"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import clsx from "clsx";

import backgroundImage from "@/public/backgroundFeatures.jpg";
import screenshotyou from "@/public/dashboardScreenshot.png";
import screenshotai from "@/public/youvsai.png";
import screenshottop250 from "@/public/youvstop250.png";
import screenshotAllPlayers from "@/public/allPlayers.png";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

const features = [
  {
    title: "You",
    description: "Your current team with predictions for the next gameweek",
    image: screenshotyou,
  },
  {
    title: "You vs AI",
    description:
      "Your current team side-by-side with a team predicted by AI to score the highest points selected following fpl rules",
    image: screenshotai,
  },
  {
    title: "You vs Top 250",
    description:
      "Your current team side-by-side with a combined 15 team chosen from most selected players by top 250 FPL managers",
    image: screenshottop250,
  },
  {
    title: "Statistics",
    description: "A table with stats of all players",
    image: screenshotAllPlayers,
  },
];

export function PrimaryFeatures() {
  let [tabOrientation, setTabOrientation] = useState("horizontal");

  useEffect(() => {
    let lgMediaQuery = window.matchMedia("(min-width: 1024px)");

    function onMediaQueryChange({ matches }) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);

  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="relative overflow-hidden bg-[#963cff] pt-20 pb-28 sm:py-32"
    >
      <div className="absolute h-96 w-96 lg:h-full lg:w-full top-1/2 left-1/2 -translate-x-[44%] -translate-y-[42%]">
        <Image
          src={backgroundImage}
          alt=""
          width={2245}
          height={1636}
          unoptimized
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2
            id="features-title"
            className={`${lexend.className} text-3xl tracking-tight text-white sm:text-4xl md:text-5xl`}
          >
            Everything you need to win.
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
            Well everything you need if you aren’t that picky about minor
            details like vice captain choice.
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === "vertical"}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex space-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:space-y-1 lg:space-x-0 lg:whitespace-normal">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        "group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6",
                        {
                          "bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10":
                            selectedIndex === featureIndex,
                          "hover:bg-white/10 lg:hover:bg-white/5":
                            selectedIndex !== featureIndex,
                        }
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            `${lexend.className} text-lg [&:not(:focus-visible)]:focus:outline-none`,
                            {
                              "text-[#963cff] lg:text-white":
                                selectedIndex === featureIndex,
                              "text-white hover:text-white lg:text-white":
                                selectedIndex !== featureIndex,
                            }
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl" />
                          {feature.title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx("mt-2 hidden text-sm lg:block", {
                          "text-white": selectedIndex === featureIndex,
                          "text-blue-100 group-hover:text-white":
                            selectedIndex !== featureIndex,
                        })}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="lg:col-span-7">
                {features.map((feature) => (
                  <Tab.Panel key={feature.title} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 -top-[6.5rem] -bottom-[4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                        {feature.description}
                      </p>
                    </div>
                    <div className="relative mt-10 aspect-[1085/730] w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                      <Image
                        src={feature.image}
                        alt=""
                        priority
                        sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                        unoptimized
                      />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </div>
    </section>
  );
}
