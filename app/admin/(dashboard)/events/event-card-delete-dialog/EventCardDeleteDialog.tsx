"use client";

import React, { useState } from "react";
import { useApiContext } from "@/contexts/ApiContext";
import { ButtonDemo, DialogDemo } from "@/components/index";
import localData from "@/localData";

const { redDragonImage } = localData.images;

const EventCardDeleteDialog = ({ item = {}, state = {} }: { [key: string]: any }) => {
  return (
    <DialogDemo
      color="destructive"
      iconImage={redDragonImage}
      title={"Delete Event"}
      description={"This will permanently remove the event"}
      trigger={
        <ButtonDemo
          // size="sm"
          variant="destructive"
          text="Delete"
          className={`ml-auto flex cursor-pointer w-full`}
        />
      }
    >
      {(closeDialog) => <Content closeDialog={closeDialog} {...{ ...item, ...state }} />}
    </DialogDemo>
  );
};

const Content = ({ id = "", closeDialog = () => {} }) => {
  const { deleteEvent } = useApiContext();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    deleteEvent({
      id,
      setIsLoading,
      callback: () => {
        closeDialog();
      },
    });
  };

  return (
    <div className="wrapper">
      <form className="card-footer" onSubmit={onSubmit}>
        <br />
        <br />
        <ButtonDemo
          variant="destructive"
          color="danger"
          className="w-full"
          text={`${isLoading ? "Deleting..." : "Delete Event"}`}
        />
      </form>
    </div>
  );
};

export default EventCardDeleteDialog;
