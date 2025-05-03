import React from "react";
import { ButtonDemo, BreadcrumbDemo, Separator, CarouselDemo, HeroCard } from "@/components/index";
import { DataTableDemo } from "./data-table/DataTableDemo";
import { Payment, columns } from "./data-table/columns";
import localData from "@/localData";
import { Card, CardContent } from "@/components/ui/card";

const { heroesLookingDownImage, SkogulImage, arrowImage, customArsenalScreenshot3Image } = localData.images;

const breadcrumbItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    label: "Dashboard",
  },
];

const getData = async (): Promise<Payment[]> => {
  return [...Array(53)].map((item, index) => {
    return {
      //   id: uuidv4(),
      id: (index + 1).toString(),
      amount: Math.random() * 1000,
      status: "pending",
      email: `ken${(Math.random() * 1000).toFixed(0)}@yahoo.com`,
      details: {
        name: "John Doe",
        heroes: [
          {
            image: SkogulImage,
            className: "hero-card-purple",
            title: "basic card",
            description: "5 5 3 1",
            glare: true,
            maxGlare: 0.8,
          },
          {
            image: SkogulImage,
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
       
       
       
     
        ],
        artifacts: [
          {
            image: arrowImage,
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
            className: "hero-card-red",
            title: "reverse card",
            description: "Skill lvl 3",
            
              glare: true,
            maxGlare: 0.8,
          },
          {
            image: arrowImage,
            className: "hero-card-red",
            title: "reverse card",
            description: "Skill lvl 3",
            
              glare: true,
            maxGlare: 0.8,
          },
          {
            image: arrowImage,
            className: "hero-card-red",
            title: "reverse card",
            description: "Skill lvl 3",
            
              glare: true,
            maxGlare: 0.8,
          },
          {
            image: arrowImage,
            className: "hero-card-red",
            title: "reverse card",
            description: "Skill lvl 3",
            
              glare: true,
            maxGlare: 0.8,
          },
          {
            image: arrowImage,
            className: "hero-card-red",
            title: "reverse card",
            description: "Skill lvl 3",
            
              glare: true,
            maxGlare: 0.8,
          },
          {
            image: arrowImage,
            className: "hero-card-red",
            title: "reverse card",
            description: "Skill lvl 3",
            
              glare: true,
            maxGlare: 0.8,
          },
          {
            image: arrowImage,
            className: "hero-card-red",
            title: "reverse card",
            description: "Skill lvl 3",
            
              glare: true,
            maxGlare: 0.8,
          },
          {
            image: arrowImage,
            className: "hero-card-red",
            title: "reverse card",
            description: "Skill lvl 3",
            
              glare: true,
            maxGlare: 0.8,
          },
          {
            image: arrowImage,
            className: "hero-card-red",
            title: "reverse card",
            description: "Skill lvl 3",
            
              glare: true,
            maxGlare: 0.8,
          },
          {
            image: arrowImage,
            className: "hero-card-red",
            title: "reverse card",
            description: "Skill lvl 3",
            
              glare: true,
            maxGlare: 0.8,
          },
       
       
       
     
        ],
        customArsenal: [
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
        ]
      },
    };
  });
};

const page = async () => {
  const data = await getData();

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
          <DataTableDemo data={data} columns={columns} />
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

export default page;
