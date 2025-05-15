"use client";
import React, { useState, useEffect } from "react";
import { ButtonDemo, DialogDemo, TextareaDemo } from "@/components/index";
import ParticipantDialog from "../participant-dialog/ParticipantDialog";
import localData from "@/localData";
import { useApiContext } from "@/contexts/ApiContext";
import { DeleteRecordDialog } from "../delete-record-dialog/DeleteRecordDialog";

const { avatarPlaceholderImage, eventPlaceholderImage, acceptedImage, rejectedImage } = localData.images;


const ParticipantsDialog = ({
  participationRecords = [],
  eventId = {},
  parentSetState = () => {},
}: {
  participationRecords: any;
  eventId: any;
  parentSetState: (_: any) => void;
}) => {
  return (
    <DialogDemo
      title="Participants"
      description="List of participants in this event."
      contentClassName=""
      trigger={
        <ButtonDemo
          text="All"
          className="rounded-full border border-gray-300 w-[35px] h-[35px] hover:bg-gray-200 dark:hover:bg-gray-700"
          variant="ghost"
        />
      }
    >
      {(closeDialog) => (
        <ParticipantsDialogContent
          participationRecords={participationRecords}
          eventId={eventId}
          closeDialog={closeDialog}
          parentSetState={parentSetState}
        />
      )}
    </DialogDemo>
  );
};

const ParticipantsDialogContent = ({
  participationRecords = [],
  eventId = "",
  parentSetState = () => {},
  closeDialog = () => {},
}: {
  participationRecords: any;
  eventId: any;
  parentSetState: (_: any) => void;
  closeDialog: () => void;
}) => {
  const {
    fetchedCurrentUser: { details },
  } = useApiContext();

  return (
    <div className="participants-dialog mt-6">
      <div className="dialog-body">
        {participationRecords.map((record: any, index: number) => {

          return (
            <div key={index} className="flex gap-5 bg-blue-100 p-5 rounded-lg mb-3">
              <div>
                <div className="mx-auto w-[50px] h-[50px] rounded-full overflow-hidden border mb-3 shadow-lg">
                  <img
                    className="w-full h-full object-cover"
                    src={record.participant.avatar || avatarPlaceholderImage}
                    alt=""
                  />
                </div>

                <ParticipantDialog record={record} eventId={eventId} parentSetState={parentSetState} />
                {record.status !== "pending" && (details.role === "admin" || details.role === "superAdmin") && (
                  <DeleteRecordDialog
                    recordId={record.id}
                    eventId={eventId}
                    parentSetState={parentSetState}
                  />
                )}
              </div>
              <div className="flex-1">
                <div
                  className={`${
                    record.participant.screenshot ? "bg-black" : ""
                  }    shadow-lg border rounded-lg p-3 relative h-0 pt-[56.25%] overflow-hidden`}
                >
                  <img
                    className={`absolute w-full h-full object-contain top-0 left-0  block`}
                    src={record.participant.screenshot || eventPlaceholderImage}
                    alt=""
                  />
                  {record.status !== "pending" && (
                    <div className="overlay absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)]"></div>
                  )}
                  {record.status === "accepted" && (
                    <img
                      className="absolute bottom-0  right-[10px] transform-[rotateZ(15deg)] w-[100px]"
                      src={acceptedImage}
                      alt=""
                    />
                  )}
                  {record.status === "rejected" && (
                    <img
                      className="absolute bottom-0  right-[10px] transform-[rotateZ(15deg)] w-[100px]"
                      src={rejectedImage}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="button-group flex gap-2 justify-end">
        <ButtonDemo
          className=""
          variant="outline"
          text={`${"Close"}`}
          onClick={async () => {
            closeDialog();
          }}
        />
      </div>
    </div>
  );
};

export default ParticipantsDialog;

