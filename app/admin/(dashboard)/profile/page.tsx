"use client";

import React, { useState, useEffect } from "react";
import { useApiContext } from "@/contexts/ApiContext";
import { BreadcrumbDemo, Separator, HeroCard, CustomParallaxCard, ButtonDemo } from "@/components/index";
import localData from "@/localData";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Settings, Pencil, Expand } from "lucide-react";

const {
  chakchaImage,
  elkridersImage,
  MadelineImage,
  SyndrionImage,
  SkogulImage,
  artifact2Image,
  arrowImage,
  giantsBoneImage,
  exampleImage,
  customArsenalScreenshot3Image,
  customArsenalScreenshot5Image,
  customArsenalScreenshot6Image,
} = localData.images;

const { userGearImage } = localData.svgs;

const breadcrumbItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    label: "My Profile",
  },
];

const Pages = () => {
  return (
    <main className="pages-page p-5">
      <h2 className="text-2xl mb-3">My Profile</h2>
      <BreadcrumbDemo items={breadcrumbItems} />
      <br />
      <br />
      <Card className="mb-[200px] min-h-[500px] relative pb-[100px]">
        <CardHeader>
          <div>
            <Separator title="Main Information" titleClassName="bg-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-[150px] relative  py-5">
            {/* <ButtonDemo startIcon={userGearImage} className="rounded-full w-[35px] h-[35px]" variant="ghost" />
            <ButtonDemo startIcon={<Pencil />} className="rounded-full w-[35px] h-[35px]" variant="ghost"/>
            <ButtonDemo startIcon={<Expand  />} className="rounded-full w-[35px] h-[35px]" variant="ghost" /> */}
            <div
              className="bg-image"
              style={{ backgroundImage: 'url("/assets/images/rest/Alistair.png")' }}
            ></div>
            <div className=" max-w-[500px] w-full ">
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
                <div className="font-bold">ID:</div>
                <div>#2432r32</div>
              </div>
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
                <div className="font-bold">Name:</div>
                <div>John Doe</div>
              </div>
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
                <div className="font-bold">Email:</div>
                <div>johndoe@gmail.com</div>
              </div>
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
                <div className="font-bold">Country:</div>
                <div>USA</div>
              </div>
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
                <div className="font-bold">Languages</div>
                <div>English, French</div>
              </div>
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
                <div className="font-bold">Faction:</div>
                <div>League of Order</div>
              </div>
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
                <div className="font-bold">Game Time (UTC):</div>
                <div>18:00 UTC – 20:30 UTC</div>
              </div>
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
                <div className="font-bold">Main Troop Type:</div>
                <div>Mage</div>
              </div>
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
                <div className="font-bold">Troop Level:</div>
                <div>T4</div>
              </div>
            </div>
          </div>

          <HeroesBlock />
          {/* <ArtifactsBlock /> */}
          {/* <CustomArsenalBlock /> */}
        </CardContent>
      </Card>
    </main>
  );
};

let index = 2;

const HeroesBlock = () => {
  const [expand, setExpand] = useState("150px");

  const heroes = [
    {
      image: MadelineImage,
      className: "hero-card-purple",
      title: "basic card",
      description: "5 5 3 1",
      glare: true,
      maxGlare: 0.8,
    },
    {
      image: SyndrionImage,
      className: "hero-card-golden",
      title: "glaring card",
      description: "5 5 3 1",
      glare: true,
      maxGlare: 0.8,
    },
    {
      image: SkogulImage,
      className: "hero-card-red",
      title: "reverse card",
      description: "5 5 3 1",

      glare: true,
      maxGlare: 0.8,
    },
    {
      image: SkogulImage,
      className: "hero-card-red",
      title: "reverse card",
      description: "5 5 3 1",

      glare: true,
      maxGlare: 0.8,
    },
    {
      image: SkogulImage,
      className: "hero-card-red",
      title: "reverse card",
      description: "5 5 3 1",

      glare: true,
      maxGlare: 0.8,
    },
    {
      image: SkogulImage,
      className: "hero-card-red",
      title: "reverse card",
      description: "5 5 3 1",

      glare: true,
      maxGlare: 0.8,
    },
    {
      image: SkogulImage,
      className: "hero-card-red",
      title: "reverse card",
      description: "5 5 3 1",

      glare: true,
      maxGlare: 0.8,
    },
    {
      image: SkogulImage,
      className: "hero-card-red",
      title: "reverse card",
      description: "5 5 3 1",

      glare: true,
      maxGlare: 0.8,
    },
    {
      image: SkogulImage,
      className: "hero-card-red",
      title: "reverse card",
      description: "5 5 3 1",

      glare: true,
      maxGlare: 0.8,
    },
  ];

  const handleResize = () => {
    index++;

    if (index > 3) index = 1;
    // if(index < 1) index = 3
    let preExpand = "";
    switch (index) {
      case 1:
        preExpand = "100px";
        break;
      case 2:
        preExpand = "150px";
        break;
      case 3:
        preExpand = "200px";
        break;
    }
    setExpand(preExpand);
  };
  return (
    <div className={`heroes-block `}>
      <div className="mb-0">
        <Separator title="Heroes" className="mb-3" titleClassName="bg-white" />
      </div>
      <div className="settings mb-[50px] ml-auto flex justify-end">
        <ButtonDemo
          startIcon={<Expand />}
          onClick={() => handleResize()}
          className="rounded-full w-[35px] h-[35px]"
          variant="ghost"
        />
        <ButtonDemo startIcon={<Pencil />} className="rounded-full w-[35px] h-[35px]" variant="ghost" />
      </div>
      <div
        className={`card-group hero-card-group mb-[200px] grid grid-cols-[repeat(auto-fill,_minmax(${expand},_1fr))]  justify-center md:justify-start  gap-[20px]`}
      >
        {heroes.map((item, index) => (
          <HeroCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

const ArtifactsBlock = () => {
  const artifacts = [
    {
      image: giantsBoneImage,
      className: "hero-card-purple",
      title: "basic card",
      description: "Skill lvl 3",
      glare: true,
      maxGlare: 0.8,
    },
    {
      image: arrowImage,
      className: "hero-card-golden",
      title: "glaring card",
      description: "Skill lvl 3",
      glare: true,
      maxGlare: 0.8,
    },
    {
      image: arrowImage,
      className: "hero-card-golden",
      title: "glaring card",
      description: "Skill lvl 3",
      glare: true,
      maxGlare: 0.8,
    },
    {
      image: arrowImage,
      className: "hero-card-golden",
      title: "glaring card",
      description: "Skill lvl 3",
      glare: true,
      maxGlare: 0.8,
    },
    {
      image: arrowImage,
      className: "hero-card-golden",
      title: "glaring card",
      description: "Skill lvl 3",
      glare: true,
      maxGlare: 0.8,
    },
    {
      image: artifact2Image,
      className: "hero-card-red",
      title: "reverse card",
      description: "Skill lvl 3",
      glare: true,
      maxGlare: 0.8,
    },
  ];
  return (
    <div className="artifacts-block">
      <div className="mb-0">
        <Separator title="Artifacts" className="mb-3" titleClassName="bg-white" />
      </div>
      <div className="settings mb-[50px] ml-auto flex justify-end">
        <ButtonDemo startIcon={<Expand />} className="rounded-full w-[35px] h-[35px]" variant="ghost" />
        <ButtonDemo startIcon={<Pencil />} className="rounded-full w-[35px] h-[35px]" variant="ghost" />
      </div>
      <div
        className={`card-group hero-card-group mb-[200px] grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] justify-center gap-[50px]`}
      >
        {artifacts.map((item, index) => (
          <HeroCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

const CustomArsenalBlock = () => {
  const customArsenal = [
    {
      image: customArsenalScreenshot6Image,
      title: "Archer build",
      description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
    },
    {
      image: customArsenalScreenshot6Image,
      title: "Archer build",
      description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
    },
    {
      image: customArsenalScreenshot6Image,
      title: "Archer build",
      description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
    },
    {
      image: customArsenalScreenshot6Image,
      title: "Archer build",
      description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
    },
  ];
  return (
    <div className="custom-arsenal-block">
      <div className="mb-0">
        <Separator title="Custom Arsenal" className="mb-3" titleClassName="bg-white" />
      </div>
      <div className="settings mb-[50px] ml-auto flex justify-end">
        <ButtonDemo startIcon={<Expand />} className="rounded-full w-[35px] h-[35px]" variant="ghost" />
        <ButtonDemo startIcon={<Pencil />} className="rounded-full w-[35px] h-[35px]" variant="ghost" />
      </div>

      <div
        className={`card-group custom-parallax-card-group grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] justify-center gap-[50px]`}
      >
        {customArsenal.map((item, index) => (
          <CustomParallaxCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Pages;
