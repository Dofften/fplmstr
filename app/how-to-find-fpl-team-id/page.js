import Footer from "@/components/Footer";
import HomeHeader from "@/components/Header";
import Image from "next/image";
import TeamID from "@/public/FPL-Team-ID.png";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
  title: "Find FPL Team ID",
  description: "How to find your FPL Team ID.",
};

const headerItems = [
  {
    title: "Sign In",
    href: `/signin`,
  },
];
export default function page() {
  return (
    <div>
      <HomeHeader items={headerItems} />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
            <h2
              className={`${lexend.className} mb-4 text-4xl tracking-tight font-bold text-[#06000c] dark:text-white`}
            >
              How to find your FPL Team ID
            </h2>
            <p className="mb-4 font-light text-[#06000c]">
              The below steps will show you how to find your FPL Team ID:
            </p>
            <div className="mb-4 text-[#06000c]">
              <ul className="list-decimal">
                <li>
                  Log in to your FPL account and navigate to the points page
                </li>
                <li>
                  The URL will have a unique number between /entry/ and /event/
                  which is your FPL team ID
                </li>
                <li>In the example below, the FPL Team ID is 7870392</li>
              </ul>
              <p>
                *You need to do this via a browser on a
                mobile/tablet/laptop/desktop.
              </p>
            </div>
            <Image alt="FPL Team ID" width={1920} height={1022} src={TeamID} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
