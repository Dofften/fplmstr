"use client";

import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Logo from "@/public/FPL_Mstr.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/Manager1.png" alt="manager" />
                <AvatarFallback>FPL</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session?.user?.name}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button onClick={() => signOut()}>Sign out</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default function Nav({ className, items, ...props }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        <div className="flex md:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">FPL Mstr</span>
            <Image
              className="h-8 w-auto"
              src={Logo}
              height={800}
              width={1366}
              alt="FPL Mstr Logo"
              unoptimized
            />
          </a>
        </div>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden md:flex lg:gap-x-12 bg-gray-200 rounded p-1">
          {items.map((item) => (
            <div
              className={`${
                pathname === item.href
                  ? "bg-white text-black shadow-md"
                  : "text-black/25 hover:text-black/50 hover:bg-gray-100"
              } justify-start text-sm rounded px-1 py-0.5`}
              key={item.href}
            >
              <Link
                href={item.href}
                className="text-sm font-semibold leading-6 p-4"
              >
                {item.title}
              </Link>
            </div>
          ))}
        </Popover.Group>
        <div className="hidden md:flex md:flex-1 md:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            <AuthButton />
          </a>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">FPL Mstr</span>
              <Image
                className="h-8 w-auto"
                src={Logo}
                height={800}
                width={1366}
                alt="FPL Mstr Logo"
                unoptimized
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="space-y-1 pt-2 pb-3">
            {items.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? "block bg-white py-2 pl-3 pr-4 text-base font-medium text-black shadow-md"
                      : "block py-2 pl-3 pr-4 text-base font-medium text-black/25 hover:text-black/50 hover:bg-gray-100"
                  } justify-start text-sm rounded px-1 py-0.5`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4">
                <div className="text-base font-medium text-gray-800">
                  {session ? session?.user?.name : "Please Sign in"}
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  <Button
                    onClick={() => signOut()}
                    variant="ghost"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign out
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
