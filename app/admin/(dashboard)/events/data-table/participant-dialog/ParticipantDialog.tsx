"use client";

import React, { useState, useEffect } from "react";
import { useApiContext } from "@/contexts/ApiContext";
import Link from "next/link";
import { ButtonDemo, DialogDemo, TextareaDemo } from "@/components/index";
import localData from "@/localData";

const { avatarPlaceholderImage, eventPlaceholderImage } = localData.images;

const ParticipantDialog = ({ record = {}, recordRest = {}, trigger = null }: any) => {
  return (
    <DialogDemo
      title="Participant Record"
      description="Record of participant in this event."
      contentClassName="sm:max-w-[600px]"
      trigger={
        trigger || (
          <ButtonDemo
            className="flex w-full mb-1"
            size="sm"
            color="blue"
            text={`${"Details"}`}
            onClick={async () => {}}
          />
        )
      }
    >
      {(closeDialog) => (
        <ParticipantDialogContent record={record} recordRest={recordRest} closeDialog={closeDialog} />
      )}
    </DialogDemo>
  );
};

const ParticipantDialogContent = ({ record = {}, recordRest = {} }: any) => {

  const [reviewerAvatar, setReviewerAvatar] = useState(avatarPlaceholderImage);

  const {
    fetchedCurrentUser: { details },
    fetchedUsers,
  } = useApiContext();

    useEffect(() => {
        const user = fetchedUsers.list.find((user: any) => user.uid == record.reviewer.uid)
        if (!user) return 
        const userAvatar =  user.base64PhotoURL || user.photoURL || avatarPlaceholderImage
        setReviewerAvatar(userAvatar)
  }, [fetchedUsers]);

  return (
    <div className="participant-dialog mt-3">
      <div className="dialog-body mb-5">
        <div className=" bg-blue-100 p-5 rounded-lg mb-10">
          <div className="flex gap-5">
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden border  shadow-lg">
              <img
                className="w-full h-full object-cover"
                src={recordRest.avatar || avatarPlaceholderImage}
                alt=""
              />
            </div>
            <div>
              <div className="flex gap-2 mb-1 text-sm">
                Created by:
                <Link
                  className={`capitalize hover:decoration-black underline  decoration-gray-400 ${
                    details.id === record.participant.uid ? "pointer-events-none opacity-30" : ""
                  } `}
                  href={`/admin/users/${record.participant.uid}`}
                >
                  {recordRest.name}
                </Link>{" "}
              </div>

              <div className="text-sm flex gap-2">
                Rank:
                <div>{record.participant.rank || <div className="text-gray-500">---</div>}</div>
              </div>
              <div className="text-sm flex gap-2">
                Comment:
                <div>{record.participant.comment || <div className="text-gray-500">---</div>}</div>
              </div>
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

          {record.reviewer && (
            <div
              className={`flex gap-5 ${
                record.status === "accepted" ? "bg-green-100" : "bg-red-100"
              } p-5 rounded-lg`}
            >
              <div className="w-[70px] h-[70px] rounded-full overflow-hidden border shadow-lg">
                <img className="w-full h-full object-cover" src={reviewerAvatar} alt="" />
              </div>
              <div>
                <div className="flex gap-2 mb-1 text-sm">
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

                <div className="text-sm flex gap-2">
                  Rank:
                  <div>{record?.reviewer?.rank || <div className="text-gray-500">---</div>}</div>
                </div>
                <div className="text-sm flex gap-2">
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
