import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lexend, Bricolage_Grotesque } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

export function Hero() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
      <div className="pt-20 pb-16 text-center lg:pt-32">
        <h1
          className={`mx-auto max-w-4xl ${bricolage.className} text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl`}
        >
          win your{" "}
          <span className="relative whitespace-nowrap text-[#963cff]">
            <span className="relative">
              <text className="line-through"> mini-</text>leagues
            </span>
          </span>
          {", "}
          conquer FPL.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          Most fantasy football softwares offer complexity and lack
          user-friendliness. At FPL Mstr, we make the opposite trade-off –
          ensuring simplicity without compromising on results. No red arrow
          worries, just conquering FPL with ease.
        </p>
        <div className="mt-10 flex justify-center space-x-6">
          <Button
            href="/register"
            className="rounded-full hover:motion-preset-confetti"
          >
            <Link href={"/signin"}>Try Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
