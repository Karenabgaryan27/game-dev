import React from "react";
import useParallaxEffect from "../../../hooks/useParallaxEffect";
import localData from "@/localData";
import { useGlobalContext } from "@/contexts/context";

const { heroPlaceholderImage } = localData.images;

// type HeroCardProps = {
//   title?: string;
//   description?: string;
//   image?: string;
//   className?: string;
//   reverse?: boolean;
//   glare?: boolean;
//   maxGlare?: number;
//   index?: number;
// };

export default function HeroCard({
  title,
  // description,
  label,
  url,
  imageID,
  className = "",
  color = "",
  reverse = false,
  glare = false,
  maxGlare = 0.8,
  index = 0,
}: {
  [key: string]: any;
}) {
  const { start, end, move } = useParallaxEffect({
    reverse,
    glare,
    maxGlare,
  });

  const { heroImages } = useGlobalContext();

  return (
    <div
      className={`card hero-card ${className} ${color || 'gray'}`}
      onMouseMove={move}
      onMouseLeave={end}
      onMouseEnter={start}
    >
      <div className="card-inner" data-parallax-inner>
        {/* <h4 className="card-title">{title}</h4> */}
        {label && <p className="card-description">{label}</p>}
        <img
          className={`card-image  ${color || "!grayscale !opacity-50"}`}
          src={
            (imageID && heroImages.find((image:  any) => image.id == imageID)?.url) ||
            heroPlaceholderImage
          }
          alt=""
        />
      </div>
    </div>
  );
}
