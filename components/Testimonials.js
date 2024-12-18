"use client";

import { Lexend, Bricolage_Grotesque } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

const testimonials = [
  [
    {
      content:
        "FPL Mstr is incredibly user-friendly; sometimes, I can't help but question if it's actually handling all the intricate aspects of team management the way it promises.",
      author: {
        name: "Mumbua Kiilu",
        role: "Founder of L4R",
      },
    },
    {
      content:
        "There are numerous tasks I used to navigate with my previous fantasy football management tool that I simply find unnecessary with FPL Mstr. It might sound skeptical, but I can't deny my newfound appreciation for its simplicity and efficiency.",
      author: {
        name: "Dofften",
        role: "Manager of dofften fc",
      },
    },
  ],
  [
    {
      content:
        "The most appealing aspect of FPL Mstr is that I can budget for my transfers without breaking my bank with so much ease.",
      author: {
        name: "Shoniwa",
        role: "Manager of SHONIWA FC",
      },
    },
    {
      content:
        "Numerous tasks that consumed my time with other FPL softwares are now completely unnecessary with FPL Mstr. It raises suspicion, yet I can't deny my genuine affection for its streamlined functionality.",
      author: {
        name: "Big Ange",
        role: "Manager of Title Contenders",
      },
    },
  ],
  [
    {
      content:
        "I always make transfers last minute which means no analysis. With FPL Mstr I find analyses already done for me and I could literally copy paste and be top of my mini-league",
      author: {
        name: "Frank Omondi",
        role: "Founder of FPL Mstr",
      },
    },
    {
      content:
        "This is the fourth email I’ve sent to your support team. I am literally being held in jail for FPL fraud. Please answer your damn emails, this is important.",
      author: {
        name: "IA",
        role: "Manager of Pique Blinders",
      },
    },
  ],
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="bg-slate-50 py-20 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl md:text-center">
          <h2
            id="testimonials-title"
            className={`${bricolage.className} text-3xl tracking-tight text-slate-900 sm:text-4xl`}
          >
            loved by serious fpl managers
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            it’s so easy to use you’ll be a pro in 5 minutes
          </p>
        </div>
        <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul className="space-y-6 sm:space-y-8">
                {column.map((testimonial, testimonialIndex) => (
                  <li key={testimonialIndex}>
                    <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                      <svg
                        aria-hidden="true"
                        width={105}
                        height={78}
                        className="absolute top-6 left-6 fill-slate-100"
                      >
                        <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
                      </svg>
                      <blockquote className="relative">
                        <p className="text-lg tracking-tight text-slate-900">
                          {testimonial.content}
                        </p>
                      </blockquote>
                      <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                        <div>
                          <div
                            className={`${lexend.className} text-base text-slate-900`}
                          >
                            {testimonial.author.name}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">
                            {testimonial.author.role}
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
