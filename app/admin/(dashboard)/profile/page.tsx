"use client";

import React, { useState, useEffect } from "react";
import { useApiContext } from "@/contexts/ApiContext";
import { BreadcrumbDemo, Separator, HeroCard, CustomParallaxCard,  } from "@/components/index";
import localData from "@/localData";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

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
  customArsenalScreenshot3Image
} = localData.images;

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
  ];
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
 

  const customArsenal = [
    {
        image: customArsenalScreenshot3Image,
        title: "Archer build",
        description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
        
    },
    {
        image: customArsenalScreenshot3Image,
        title: "Archer build",
        description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
        
    },
    {
        image: customArsenalScreenshot3Image,
        title: "Archer build",
        description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
        
    },
];

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
            <div
              className="bg-image"
              style={{ backgroundImage: 'url("/assets/images/rest/Alistair.png")' }}
            ></div>
            <div className=" max-w-[500px] w-full ">
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1  mb-3">
                <div className="font-bold">ID:</div>
                <div>#2432r32</div>
              </div>
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1  mb-3">
                <div className="font-bold">Name:</div>
                <div>John Doe</div>
              </div>
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1  mb-3">
                <div className="font-bold">Email:</div>
                <div>johndoe@gmail.com</div>
              </div>
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1  mb-3">
                <div className="font-bold">Country:</div>
                <div>USA</div>
              </div>
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1  mb-3">
                <div className="font-bold">Languages</div>
                <div>English, French</div>
              </div>
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1  mb-3">
                <div className="font-bold">Faction:</div>
                <div>League of Order</div>
              </div>
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1  mb-3">
                <div className="font-bold">Game Time (UTC):</div>
                <div>18:00 UTC – 20:30 UTC</div>
              </div>
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1  mb-3">
                <div className="font-bold">Main Troop Type:</div>
                <div>Mage</div>
              </div>
              <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1  mb-3">
                <div className="font-bold">Troop Level:</div>
                <div>T4</div>
              </div>
            </div>
          </div>

          <div className="mb-[100px]">
            <Separator title="Heroes" titleClassName="bg-white" />
          </div>
          <div className="card-group hero-card-group mb-[200px]">
            {heroes.map((item, index) => (
              <HeroCard key={index} {...item} />
            ))}
          </div>

          <div className="mb-[100px]">
            <Separator title="Artifacts" titleClassName="bg-white" />
          </div>
          <div className="card-group hero-card-group mb-[200px]">
            {artifacts.map((item, index) => (
              <HeroCard key={index} {...item} />
            ))}
          </div>

          <div className="mb-[100px]">
            <Separator title="Custom Arsenal" titleClassName="bg-white" />
          </div>
          <div className="card-group custom-parallax-card-group">
            {customArsenal.map((item, index) => (
              <CustomParallaxCard key={index} {...item} />
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Pages;
