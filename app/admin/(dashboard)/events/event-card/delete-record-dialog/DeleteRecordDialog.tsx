"use client";
import React, { useState } from "react";
import { ButtonDemo, DialogDemo } from "@/components/index";
import { useApiContext } from "@/contexts/ApiContext";


export const DeleteRecordDialog = ({
  eventId = "",
  recordId = "",
  parentSetState = () => {},
}: {
  [key: string]: any;
}) => {
  return (
    <DialogDemo
      contentClassName=""
      trigger={
        <ButtonDemo
          className="flex w-full"
          variant="outline"
          color="danger"
          size="sm"
          text={`${"Delete"}`}
          onClick={async () => {}}
        />
      }
    >
      {(closeDialog) => (
        <DeleteRecordDialogContent
          eventId={eventId}
          recordId={recordId}
          parentSetState={parentSetState}
          closeDialog={closeDialog}
        />
      )}
    </DialogDemo>
  );
};

const DeleteRecordDialogContent = ({
  eventId = "",
  recordId = "",
  parentSetState = () => {},
  closeDialog = () => {},
}: {
  [key: string]: any;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteEventParticipationRecord, getUsers } = useApiContext();

  const handleDeleteRecord = () => {
    deleteEventParticipationRecord({
      eventId,
      recordId,
      setIsLoading,
      callback: () => {
        closeDialog();
        parentSetState((prev: any) => ({ ...prev, recordsUpdatedCode: Math.floor(Math.random() * 100) }));
      },
    });
  };

  return (
    <div className="crop-avatar-dialog">
      <h2 className="text-2xl text-center mb-5 max-w-[300px] mx-auto">
        Are you sure you want to delete this record?
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
            handleDeleteRecord();
          }}
        />
      </div>
    </div>
  );
};
