"use client";

import React, { useRef, ReactNode } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type CarouselDemoProps = {
  className?: string;
  itemClassName?: string;
  orientation?: "horizontal" | "vertical" | undefined;
  loop?: boolean;
  align?: "start" | "center";
  autoplay?: boolean;
  items?: any[];
  children: (props: { item: any; index: number }) => ReactNode;
};

export function CarouselDemo({
  className = "",
  itemClassName = "md:basis-1/2 lg:basis-1/3",
  orientation = "horizontal",
  loop = false,
  align = "start",
  autoplay = false,
  items = [],
  children = () => "",
}: CarouselDemoProps) {
  const carouselRef = useRef(null);

  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      // Do something on select.
      console.log("trigger");
    });
  }, [api]);

  return (
    <Carousel
      ref={carouselRef}
      setApi={setApi}
      
      className={`${className} `}
      opts={{
        align: align,
        loop: loop,
        slidesToScroll: 1
      }}
      orientation={orientation}
    >
      <CarouselContent className="-ml-1">
        {items.map((item, index) => (
          <CarouselItem key={index} className={`  p-2 ${itemClassName}`}>
            <div className="">
            {children({ item, index })}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation Arrows */}
      <div className="carousel-angles absolute md:static left-[50%] md:left-[none] translate-x-[-50%] md:translate-x-[none] bottom-[-30px] md:bottom-[none]">
        <CarouselPrevious className="disabled:hidden cursor-pointer" />
        <CarouselNext className="disabled:hidden cursor-pointer" />
      </div>
    </Carousel>
  );
}
