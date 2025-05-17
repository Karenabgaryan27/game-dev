import React from "react";
import useParallaxEffect from "../../../hooks/useParallaxEffect";
import localData from "@/localData";
import { useGlobalContext } from "@/contexts/context";

const { unitPlaceholderImage } = localData.images;

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

export default function UnitCard({
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

  const { unitImages } = useGlobalContext();

  return (
    <div
      className={`card unit-card ${className} ${color || 'gray'}`}
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
            (imageID && unitImages.find((image:  any) => image.id == imageID)?.url) ||
            unitPlaceholderImage
          }
          alt=""
        />
      </div>
    </div>
  );
}
