"use client";

import React, { useState } from "react";
import { useApiContext } from "@/contexts/ApiContext";
import { ButtonDemo, InputDemo, TextareaDemo, SelectScrollable, DialogDemo } from "@/components/index";
import localData from "@/localData";
import useUtil from "@/hooks/useUtil";

const { placeholderImage, elkridersImage } = localData.images;

type EventStateProps = {
  type: string | number;
  name: string;
  points: string | number;
  expiry: string | number;
  background: string;
  screenshot: string;
  comment: string;
};

const defaultState = {
  type: "Custom",
  name: "",
  points: "",
  expiry: "",
  background: "",
  screenshot: "",
  comment: "",
};

const ParticipantCardCreateDialog = ({
  item = {},
  parentState = {},
  className = "",
}: {
  item: { [key: string]: any };
  parentState: { [key: string]: any };
  className?: string;
}) => {
  return (
    <DialogDemo
      color="success"
      title="Participation"
      description={"Join now — the event needs heroes, not spectators!"}
      trigger={
        <ButtonDemo
          color="success"
          text="Participate"
          className={`ml-auto flex cursor-pointer w-full ${className}`}
        />
      }
    >
      {(closeDialog) => <Content closeDialog={closeDialog} item={item} parentState={parentState} />}
    </DialogDemo>
  );
};

const Content = ({
  item = {},
  parentState = {},
  closeDialog = () => {},
}: {
  item: { [key: string]: any };
  parentState: { [key: string]: any };
  closeDialog: () => void;
}) => {
  const [state, setState] = useState<EventStateProps>(defaultState);
  const [isLoading, setIsLoading] = useState(false);

  const { updateEvent } = useApiContext();
  const { compressImage, convertToBase64 } = useUtil();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // updateEvent({
    //   id: item.id,
    //   name: state.name,
    //   description: state.description,
    //   points: state.points,
    //   background: state.background,
    //   screenshot: state.screenshot,
    //   expires,
    //   setIsLoading,
    //   callback: () => {
    //     closeDialog();
    //     setTimeout(() => setState(defaultState), 500);
    //   },
    // });

    if (e.target instanceof HTMLFormElement) e.target.reset();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    try {
      const compressedBlob = await compressImage(file, 100); // target 300KB
      const imageBase64 = await convertToBase64(compressedBlob);
      console.log(imageBase64);
      setState((prev) => ({ ...prev, [type]: imageBase64 }));
    } catch (err) {
      console.error("Error during upload process:", err);
    }
  };

  return (
    <div className="wrapper">
      <div className={`card-header flex mb-1  items-center  gap-1 px-2 `}>
        <span className="flex items-center gap-1">
          <div className="badge bg-success rounded-full w-5 h-5 flex items-center justify-center text-custom-sm  font-normal text-white">
            <span className="ml-[-2px]  ">+{parentState.points}</span>
          </div>
          <span className="text-[10px] font-medium text-success">Points</span>
        </span>

        <h2 className=" font-medium whitespace-nowrap text-xs ml-auto">
          Created by <span className="capitalize underline">{item.createdBy}</span>{" "}
        </h2>
      </div>
      <div className="wrapper bg-blue-400 shadow-lg border rounded-lg p-3 relative h-0 pt-[56.25%] overflow-hidden mb-5">
        <div className={`wrapper-inner`}>
          <img
            className={`absolute w-[70%] h-[90%] object-contain top-[50%] left-[50%] transform-[translate(-50%,-50%)] block`}
            src={parentState.background || placeholderImage}
            alt=""
          />

          <div className=" label absolute bg-black text-white shadow-[1px_1px_3px_rgba(255,255,255,0.3)] rounded-r-lg py-[1px] pl-1 pr-3 top-0 left-0 mt-2 text-xs z-1">
            <h5>Event type: {item.type}</h5>
          </div>
        </div>
      </div>
      {(parentState.name || parentState.description || parentState.screenshot) && (
        <div className="bg-gray-100 p-3 mb-5 rounded-md">
          <h2 className="text-2xl font-bold text-success">{parentState.name}</h2>
          <h4 className="text-ghost mb-3 text-xs">{parentState.description}</h4>

          {parentState.screenshot && (
            <div>
              <div className="">
                <p className="text-gray-400 text-xs mb-1">Screenshot</p>
                <DialogDemo
                  contentClassName="sm:max-w-[800px] py-0"
                  trigger={
                    <div className="cursor-pointer bg-black shadow-lg   rounded-lg p-3 relative h-0 pt-[56.25%] overflow-hidden mb-5">
                      <img
                        className={`absolute w-full h-full object-contain top-0 left-0  block`}
                        src={parentState.screenshot}
                        alt=""
                      />
                    </div>
                  }
                >
                  {() => (
                    <div className="bg-black shadow-lg border rounded-lg p-3 relative h-0 pt-[56.25%] overflow-hidden mb-5">
                      <img
                        className={`absolute w-full h-full object-contain top-0 left-0  block`}
                        src={parentState.screenshot}
                        alt=""
                      />
                    </div>
                  )}
                </DialogDemo>
              </div>
            </div>
          )}
        </div>
      )}

      <form onSubmit={onSubmit} className="m-5 max-w-[360px] mx-auto add-movie-form ">
        <InputDemo
          label="background"
          type="file"
          callback={(e) => handleUpload(e, "background")}
          className="mb-5 find-me"
        />
        <TextareaDemo
          label="Comment"
          placeholder="Comment"
          name="comment"
          type="text"
          callback={(e) => onChange(e)}
          className="mb-5"
          value={state.comment}
        />

        <ButtonDemo
          text={`${isLoading ? "Participating..." : "Participate"}`}
          className={`w-full mb-5 text-sm`}
          disabled={isLoading || state.type === ""}
          color="success"
        />
      </form>
    </div>
  );
};

export default ParticipantCardCreateDialog;

// const ScreenshotDialog = (screenshot = '') => {
//   return (
//     <DialogDemo

//     >
//       {(closeDialog) => <Content closeDialog={closeDialog}  />}
//     </DialogDemo>
//   );
// };
