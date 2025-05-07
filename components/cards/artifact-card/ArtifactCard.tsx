import React from "react";
import useParallaxEffect from "../../../hooks/useParallaxEffect";
import localData from "@/localData";
import { useGlobalContext } from "@/contexts/context";

const { artifactPlaceholderImage } = localData.images;

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

export default function ArtifactCard({
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

  const { artifactImages } = useGlobalContext();

  return (
    <div
      className={`card artifact-card ${className} ${color || 'gray'}`}
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
            (imageID && artifactImages.find((image:  any) => image.id == imageID)?.url) ||
            artifactPlaceholderImage
          }
          alt=""
        />
      </div>
    </div>
  );
}
