import Footer from "@/components/Footer";
import HomeHeader from "@/components/Header";
import { Button } from "@/components/ui/button";
import fpl_challenge from "@/public/fpl-challenge.png";
import Image from "next/image";
import Link from "next/link";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
  title: "Fantasy challenge: What is it and how to play",
  description:
    "Get ready for FPL Challenge! This exciting twist on Fantasy Premier League lets you flex your manager muscles in a whole new way.  Every week there's a fresh challenge and a chance to build a dream team from scratch. The best part?  Prizes are up for grabs each week and your results won't mess with your main FPL game.",
};

const headerItems = [
  {
    title: "Try our AI template",
    href: `/dashboard/fpl-challenge`,
  },
];
export default function page() {
  return (
    <div>
      <HomeHeader items={headerItems} />
      <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            />
          </svg>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-indigo-600">
                  The new Fantasy Challenge
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Fantasy Challenge
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  Get ready for FPL Challenge! This exciting twist on Fantasy
                  Premier League lets you flex your manager muscles in a whole
                  new way. Every week there&lsquo;s a fresh challenge and a
                  chance to build a dream team from scratch. The best part?
                  Prizes are up for grabs each week and your results won&lsquo;t
                  mess with your main FPL game.
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <Image
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              src={fpl_challenge}
              alt=""
              unoptimized
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <p>Here are some of the key differences:</p>
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <span>
                      <strong className="font-semibold text-gray-900">
                        New week. New challenge.
                      </strong>{" "}
                      Start each Gameweek with a blank team sheet, reset budget
                      and a new challenge. Leaderboards start fresh each week.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Team selection.
                      </strong>{" "}
                      FPL Challenge usually sticks to a classic Fantasy Premier
                      League format: a 15-player squad with a £100.0m budget.
                      You can have up to 5 players from the same team, and
                      you&lsquo;ll need 2 Goalkeepers, 5 Defenders, 5
                      Midfielders, and 3 Forwards. But keep in mind, some
                      Challenges might change the rules!
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Deadlines.
                      </strong>{" "}
                      Make changes anytime...until kickoff: You can tweak your
                      team - lineups, transfers, even your captain - at any
                      point during the Gameweek. But, once a player&lsquo;s club
                      starts their first match, they&lsquo;re locked in!
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Prizes.
                      </strong>{" "}
                      Join the Beta for a chance to win a trip to New York. You
                      can also win weekly prizes like signed Premier League
                      shirts, the Official Premier League Nike match ball and EA
                      SPORTS FC™.
                    </span>
                  </li>
                </ul>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                  Crepant AI Template Team.
                </h2>
                <p className="mt-6">
                  Take the stress out of FPL Challenge! Our web app&lsquo;s AI
                  analyzes fixtures, player form, and weekly rules to build a
                  winning template team. Spend less time agonizing over lineups
                  and more time enjoying those weekly wins.
                </p>
                <div className="mt-10 flex justify-center space-x-6">
                  <Button
                    href="/dashboard/fpl-challenge"
                    className="rounded-full"
                  >
                    <Link href={"/dashboard/fpl-challenge"}>Try Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
