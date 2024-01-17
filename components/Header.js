"use client";

import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "@/public/FPL_Mstr.png"

export default function HomeHeader({ className, items, ...props }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="py-6">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">FPL Mstr</span>
            <Image className="h-8 w-auto" src={Logo} height={800} width={1366} alt="FPL Mstr Logo" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12 bg-[#963cff] hover:bg-[#aa5fff] rounded p-1">
          {items.map((item) => (
            <div
              className={`${
                pathname === item.href
                  ? "bg-white text-black shadow-md"
                  : "text-white"
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
            <Image className="h-8 w-auto" src={Logo} height={800} width={1366} alt="FPL Mstr Logo" />
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
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6 rounded px-3">
                {items.map((item) => (
                  <div
                    key={item.href}
                    className={`${
                      pathname === item.href
                        ? "bg-white text-black shadow-md"
                        : "text-white bg-[#963cff] hover:bg-gray-100"
                    } justify-start text-sm rounded px-1 py-0.5`}
                  >
                    <Link
                      href={item.href}
                      className="text-sm font-semibold leading-6 p-4"
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
