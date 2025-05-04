"use client";

import React, { useState, ReactNode, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type ItemsProps = {
  label: string;
  value: string;
  content?: ReactNode;
};

type TabsDemoProps = {
  className?: string;
  defaultValue?: string;
  items?: ItemsProps[];
};

export function TabsDemo({ className = "", items = [], defaultValue = "" }: TabsDemoProps) {
  const [activeValue, setActiveValue] = useState(items[0]?.value || "");

  useEffect(() => {
    if (!defaultValue) return;
    setActiveValue(defaultValue);
  }, [defaultValue]);

  return (
    <Tabs value={activeValue} onValueChange={setActiveValue} className={`${className} `}>
      <ScrollArea>
        <TabsList className=" flex  gap-y-1 p-0 mb-3 justify-start bg-transparent w-full ">
          <div className="border-b !border-b-gray-200 w-full">
            {items.map((item, index) => {
              return (
                <TabsTrigger
                  key={index}
                  value={item.value}
                  className={`!rounded-none dark:!border-none !shadow-none  !bg-transparent   uppercase text-xs font-medium text-gray-500 ${
                    index !== 0 ? "translate-x-[-2px]" : ""
                  }  cursor-pointer  ${
                    activeValue === item.value ? " !border-b-green-700 !text-success" : ""
                  } leading-none px-4 py-2`}
                >
                  {item.label}
                </TabsTrigger>
              );
            })}
          </div>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {items.map((item, index) => {
        return (
          <TabsContent key={index} value={item.value}>
            {item.content}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
