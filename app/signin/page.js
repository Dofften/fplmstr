import Image from "next/image";
import Link from "next/link";

import { UserAuthForm } from "@/app/signin/userAuthForm";
import { ImagesCarousel } from "@/components/LoginCarousel";
import FPLMstr from "@/public/fplmstr-txt.png";

export const metadata = {
  title: "Authentication",
  description: "Sign in to your dashboard.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative grid h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image
              src={FPLMstr}
              alt=""
              width={50}
              height={50}
              unoptimized
            />
          </div>
          <div className="relative z-20 flex flex-col h-full">
            <div className="flex-grow flex items-center justify-center pt-20">
              <ImagesCarousel />
            </div>
            <blockquote className="space-y-2 text-left">
              <p className="text-lg">
                &ldquo;You&apos;re lucky I forgot to change my team.&rdquo;
              </p>
              <footer className="text-sm">- Dofften</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Enter your FPL Team ID below to login
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              <Link
                href="/how-to-find-fpl-team-id"
                className="underline underline-offset-4 hover:text-primary"
              >
                How do I find my FPL Team ID?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
