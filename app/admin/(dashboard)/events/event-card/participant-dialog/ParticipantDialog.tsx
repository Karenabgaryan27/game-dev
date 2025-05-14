"use client";

import React, { useState, useEffect } from "react";
import { useApiContext } from "@/contexts/ApiContext";
import Link from "next/link";
import { ButtonDemo, DialogDemo, TextareaDemo } from "@/components/index";
import localData from "@/localData";

const { avatarPlaceholderImage, eventPlaceholderImage } = localData.images;

const ParticipantDialog = ({
  record = {},
  eventId = "",
  parentSetState = () => {},
}: {
  record: any;
  eventId: any;
  parentSetState: (_: any) => void;
}) => {
  return (
    <DialogDemo
      title="Participant Record"
      description="Record of participant in this event."
      contentClassName="sm:max-w-[600px]"
      trigger={
        <ButtonDemo
          className="!shadow-none "
          variant="ghost"
          text={`${"Details"}`}
          onClick={async () => {}}
        />
      }
    >
      {(closeDialog) => (
        <ParticipantDialogContent
          record={record}
          eventId={eventId}
          parentSetState={parentSetState}
          closeDialog={closeDialog}
        />
      )}
    </DialogDemo>
  );
};

const ParticipantDialogContent = ({
  record = {},
  eventId = "",
  parentSetState = () => {},
  closeDialog = () => {},
}: {
  record: any;
  eventId: any;
  parentSetState: (_: any) => void;
  closeDialog: () => void;
}) => {
  const [state, setState] = useState({
    comment: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { updateEventParticipationRecord } = useApiContext();

  const onSubmit = ({ status = "" }) => {
    const fields = {
      status: status,
      reviewer: {
        comment: state.comment,
        uid: details.uid,
        name: details.displayName,
        avatar: details.base64PhotoURL || details.photoURL,
        rank: details.rank,
      },
    };

    updateEventParticipationRecord({
      eventId: eventId,
      recordId: record.id,
      fields,
      setIsLoading,
      callback: () => {
        closeDialog();
        parentSetState((prev: any) => ({ ...prev, recordsUpdatedCode: Math.floor(Math.random() * 100) }));
      },
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const {
    fetchedCurrentUser: { details },
  } = useApiContext();
  return (
    <div className="participant-dialog mt-3">
      <div className="dialog-body mb-5">
        <div className=" bg-gray-200 p-5 rounded-lg mb-10">
          <div className="flex gap-5">
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden border mb-3 shadow-lg">
              <img
                className="w-full h-full object-cover"
                src={record.participant.avatar || avatarPlaceholderImage}
                alt=""
              />
            </div>
            <div>
              <div className="flex gap-2 items-center mb-1 text-sm">
                Created by:
                <Link
                  className={`capitalize hover:decoration-black underline  decoration-gray-400 ${
                    details.id === record.participant.uid ? "pointer-events-none opacity-30" : ""
                  } `}
                  href={`/admin/users/${record.participant.uid}`}
                >
                  {record.participant.name}
                </Link>{" "}
              </div>

              <div className="text-sm flex items-center gap-2">
                Rank:
                <div>{record.participant.rank || <div className="text-gray-500">---</div>}</div>
              </div>
              <div className="text-sm flex items-center gap-2">
                Comment:
                <div>{record.participant.comment || <div className="text-gray-500">---</div>}</div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div
              className={`${
                record.participant.screenshot ? "bg-black" : ""
              }   shadow-lg border rounded-lg p-3 relative h-0 pt-[56.25%] overflow-hidden`}
            >
              <img
                className={`absolute w-full h-full object-contain top-0 left-0  block`}
                src={record.participant.screenshot || eventPlaceholderImage}
                alt=""
              />
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm flex gap-1 mb-2">
            <strong>Status:</strong>
            <div
              className={`${
                record.status === "pending"
                  ? "text-gray-500"
                  : record.status === "accepted"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {record.status}
            </div>
          </div>

          {record.status == "pending" && (details.role === "admin" || details.role === "superAdmin") && (
            <div>
              <TextareaDemo
                label="Comment"
                placeholder="Comment"
                name="comment"
                type="text"
                callback={(e) => onChange(e)}
                className="mb-5"
                value={state.comment}
              />
              <div className="flex gap-2 justify-end">
                <ButtonDemo
                  disabled={isLoading}
                  variant="destructive"
                  text={`${"Reject"}`}
                  onClickCapture={() => {
                    onSubmit({ status: "rejected" });
                  }}
                />
                <ButtonDemo
                  disabled={isLoading}
                  text={`${"Acept"}`}
                  onClickCapture={() => {
                    onSubmit({ status: "accepted" });
                  }}
                />
              </div>
            </div>
          )}

          {record.reviewer && (
            <div
              className={`flex gap-5 ${
                record.status === "accepted" ? "bg-green-100" : "bg-red-100"
              } p-5 rounded-lg mb-3`}
            >
              <div className="w-[70px] h-[70px] rounded-full overflow-hidden border mb-3 shadow-lg">
                <img
                  className="w-full h-full object-cover"
                  src={record?.reviewer?.avatar || avatarPlaceholderImage}
                  alt=""
                />
              </div>
              <div>
                <div className="flex gap-2 items-center mb-1 text-sm">
                  {record.status} by:
                  <Link
                    className={`capitalize hover:decoration-black underline  decoration-gray-400 ${
                      details.id === record?.reviewer?.uid ? "pointer-events-none opacity-30" : ""
                    } `}
                    href={`/admin/users/${record?.reviewer?.uid}`}
                  >
                    {record?.reviewer?.name}
                  </Link>{" "}
                </div>

                <div className="text-sm flex items-center gap-2">
                  Rank:
                  <div>{record?.reviewer?.rank || <div className="text-gray-500">---</div>}</div>
                </div>
                <div className="text-sm flex items-center gap-2">
                  Comment:
                  <div>{record?.reviewer?.comment || <div className="text-gray-500">---</div>}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="button-group flex gap-2 justify-end">
        {/* <ButtonDemo
          className=""
          text={`${"Close"}`}
          onClick={async () => {
            closeDialog();
          }}
        /> */}
      </div>
    </div>
  );
};

export default ParticipantDialog;
