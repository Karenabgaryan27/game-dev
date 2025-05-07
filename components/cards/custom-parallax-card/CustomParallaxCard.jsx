import React from "react";
import useParallaxEffect from "../../../hooks/useParallaxEffect";
import localData from "@/localData";

const { heroPlaceholderImage } = localData.images;

export default function CustomParallaxCard({ title='', description='', image='', className = "", axisDepth=25 }) {
  const { start, end, move } = useParallaxEffect({
    // axisDepth: 25,
    axisDepth: axisDepth,
    reverse: true,
    glare: true,
    // imageReverse: true
    speed: 500,
    imageSpeed: 100,
  });
  return (
    <div
      className={`card custom-parallax-card  ${className}`}
      onMouseMove={move}
      onMouseLeave={end}
      onMouseEnter={start}
    >
      <div className="card-inner" data-parallax-inner>
        <div className="card-cover">
          <div className="card-cover-inner" data-parallax-image>
            <img src={image || heroPlaceholderImage} className={`${!image ? '!object-contain !grayscale !opacity-50 !w-[80%] !h-[80%] !transform-[translate(-50%,-50%)] !left-[50%] !top-[50%]':''}`} alt="" />
          </div>
        </div>
        <div className="wrapper">
          {/* <h4 className="card-title">{title}</h4> */}
          {/* <p className="card-description">{description}</p> */}
        </div>
      </div>
      {/* <p className="card-description">{description}</p> */}
    </div>
  );
}
