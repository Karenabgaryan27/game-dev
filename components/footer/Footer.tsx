import React from "react";
import localData from "@/localData";

const { hero1Image, hero2Image } = localData.images;

const Footer = () => {
  return (
    <div className=" background-cover background-center min-h-[100px] flex gap-5 bg-black p-5 justify-between items-end flex-wrap">
      <div className="flex gap-5">
        <div className="wrapper">
          <img src={hero1Image} alt="" className="w-[100px] h-[100px] object-contain" />
        </div>
        <div className="wrapper">
          <img src={hero2Image} alt="" className="w-[100px] h-[100px] object-contain" />
        </div>
      </div>
      <p className="text-white text-xs font-normal">Ready to fight? Dragons, fire, and bad decisions await! © 2025 Call of Dragons.  </p>
    </div>
  );
};

export default Footer;
