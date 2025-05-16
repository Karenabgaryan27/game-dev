"use client";
import React, { useState } from "react";
import { ButtonDemo, DialogDemo } from "@/components/index";
import { useApiContext } from "@/contexts/ApiContext";

export const DeleteEventsHistoryDialog = ({ trigger = null }) => {
  return (
    <DialogDemo
      contentClassName=""
      trigger={
        trigger || <ButtonDemo className="mb-5 " text={`${"Delete All Data"}`} variant="ghost" color='danger' />
      }
    >
      {(closeDialog) => <DeleteEventsHistoryDialogContent closeDialog={closeDialog} />}
    </DialogDemo>
  );
};

const DeleteEventsHistoryDialogContent = ({ closeDialog = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getEventsHistoryRecords, deleteEventsHistoryRecords } = useApiContext();

  const handleDeleteTableData = () => {
    deleteEventsHistoryRecords({
      setIsLoading,
      successCallback: () => {
        getEventsHistoryRecords({});
        closeDialog()
      },
    });
  };

  return (
    <div className="crop-avatar-dialog">
      <h2 className="text-2xl text-center mb-5 max-w-[300px] mx-auto">
        Are you sure you want to delete all history data?
      </h2>
      <br />
      <br />

      <div className="button-group flex gap-2 justify-end">
        <ButtonDemo
          className=""
          text="Cancel"
          variant="outline"
          type="button"
          onClick={() => {
            closeDialog();
          }}
          disabled={isLoading}
        />
        <ButtonDemo
          className=""
          text={`${isLoading ? "Loading..." : "Submit"}`}
          variant="destructive"
          disabled={isLoading}
          onClick={() => {
            handleDeleteTableData();
          }}
        />
      </div>
    </div>
  );
};
