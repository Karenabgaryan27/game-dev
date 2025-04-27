"use client";
import React, { useState, useEffect } from "react";
import EventCardUpdateDialog from "../event-card-update-dialog/EventCardUpdateDialog";
import EventCardDeleteDialog from "../event-card-delete-dialog/EventCardDeleteDialog";
import ParticipantCardCreateDialog from "../participant-card-create-dialog/ParticipantCardCreateDialog";
import localData from "@/localData";
import useExpiryCountdown from "@/hooks/useExpiryCountdown";
import { useAuthContext } from "@/contexts/AuthContext";

const {
  placeholderImage,
  behemothImage,
  caravanImage,
  passImage,
  meritsImage,
  resourcesImage,
  escortScreenshotImage,
  behemothcreenshotImage,
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
  });

  const { timeLeft, isNearExpiry, isExpired } = useExpiryCountdown(item.ttl?.seconds || 0);
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (item.type === "Custom") {
      setState(item);
    } else {
      const getType = eventTypes[item.type as EventType];
      setState(getType);
    }
  }, [item]);

  return (
    <div className={`card event-card `}>
      <div
        className={`card-header flex mb-1  items-center  gap-1 px-2 ${
          item.ttl != null && isExpired ? "opacity-20" : ""
        }`}
      >
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
          Created by <span className="capitalize underline">{item.createdBy}</span>{" "}
        </h2>
      </div>

      <div
        className={`wrapper ${
          item.ttl != null && isExpired ? "bg-blue-300 " : "bg-blue-400 "
        }  shadow-lg border rounded-lg p-3 relative h-0 pt-[56.25%] overflow-hidden`}
      >
        <div
          className={`wrapper-inner   ${
            item.ttl != null && isExpired ? "opacity-20 pointer-events-none" : ""
          }`}
        >
          <img
            className={`absolute w-[70%] h-[90%] object-contain top-[50%] left-[50%] transform-[translate(-50%,-50%)] block`}
            src={state.background || placeholderImage}
            alt=""
          />

          <div className=" label absolute bg-black text-white shadow-[1px_1px_3px_rgba(255,255,255,0.3)] rounded-r-lg py-[1px] pl-1 pr-3 top-0 left-0 mt-2 text-xs z-1">
            <h5>Type: {item.type}</h5>
          </div>
        </div>

        <div className="card-footer absolute  w-full left-0 bottom-0 z-1 p-3 flex justify-end ">
          <div className="flex flex-col w-[fit-content] gap-1 ">
            {currentUser?.uid === item.userId && <EventCardDeleteDialog item={item} state={state} />}
            {currentUser?.uid === item.userId && item.type === "Custom" && (
              <EventCardUpdateDialog
                item={item}
                className={` ${item.ttl != null && isExpired ? "hidden" : ""}`}
              />
            )}

            <ParticipantCardCreateDialog
              className={` ${item.ttl != null && isExpired ? "hidden" : ""}`}
              item={item}
              parentState={state}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
