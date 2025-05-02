import React from "react";
import { ButtonDemo, BreadcrumbDemo, DataTableDemo, Separator } from "@/components/index";
import { Payment , columns} from "@/components/data-table/columns";
import localData from "@/localData";
import { Card, CardHeader } from "@/components/ui/card";


const { heroesLookingDownImage, knightsImage } = localData.images;

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
        <CardHeader>
          <DataTableDemo data={data} columns={columns} />
        </CardHeader>
      </Card>

      <Separator title="Enter Arena" />

      <img
        className="w-full h-auto max-w-[500px] mx-auto my-10  object-contain opacity-10 grayscale"
        src={knightsImage}
        alt=""
      />
    </main>
  );
};

export default page;
