"use client";

import React, { useState, useEffect } from "react";
import { useApiContext } from "@/contexts/ApiContext";
import { BreadcrumbDemo } from "@/components/index";
import EventCard from "./event-card/EventCard";
import EventCardCreateDialog from "./event-card-create-dialog/EventCardCreateDialog";
import localData from "@/localData";

const { chakchaImage } = localData.images;

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
    </main>
  );
};

const Events = () => {
  const { fetchedData, getEvents ,fetchedUser} = useApiContext();
  const [filteredData, setFilteredData] = useState<{[key:string]: any}[]>([]);

  useEffect(() => {
    getEvents({});
  }, []);

  useEffect(() => {
    const tempData = [...fetchedData.events.list];
    // tempData = tempData.filter((item) => {
    //   if (item.ttl && item.ttl.toDate() / 1000 > Date.now() / 1000) {
    //     return { ...item };
    //   }
    //   if (!item.ttl) return { ...item };
    // });
    setFilteredData(tempData);
  }, [fetchedData]);

  return (
    <div
      className={`mb-[200px] grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-7  ${
        fetchedData.events.isLoading ? "opacity-50 pointer-events-none" : ""
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
      {fetchedUser?.role == "admin" && (
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
