"use client";
import React, { useState, useEffect } from "react";
import EventCardUpdateDialog from "../event-card-update-dialog/EventCardUpdateDialog";
import EventCardDeleteDialog from "../event-card-delete-dialog/EventCardDeleteDialog";
import ParticipantCardCreateDialog from "../participant-card-create-dialog/ParticipantCardCreateDialog";
import localData from "@/localData";
import useExpiryCountdown from "@/hooks/useExpiryCountdown";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiContext } from "@/contexts/ApiContext";
import Link from "next/link";
import { ButtonDemo, DialogDemo, TextareaDemo } from "@/components/index";
import ParticipantsDialog from "./participants-dialog/ParticipantsDialog";
import ParticipantDialog from "./participant-dialog/ParticipantDialog";

const {
  eventPlaceholderImage,
  behemothImage,
  caravanImage,
  passImage,
  meritsImage,
  resourcesImage,
  escortScreenshotImage,
  behemothcreenshotImage,
  badgeImage,
  avatarPlaceholderImage,
} = localData.images;

const eventTypes = {
  Behemoth: {
    name: "Behemoth event",
    description: "Taking down the Behemoth – step one: don’t die. Step two: repeat step one.",
    points: 5,
    background: behemothImage,
    screenshot: behemothcreenshotImage,
  },
  Caravan: {
    name: "Caravan event",
    description: "Escort the caravan safely through bandits, bad roads, and surprise goat attacks.",
    points: 3,
    background: caravanImage,
    screenshot: escortScreenshotImage,
  },
  Gates: {
    name: "Gates event",
    description: "Attack the Pass – it’s not going to attack itself.",
    points: 5,
    background: passImage,
  },
  "Merit Farming": {
    name: "Merit Farming",
    description: "Merit Farming – teamwork makes the points work.",
    points: 0,
    background: meritsImage,
  },
  "Resource Donation": {
    name: "Resource Donation",
    description: "Give your stuff, get some alliance love! 😜",
    points: 5,
    background: resourcesImage,
  },
};

type EventType = keyof typeof eventTypes;

const EventCard = ({ item = {} }: { item: { [key: string]: any } }) => {
  const [state, setState] = useState<{ [key: string]: any }>({
    name: "",
    descritpion: "",
    points: 0,
    background: "",
    recordsUpdatedCode: "",
  });

  const [participationRecords, setParticipationRecords] = useState([]);

  const { timeLeft, isNearExpiry, isExpired } = useExpiryCountdown(item.ttl?.seconds || 0);
  const { currentUser } = useAuthContext();
  const {
    fetchedCurrentUser: { details },
    getEventParticipationRecords,
  } = useApiContext();

  useEffect(() => {
    if (item.type === "Custom") {
      setState(item);
    } else {
      const getType = eventTypes[item.type as EventType];
      setState(getType);
    }
  }, [item]);

  useEffect(() => {
    getEventParticipationRecords({
      eventId: item.id,
      successCallback: (data: any) => {
        setParticipationRecords(data.data);
      },
    });
  }, [item, state.recordsUpdatedCode]);

  return (
    <div className={`card event-card  relative`}>
      <div className={`card-inner ${item.ttl != null && isExpired ? "opacity-20" : ""}`}>
        <div className={`card-header flex mb-1  items-center  gap-1 px-2 `}>
          <span className="flex items-center gap-1">
            <div className="badge bg-success rounded-full w-5 h-5 flex items-center justify-center text-custom-sm  font-normal text-white">
              <span className="ml-[-2px]  ">+{state.points}</span>
            </div>
            <span className="text-[10px] font-medium text-success">Points</span>
          </span>

          {item.ttl != null ? (
            <div className={`text-xs ${isNearExpiry || isExpired ? "text-red-500" : ""} w-[60px] `}>
              {timeLeft}
            </div>
          ) : (
            <div className="text-xs text-gray-400">No time limit</div>
          )}

          <h2 className=" font-medium whitespace-nowrap text-xs ml-auto">
            <div className="font-medium text-[10px] text-gray-500">Created by </div>
            <Link
              className={`capitalize hover:decoration-black underline  decoration-gray-400 ${
                details.id === item.userId ? "pointer-events-none opacity-30" : ""
              } truncate w-[90px] block font-regular`}
              href={`/admin/users/${item.userId}`}
            >
              {item.createdBy}
            </Link>{" "}
          </h2>
        </div>

        <div
          className={`card-body bg-blue-400 shadow-lg border rounded-lg p-3 relative h-0 pt-[56.25%] overflow-hidden`}
        >
          <img
            className={`absolute w-[70%] h-[90%] object-contain top-[50%] left-[50%] transform-[translate(-70%,-50%)] block`}
            src={state.background || eventPlaceholderImage}
            alt=""
          />
          <img
            className={`absolute w-[50px] h-[auto] object-contain top-[5%] right-[3%] block drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]`}
            src={badgeImage}
            alt=""
          />

          <div className=" label absolute  text-white shadow-[1px_1px_3px_rgba(0,0,0,0.3)] rounded-r-lg py-[1px] pl-1 pr-3 top-0 left-0 mt-2 text-xs z-1">
            <h5>Type: {item.type}</h5>
          </div>
        </div>

        <div className="card-footer px-2  min-h-[40px] flex items-center gap-1 ">
          {participationRecords.length ? (
            participationRecords
              .filter((item, index) => index < 4)
              .map((record: any, index: number) => {
                return (
                  <ParticipantDialog
                    key={index}
                    record={record}
                    eventId={item.id}
                    parentSetState={setState}
                    trigger={
                      <div
                        key={index}
                        className="w-[35px] h-[35px] rounded-full overflow-hidden border  shadow-lg relative group cursor-pointer"
                      >
                        <div className="overlay absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)] hidden group-hover:block"></div>
                        <img
                          className="w-full h-full object-cover"
                          src={record.participant.avatar || avatarPlaceholderImage}
                          alt=""
                        />
                      </div>
                    }
                  />
                );
              })
          ) : (
            <div className="text-gray-400 text-xs self-start mt-1">No particiapnts</div>
          )}
          {participationRecords.length > 4 ? (
            <div className="text-sm">+{participationRecords.length - 4}</div>
          ) : (
            ""
          )}
          {participationRecords.length ? (
            <ParticipantsDialog
              participationRecords={participationRecords}
              eventId={item.id}
              parentSetState={setState}
            />
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="options absolute  w-full left-0 bottom-[38px] z-10 p-3 flex justify-end ">
        <div className="flex flex-col w-[fit-content] gap-1 ">
          {(currentUser?.uid === item.userId || details?.role === "superAdmin") && (
            <EventCardDeleteDialog item={item} state={state} />
          )}
          {currentUser?.uid === item.userId && item.type === "Custom" && (
            <EventCardUpdateDialog
              className={` ${item.ttl != null && isExpired ? "hidden" : ""}`}
              item={item}
              parentState={state}
            />
          )}

          <ParticipantCardCreateDialog
            className={` ${item.ttl != null && isExpired ? "hidden" : ""}`}
            item={item}
            parentState={state}
            parentSetState={setState}
          />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
