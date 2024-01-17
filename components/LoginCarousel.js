"use client";
import * as React from "react";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function ImagesCarousel() {
  const imageUrls = [
    "/login.png",
    "/manager2.png",
    "/cup1.png",
    "/football_manager_fantasy.png",
    "/cup.png",
    "/fpl-celebrate.png",
    "/aclarkdc_black_friday_graphics_of_Confident_young_Black_man_wit_f5535618-4a5b-4e49-8829-20128f58781c.png",
    "/Manager-rain.png",
    "/manager.png",
  ];
  return (
    <Carousel
      className="w-full max-w-xs h-full"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2500,
        }),
      ]}
    >
      <CarouselContent>
        {imageUrls.map((imageUrl, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Image
                src={imageUrl}
                alt={`Image ${index + 1}`}
                className="max-w-full max-h-full"
                width={500}
                height={500}
                loading="lazy"
                unoptimized
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
