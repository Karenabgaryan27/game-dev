"use client";

import React, { useState, useEffect } from "react";
import { useApiContext } from "@/contexts/ApiContext";
import { BreadcrumbDemo, Separator, CustomParallaxCard } from "@/components/index";
import EventCard from "./event-card/EventCard";
import EventCardCreateDialog from "./event-card-create-dialog/EventCardCreateDialog";
import localData from "@/localData";

const { chakchaImage, elkridersImage, mapImage } = localData.images;

const breadcrumbItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    label: "Events",
  },
];

const Pages = () => {
  return (
    <main className="pages-page p-5">
      <h2 className="text-2xl mb-3">Events</h2>
      <BreadcrumbDemo items={breadcrumbItems} />
      <br />
      <br />

      <Events />

      <div className="bg-blue-100 py-10 px-3 rounded-lg  mb-[200px]">
        <div className="max-w-[500px] mx-auto">
          <CustomParallaxCard axisDepth={45} image={mapImage} />
        </div>
      </div>

      <Separator title="Legend Begins Here" />

      <img
        className="w-full h-auto max-w-[500px] mx-auto my-10  object-contain opacity-10 grayscale"
        src={elkridersImage}
        alt=""
      />
    </main>
  );
};

const Events = () => {
  const { fetchedCurrentUser, getEvents, fetchedEvents } = useApiContext();
  const [filteredData, setFilteredData] = useState<{ [key: string]: any }[]>([]);
  const { details } = fetchedCurrentUser;


  useEffect(() => {
    getEvents({});
      
  }, []);

  useEffect(() => {
    const tempData = [...fetchedEvents.list];
    // tempData = tempData.filter((item) => {
    //   if (item.ttl && item.ttl.toDate() / 1000 > Date.now() / 1000) {
    //     return { ...item };
    //   }
    //   if (!item.ttl) return { ...item };
    // });
    setFilteredData(tempData);
  }, [fetchedEvents]);

  return (
    <div
      className={`mb-[200px] grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-7 gap-y-10  ${
        fetchedEvents.isLoading ? "opacity-50 pointer-events-none" : ""
      } duration-300`}
    >
      {!filteredData.length ? (
        <div className="">
          <div className="text-sm font-medium mb-1 opacity-0">Created by</div>
          <div className="wrapper  rounded-lg p-3 relative h-0 pt-[56.25%] opacity-80">
            <img
              src={chakchaImage}
              className="block w-[180px] absolute top-[50%] left-[50%] transform-[translate(-50%,-50%)]"
            />
          </div>
        </div>
      ) : (
        filteredData.map((item, index) => {
          return <EventCard key={index} {...{ item, ...item }} />;
        })
      )}
      {(details?.role === "admin" || details?.role === "superAdmin") && (
        <div className="">
          <div className="text-sm font-medium mb-1 opacity-0">Created by</div>
          <div className="wrapper shadow border rounded-lg p-3 relative h-0 pt-[56.25%]">
            <EventCardCreateDialog />
          </div>
        </div>
      )}
    </div>
  );
};

export default Pages;
