"use client";

import React, { useEffect, useState } from "react";
import { ButtonDemo, BreadcrumbDemo, Separator, CustomParallaxCard } from "@/components/index";
import { DataTableDemo } from "./data-table/DataTableDemo";
import { Payment, columns } from "./data-table/columns";
import localData from "@/localData";
import { Card, CardContent } from "@/components/ui/card";
import { useApiContext } from "@/contexts/ApiContext";

const { heroesLookingDownImage, SkogulImage, customArsenalScreenshot6Image, mapImage } = localData.images;
const { avatarImage } = localData.svgs;

const breadcrumbItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    label: "Dashboard",
  },
];

// const getData = (): Payment[] => {
//   return [...Array(10)].map((item, index) => {
//     return {
//       // id: uuidv4(),
//       id: (index + 1).toString(),
//       // name: `user-${(Math.random() * 1000).toFixed(0)}`,
//       status: "active",
//       // email: `ken${(Math.random() * 1000).toFixed(0)}@yahoo.com`,
//       // mainTroop: 'Mage',
//       // troopLvl: 'T4',
//       // avatar: SkogulImage,
//       details: {
//         name: "John Doe",
//         heroes: [
//           {
//             image: SkogulImage,
//             className: "hero-card-purple",
//             title: "basic card",
//             description: "5 5 3 1",
//             glare: true,
//             maxGlare: 0.8,
//           },
//           {
//             image: SkogulImage,
//             className: "hero-card-golden",
//             title: "glaring card",
//             description: "5 5 3 1",
//             glare: true,
//             maxGlare: 0.8,
//           },
//           {
//             image: SkogulImage,
//             className: "hero-card-red",
//             title: "reverse card",
//             description: "5 5 3 1",

//             glare: true,
//             maxGlare: 0.8,
//           },
//           {
//             image: SkogulImage,
//             className: "hero-card-red",
//             title: "reverse card",
//             description: "5 5 3 1",

//             glare: true,
//             maxGlare: 0.8,
//           },
//           {
//             image: SkogulImage,
//             className: "hero-card-red",
//             title: "reverse card",
//             description: "5 5 3 1",

//             glare: true,
//             maxGlare: 0.8,
//           },
//           {
//             image: SkogulImage,
//             className: "hero-card-red",
//             title: "reverse card",
//             description: "5 5 3 1",

//             glare: true,
//             maxGlare: 0.8,
//           },
//           {
//             image: SkogulImage,
//             className: "hero-card-red",
//             title: "reverse card",
//             description: "5 5 3 1",

//             glare: true,
//             maxGlare: 0.8,
//           },
//           {
//             image: SkogulImage,
//             className: "hero-card-red",
//             title: "reverse card",
//             description: "5 5 3 1",

//             glare: true,
//             maxGlare: 0.8,
//           },
//           {
//             image: SkogulImage,
//             className: "hero-card-red",
//             title: "reverse card",
//             description: "5 5 3 1",

//             glare: true,
//             maxGlare: 0.8,
//           },
//           {
//             image: SkogulImage,
//             className: "hero-card-red",
//             title: "reverse card",
//             description: "5 5 3 1",

//             glare: true,
//             maxGlare: 0.8,
//           },
//           {
//             image: SkogulImage,
//             className: "hero-card-red",
//             title: "reverse card",
//             description: "5 5 3 1",

//             glare: true,
//             maxGlare: 0.8,
//           },
//           {
//             image: SkogulImage,
//             className: "hero-card-red",
//             title: "reverse card",
//             description: "5 5 3 1",

//             glare: true,
//             maxGlare: 0.8,
//           },
//         ],
//         // artifacts: [
//         //   {
//         //     image: arrowImage,
//         //     className: "hero-card-purple",
//         //     title: "basic card",
//         //     description: "Skill lvl 3",
//         //     glare: true,
//         //     maxGlare: 0.8,
//         //   },
//         //   {
//         //     image: arrowImage,
//         //     className: "hero-card-golden",
//         //     title: "glaring card",
//         //     description: "Skill lvl 3",
//         //     glare: true,
//         //     maxGlare: 0.8,
//         //   },
//         //   {
//         //     image: arrowImage,
//         //     className: "hero-card-red",
//         //     title: "reverse card",
//         //     description: "Skill lvl 3",

//         //       glare: true,
//         //     maxGlare: 0.8,
//         //   },
//         //   {
//         //     image: arrowImage,
//         //     className: "hero-card-red",
//         //     title: "reverse card",
//         //     description: "Skill lvl 3",

//         //       glare: true,
//         //     maxGlare: 0.8,
//         //   },
//         //   {
//         //     image: arrowImage,
//         //     className: "hero-card-red",
//         //     title: "reverse card",
//         //     description: "Skill lvl 3",

//         //       glare: true,
//         //     maxGlare: 0.8,
//         //   },
//         //   {
//         //     image: arrowImage,
//         //     className: "hero-card-red",
//         //     title: "reverse card",
//         //     description: "Skill lvl 3",

//         //       glare: true,
//         //     maxGlare: 0.8,
//         //   },
//         //   {
//         //     image: arrowImage,
//         //     className: "hero-card-red",
//         //     title: "reverse card",
//         //     description: "Skill lvl 3",

//         //       glare: true,
//         //     maxGlare: 0.8,
//         //   },
//         //   {
//         //     image: arrowImage,
//         //     className: "hero-card-red",
//         //     title: "reverse card",
//         //     description: "Skill lvl 3",

//         //       glare: true,
//         //     maxGlare: 0.8,
//         //   },
//         //   {
//         //     image: arrowImage,
//         //     className: "hero-card-red",
//         //     title: "reverse card",
//         //     description: "Skill lvl 3",

//         //       glare: true,
//         //     maxGlare: 0.8,
//         //   },
//         //   {
//         //     image: arrowImage,
//         //     className: "hero-card-red",
//         //     title: "reverse card",
//         //     description: "Skill lvl 3",

//         //       glare: true,
//         //     maxGlare: 0.8,
//         //   },
//         //   {
//         //     image: arrowImage,
//         //     className: "hero-card-red",
//         //     title: "reverse card",
//         //     description: "Skill lvl 3",

//         //       glare: true,
//         //     maxGlare: 0.8,
//         //   },
//         //   {
//         //     image: arrowImage,
//         //     className: "hero-card-red",
//         //     title: "reverse card",
//         //     description: "Skill lvl 3",

//         //       glare: true,
//         //     maxGlare: 0.8,
//         //   },

//         // ],
//         // customArsenal: [
//         //   {
//         //     image: customArsenalScreenshot6Image,
//         //     title: "Archer build",
//         //     description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//         // },
//         //   {
//         //     image: customArsenalScreenshot6Image,
//         //     title: "Archer build",
//         //     description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//         // },
//         //   {
//         //     image: customArsenalScreenshot6Image,
//         //     title: "Archer build",
//         //     description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//         // },
//         //   {
//         //     image: customArsenalScreenshot6Image,
//         //     title: "Archer build",
//         //     description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//         // },
//         //   {
//         //     image: customArsenalScreenshot6Image,
//         //     title: "Archer build",
//         //     description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//         // },
//         //   {
//         //     image: customArsenalScreenshot6Image,
//         //     title: "Archer build",
//         //     description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//         // },
//         //   {
//         //     image: customArsenalScreenshot6Image,
//         //     title: "Archer build",
//         //     description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//         // },
//         //   {
//         //     image: customArsenalScreenshot6Image,
//         //     title: "Archer build",
//         //     description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//         // },
//         //   {
//         //     image: customArsenalScreenshot6Image,
//         //     title: "Archer build",
//         //     description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//         // },
//         //   {
//         //     image: customArsenalScreenshot6Image,
//         //     title: "Archer build",
//         //     description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//         // },
//         //   {
//         //     image: customArsenalScreenshot6Image,
//         //     title: "Archer build",
//         //     description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//         // },
//         //   {
//         //     image: customArsenalScreenshot6Image,
//         //     title: "Archer build",
//         //     description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//         // },
//         //   {
//         //     image: customArsenalScreenshot6Image,
//         //     title: "Archer build",
//         //     description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//         // },
//         //   {
//         //     image: customArsenalScreenshot6Image,
//         //     title: "Archer build",
//         //     description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//         // },
//         //   {
//         //     image: customArsenalScreenshot6Image,
//         //     title: "Archer build",
//         //     description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//         // },
//         //   {
//         //     image: customArsenalScreenshot6Image,
//         //     title: "Archer build",
//         //     description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//         // },
//         //   {
//         //     image: customArsenalScreenshot6Image,
//         //     title: "Archer build",
//         //     description: "Ffraegar and Theia, with Night Roc and Iron Tusk",
//         // },
//         // ]
//       },
//     };
//   });
// };

const Page = () => {
  const [filteredData, setFilteredData] = useState<Payment[]>([]);
  // const data = getData();

  const { getUsers, fetchedUsers } = useApiContext();

  useEffect(() => {
    getUsers({});
  }, []);

  useEffect(() => {
    if (!fetchedUsers.list.length) return;

    const getData = (): Payment[] => {
      return fetchedUsers.list
        .filter((item) => item.isDeleted !== true)
        .map((item) => {
          return {
            status: "active",
            ...item,
            name: item.name || "",
            inGameID: item.inGameID || "",
            power: item.power || "",
            mainUnitType: item.mainUnitType || "",
            unitLevel: item.unitLevel || "",
            rank: item.rank || "",
          };
        });
    };

    const data = getData();

    setFilteredData(data);
  }, [fetchedUsers]);

  return (
    <main className="dashboard-page p-5">
      <h2 className="text-2xl mb-3">Dashboard</h2>
      <BreadcrumbDemo items={breadcrumbItems} />

      <div className="max-w-[500px] mx-auto mt-10 mb-10">
        <div className=" h-0 pt-[56.25%] w-full relative rounded-lg overflow-hidden">
          <img
            className="w-full h-full  absolute top-0 left-0 object-cover"
            src={heroesLookingDownImage}
            alt=""
          />
        </div>
      </div>

      <Card className="mb-[200px]">
        <CardContent>
          <DataTableDemo data={filteredData} columns={columns} />
        </CardContent>
      </Card>

      <Separator title="Enter Arena" />

      <img
        className="w-full h-auto max-w-[500px] mx-auto my-10  object-contain opacity-10 grayscale"
        src={SkogulImage}
        alt=""
      />
    </main>
  );
};

export default Page;
