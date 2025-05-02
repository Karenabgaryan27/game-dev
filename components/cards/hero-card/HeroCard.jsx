import React from "react";
import useParallaxEffect from "../../../hooks/useParallaxEffect";

export default function JSHoverCard({
  title,
  description,
  image,
  className = "",
  reverse = false,
  glare = false,
  maxGlare = 0.8,
}) {
  const { start, end, move } = useParallaxEffect({
    reverse,
    glare,
    maxGlare,
  });

  return (
    <div
      className={`card hero-card ${className}`}
      onMouseMove={move}
      onMouseLeave={end}
      onMouseEnter={start}
    >
      <div className="card-inner" data-parallax-inner>
        {/* <h4 className="card-title">{title}</h4> */}
        <p className="card-description">{description}</p>
        <img className="card-image" src={image} alt="" />
      </div>
    </div>
  );
}
