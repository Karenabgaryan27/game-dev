"use client";

import React, { useState, useEffect } from "react";
import { useApiContext } from "@/contexts/ApiContext";
import {
  BreadcrumbDemo,
  Separator,
  HeroCard,
  ArtifactCard,
  UnitCard,
  CustomParallaxCard,
  ButtonDemo,
  DialogDemo,
  CropDemo
} from "@/components/index";
import localData from "@/localData";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Settings, Pencil, Expand } from "lucide-react";

import UserInfoDialog from "./user-info-dialog/UserInfoDialog";
import HeroCardsDialog from "./hero-cards-dialog/HeroCardsDialog";
import ArtifactCardsDialog from "./artifact-cards-dialog/ArtifactCardsDialog";
import UnitCardsDialog from "./unit-cards-dialog/UnitCardsDialog";
import ProfileHeader from "./profile-header/ProfileHeader";
import { useGlobalContext } from "@/contexts/context";

const { avatarPlaceholderImage,heroPlaceholderImage } = localData.images;

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

const Page = () => {
  return (
    <main className="pages-page p-5">
      <h2 className="text-2xl mb-3">My Profile</h2>
      <BreadcrumbDemo items={breadcrumbItems} />
      <br />
      <br />
      <Card className="mb-[300px] min-h-[500px] relative pb-[100px]">
        <CardContent>
          <ProfileHeader/>
          <UserInfoBlock />
          <HeroesBlock />
          <ArtifactsBlock />
          <UnitsBlock/>
          {/* <CustomArsenalBlock /> */}
        </CardContent>
      </Card>
    </main>
  );
};

// USER INFO BLOCK
const UserInfoBlock = () => {
  const { fetchedCurrentUser } = useApiContext();
  const { details } = fetchedCurrentUser;

  return (
    <div className="mb-[150px] relative  py-5">
      <div>
        <Separator title="Main Information" className="mb-3" titleClassName="bg-white" />
      </div>
      <div className="settings mb-[30px] ml-auto flex justify-end">
        <UserInfoDialog />
      </div>
      <div className="relative">
        <div
          className="bg-image"
          style={{ backgroundImage: 'url("/assets/images/rest/Alistair.png")' }}
        ></div>
        <div className=" max-w-[500px] w-full ">
          <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
            <div className="font-bold">In-Game ID:</div>
            <div>{details.inGameID || "-"}</div>
          </div>
          <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
            <div className="font-bold">In-Game Name (IGN):</div>
            <div>{details.displayName || "-"}</div>
          </div>
          <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
            <div className="font-bold">Email:</div>
            <div>{details.email || "-"}</div>
          </div>
          <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
            <div className="font-bold">Country:</div>
            <div>{details.country || "-"}</div>
          </div>
          <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
            <div className="font-bold">Language(s)</div>
            <div>{details.languages || "-"}</div>
          </div>

          <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
            <div className="font-bold">Rank:</div>
            <div>{details.rank || "-"}</div>
          </div>
          <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
            <div className="font-bold">Faction:</div>
            <div>{details.faction || "-"}</div>
          </div>
          <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
            <div className="font-bold">Game Time (UTC):</div>
            <div>{details.gameTime || "-"}</div>
          </div>
          <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
            <div className="font-bold">Main Unit Type:</div>
            <div>{details.mainUnitType || "-"}</div>
          </div>
          <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
            <div className="font-bold">Unit Level:</div>
            <div>{details.unitLevel || "-"}</div>
          </div>
          <div className="flex items-center justify-between text-sm gap-5 py-1 px-3 border-b-1 border-dashed border-gray-300  mb-3">
            <div className="font-bold">Power:</div>
            <div>{details.power || "-"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// HEROES BLOCK
let heroCardIndex = 2;

const HeroesBlock = () => {
  const [expand, setExpand] = useState("md");
  const { fetchedCurrentUser } = useApiContext();
  const { details } = fetchedCurrentUser;
  const [featuredHeroes, setFeaturedHeroes] = useState([]);


  useEffect(() => {
    if (!details.heroes) return;

    const preFeaturedHeroes = details.heroes
      .filter((item: any) => item.isFeatured)
      .map((item: any) => ({ ...item, glare: true, maxGlare: 0.8 }));
    setFeaturedHeroes(preFeaturedHeroes);
  }, [details.heroes]);

  const handleResize = () => {
    heroCardIndex++;

    if (heroCardIndex > 3) heroCardIndex = 1;
    // if(heroCardIndex < 1) heroCardIndex = 3
    let preExpand = "";
    switch (heroCardIndex) {
      case 1:
        preExpand = "sm";
        break;
      case 2:
        preExpand = "md";
        break;
      case 3:
        preExpand = "lg";
        break;
    }
    setExpand(preExpand);
  };

  return (
    <div className={`heroes-block `}>
      <div className="mb-0">
        <Separator title="Featured Heroes" className="mb-3" titleClassName="bg-white" />
      </div>
      <div className="settings mb-[30px] ml-auto flex justify-end gap-2">
        <ButtonDemo
          startIcon={<Expand />}
          onClick={() => handleResize()}
          className="rounded-full w-[35px] h-[35px]"
          variant="ghost"
        />
        <HeroCardsDialog />
      </div>
      <div className={`card-group ${expand} hero-card-group mb-[77px]  `}>
        {featuredHeroes.length ? (
          featuredHeroes.map((item: any, index) => (
            <HeroCard key={index} {...item} />
          ))
        ) : (
          <HeroCard placeholderImage={heroPlaceholderImage} />
        )}
      </div>
    </div>
  );
};

// ARTIFACTS BLOCK
let artifactCardIndex = 2;

const ArtifactsBlock = () => {
  const [expand, setExpand] = useState("md");
  const { fetchedCurrentUser } = useApiContext();
  const { details } = fetchedCurrentUser;
  const [featuredArtifacts, setFeaturedArtifacts] = useState([]);

  useEffect(() => {
    if (!details.artifacts) return;

    const preFeaturedArtifacts = details.artifacts
      .filter((item: any) => item.isFeatured)
      .map((item: any) => ({ ...item, glare: true, maxGlare: 0.8 }));
    setFeaturedArtifacts(preFeaturedArtifacts);
  }, [details.artifacts]);

  const handleResize = () => {
    artifactCardIndex++;

    if (artifactCardIndex > 3) artifactCardIndex = 1;
    // if(artifactCardIndex < 1) artifactCardIndex = 3
    let preExpand = "";
    switch (artifactCardIndex) {
      case 1:
        preExpand = "sm";
        break;
      case 2:
        preExpand = "md";
        break;
      case 3:
        preExpand = "lg";
        break;
    }
    setExpand(preExpand);
  };

  return (
    <div className={`artifacts-block `}>
      <div className="mb-0">
        <Separator title="Featured Artifacts" className="mb-3" titleClassName="bg-white" />
      </div>
      <div className="settings mb-[30px] ml-auto flex justify-end gap-2 ">
        <ButtonDemo
          startIcon={<Expand />}
          onClick={() => handleResize()}
          className="rounded-full w-[35px] h-[35px]"
          variant="ghost"
        />
        <ArtifactCardsDialog />
      </div>
      <div className={`card-group ${expand} hero-card-group mb-[77px] `}>
        {featuredArtifacts.length ? (
          featuredArtifacts.map((item: any, index) => (
            <ArtifactCard key={index} {...item} />
          ))
        ) : (
          <ArtifactCard placeholderImage={heroPlaceholderImage} />
        )}
      </div>
    </div>
  );
};

// ARTIFACTS BLOCK
let unitCardIndex = 2;

const UnitsBlock = () => {
  const [expand, setExpand] = useState("md");
  const { fetchedCurrentUser } = useApiContext();
  const { details } = fetchedCurrentUser;
  const [featuredUnits, setFeaturedUnits] = useState([]);

  useEffect(() => {
    if (!details.units) return;

    const preFeaturedUnits = details.units
      .filter((item: any) => item.isFeatured)
      .map((item: any) => ({ ...item, glare: true, maxGlare: 0.8 }));
    setFeaturedUnits(preFeaturedUnits);
  }, [details.units]);

  const handleResize = () => {
    unitCardIndex++;

    if (unitCardIndex > 3) unitCardIndex = 1;
    // if(unitCardIndex < 1) unitCardIndex = 3
    let preExpand = "";
    switch (unitCardIndex) {
      case 1:
        preExpand = "sm";
        break;
      case 2:
        preExpand = "md";
        break;
      case 3:
        preExpand = "lg";
        break;
    }
    setExpand(preExpand);
  };

  return (
    <div className={`units-block `}>
      <div className="mb-0">
        <Separator title="Featured Units" className="mb-3" titleClassName="bg-white" />
      </div>
      <div className="settings mb-[30px] ml-auto flex justify-end gap-2 ">
        <ButtonDemo
          startIcon={<Expand />}
          onClick={() => handleResize()}
          className="rounded-full w-[35px] h-[35px]"
          variant="ghost"
        />
        <UnitCardsDialog />
      </div>
      <div className={`card-group ${expand} hero-card-group `}>
        {featuredUnits.length ? (
          featuredUnits.map((item: any, index) => (
            <UnitCard key={index} {...item} />
          ))
        ) : (
          <UnitCard placeholderImage={heroPlaceholderImage} />
        )}
      </div>
    </div>
  );
};

// CUSTOM ARSENAL BLOCK
// const CustomArsenalBlock = () => {
//   const customArsenal = [
//     {
//       image: customArsenalScreenshot6Image,
//       title: "Archer build",
//       description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//     },
//     {
//       image: customArsenalScreenshot6Image,
//       title: "Archer build",
//       description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//     },
//     {
//       image: customArsenalScreenshot6Image,
//       title: "Archer build",
//       description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//     },
//     {
//       image: customArsenalScreenshot6Image,
//       title: "Archer build",
//       description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//     },
//   ];
//   return (
//     <div className="custom-arsenal-block">
//       <div className="mb-0">
//         <Separator title="Custom Arsenal" className="mb-3" titleClassName="bg-white" />
//       </div>
//       <div className="settings mb-[30px] ml-auto flex justify-end gap-2">
//         <ButtonDemo startIcon={<Expand />} className="rounded-full w-[35px] h-[35px]" variant="ghost" />
//         <ButtonDemo startIcon={<Pencil />} className="rounded-full w-[35px] h-[35px]" variant="ghost" />
//       </div>

//       <div
//         className={`card-group custom-parallax-card-group grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] justify-center gap-[50px]`}
//       >
//         {customArsenal.map((item, index) => (
//           <CustomParallaxCard key={index} {...item} />
//         ))}
//       </div>
//     </div>
//   );
// };

export default Page;
