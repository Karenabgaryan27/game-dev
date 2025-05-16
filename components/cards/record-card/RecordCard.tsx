"use client";

import React, { useState, useEffect } from "react";
import useParallaxEffect from "../../../hooks/useParallaxEffect";
import localData from "@/localData";
import useUtil from "@/hooks/useUtil";

const { documentImage, acceptedImage, rejectedImage } = localData.images;

export default function RecordCard({
  status = "",
  event = {},
  reviewer = {},
  title = "",
  description = "",
  image = "",
  className = "",
  axisDepth = 5,
}: any) {
  const { start, end, move } = useParallaxEffect({
    // axisDepth: 25,
    axisDepth: axisDepth,
    reverse: true,
    glare: true,
    // imageReverse: true
    speed: 50,
    imageSpeed: 200,
  });

  const [state, setState] = useState<any>({
    date: "",
  });

  const { formatTimestampToDate } = useUtil();

  useEffect(() => {
    if (!reviewer.updatedAt) return;
    const date = formatTimestampToDate(reviewer.updatedAt);
    setState((prev: any) => ({
      ...prev,
      date,
    }));
  }, [reviewer.updatedAt]);

  return (
    <div>
      <h4 className="text-center text-[10px] leading-none whitespace-nowrap !text-ellipsis w-full !overflow-hidden mb-1">
        {event.type}
      </h4>
      <div
        className={`card record-card  ${className}   ${status === "accepted" ? "green" : "red"} mb-2`}
        onMouseMove={move}
        onMouseLeave={end}
        onMouseEnter={start}
      >
        <div className="card-inner" data-parallax-inner>
          <div className="card-cover">
            <div className={`card-cover-inner`} data-parallax-image>
              <img src={image || documentImage} className={``} alt="" />
            </div>
            <img
              className="second-image"
              src={status === "accepted" ? acceptedImage : rejectedImage}
              alt=""
            />
          </div>
          <div className="wrapper">
            {/* <h4 className="card-title">{title}</h4> */}
            {/* <p className="card-description">{description}</p> */}
          </div>
        </div>
        {/* <p className="card-description">{description}</p> */}
      </div>
      <div className="text-center text-[10px] text-gray-400 leading-none whitespace-nowrap !text-ellipsis w-full !overflow-hidden">
        {state.date}
      </div>
    </div>
  );
}

