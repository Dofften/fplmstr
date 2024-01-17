import Image from "next/image";

import { Button } from "@/components/ui/button";
import backgroundImage from "@/public/backgroundCTA.jpg";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-[#963cff] py-32"
    >
      <div className="absolute h-full w-full top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
        <Image
          src={backgroundImage}
          alt=""
          width={2347}
          height={1244}
          unoptimized
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h2
            className={`${lexend.className} text-3xl tracking-tight text-white sm:text-4xl`}
          >
            Get started
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            Professionally manage your FPL team with our FPL Mstr. Try now to
            experience the thrill of productive team management.
          </p>
          <a href="/signin">
            <Button className="mt-10 bg-white hover:bg-[#eeeeee] text-black rounded-full">
              Try Now
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
