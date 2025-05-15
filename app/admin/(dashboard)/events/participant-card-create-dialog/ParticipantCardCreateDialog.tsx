"use client";

import React, { useState } from "react";
import { useApiContext } from "@/contexts/ApiContext";
import {
  ButtonDemo,
  InputDemo,
  TextareaDemo,
  SelectScrollable,
  DialogDemo,
  Separator,
  CropDemo,
} from "@/components/index";
import localData from "@/localData";
import useUtil from "@/hooks/useUtil";
import Link from "next/link";

const { eventPlaceholderImage, maintenanceWorkerImage, elkridersImage } = localData.images;

type ParticipationStateProps = {
  screenshot: string;
  comment: string;
};

const defaultState = {
  screenshot: "",
  comment: "",
};

const ParticipantCardCreateDialog = ({
  className = "",
  item = {},
  parentState = {},
  parentSetState = () => {},
}: {
  className?: string;
  item: { [key: string]: any };
  parentState: { [key: string]: any };
  parentSetState: (_: any) => void;
}) => {
  return (
    <DialogDemo
      color="success"
      iconImage={elkridersImage}
      title="Participation"
      description={"Join now — the event needs heroes, not spectators!"}
      trigger={
        <ButtonDemo
          // size='sm'
          color="success"
          text="Participate"
          className={`ml-auto flex cursor-pointer w-full ${className}`}
        />
      }
    >
      {(closeDialog) => (
        <Content
          closeDialog={closeDialog}
          item={item}
          parentState={parentState}
          parentSetState={parentSetState}
        />
      )}
    </DialogDemo>
  );
};

const Content = ({
  item = {},
  parentState = {},
  parentSetState = () => {},
  closeDialog = () => {},
}: {
  item: { [key: string]: any };
  parentState: { [key: string]: any };
  parentSetState: (_: any) => void;
  closeDialog: () => void;
}) => {
  const [state, setState] = useState<ParticipationStateProps>(defaultState);
  const [isLoading, setIsLoading] = useState(false);

  const [screenshotSrc, setScreenshotSrc] = useState("");
  const [croppedScreenshotImageSrc, setCroppedScreenshotImageSrc] = useState("");

  const {
    updateEvent,
    fetchedCurrentUser: { details },
    addEventParticipationRecord,
  } = useApiContext();
  const { compressImage, convertToBase64, resizeBase64Image } = useUtil();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(item, 'here')

    const fields = {
      status: 'pending',
      event: {
        name: item.name || parentState.name ||  "",
        description: item.description || parentState.description ||  "",
        points: item.points || parentState.points ||  "",
        type: item.type || parentState.type ||  "",
        createdBy: item.createdBy || "",
        createdAt: item.createdAt || ""
      },
      participant: {
        screenshot: state.screenshot,
        comment: state.comment,
        uid: details.uid,
        name: details.displayName,
        avatar: details.base64PhotoURL || details.photoURL,
        rank: details.rank,
      },
      createdAt: new Date(),
      createdBy: details?.displayName,
      userId: details?.uid,
    };

    const size = getBase64ImageSize(state.screenshot).kilobytes;
    console.log(size, ' participation screenshot size')
    addEventParticipationRecord({
      eventId: item.id,
      fields,
      setIsLoading,
      callback: () => {
        closeDialog();
        
        parentSetState((prev: any) => ({ ...prev, recordsUpdatedCode: Math.floor(Math.random() * 100) }));
      },
    });

    if (e.target instanceof HTMLFormElement) e.target.reset();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function getBase64ImageSize(base64String: any) {
    const padding = base64String.endsWith("==") ? 2 : base64String.endsWith("=") ? 1 : 0;
    const base64Length = base64String.length;
    const sizeInBytes = (base64Length * 3) / 4 - padding;
    const sizeInKB = sizeInBytes / 1024;
    return { bytes: sizeInBytes, kilobytes: sizeInKB };
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (!e.target.files) return;
    try {
      // const compressedBlob = await compressImage(file, 30);
      const imageBase64 = await convertToBase64(e.target.files[0]);
      // let filteredImage = imageBase64;
      // const size = getBase64ImageSize(imageBase64).kilobytes;
      // if (size > 10) filteredImage = await resizeBase64Image(imageBase64, 10);
      // setState((prev) => ({ ...prev, [type]: imageBase64 }));
      setScreenshotSrc(imageBase64)
      // e.target.value = "";
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
          Created by{" "}
          <Link
            className={`capitalize hover:decoration-black underline  decoration-gray-400 ${
              details.id === item.userId ? "pointer-events-none opacity-30" : ""
            } `}
            href={`/admin/users/${item.userId}`}
          >
            {item.createdBy}
          </Link>{" "}
        </h2>
      </div>
      <div className="wrapper bg-blue-400 shadow-lg border rounded-lg p-3 relative h-0 pt-[56.25%] overflow-hidden mb-5">
        <div className={`wrapper-inner`}>
          <img
            className={`absolute w-[70%] h-[90%] object-contain top-[50%] left-[50%] transform-[translate(-50%,-50%)] block`}
            src={parentState.background || eventPlaceholderImage}
            alt=""
          />

          <div className=" label absolute bg-black text-white shadow-[1px_1px_3px_rgba(255,255,255,0.3)] rounded-r-lg py-[1px] pl-1 pr-3 top-0 left-0 mt-2 text-xs z-1">
            <h5>Type: {item.type}</h5>
          </div>
        </div>
      </div>
      {(parentState.name || parentState.description || parentState.screenshot) && (
        <div className="bg-gray-100 p-3 mb-5 rounded-md">
          <h2 className="text-2xl font-bold text-success mb-3">{parentState.name}</h2>
          <h4 className="text-ghost mb-3 text-xs">{parentState.description}</h4>

          {parentState.screenshot && (
            <div>
              <div className="">
                <p className="text-gray-400 text-xs mb-1">Screenshot sample</p>
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
      <Separator title="Enter data below" titleClassName="bg-white" />
      <form onSubmit={onSubmit} className="m-5 max-w-[360px] mx-auto add-movie-form ">
        <p className="text-gray-600 text-xs mb-1">Screenshot </p>
        <label
          className={`block bg-gray-100 hover:bg-gray-200 ${
            state.screenshot ? "!bg-black" : ""
          } transition cursor-pointer  shadow-lg   rounded-lg p-3 relative h-0 pt-[56.25%] overflow-hidden mb-5`}
        >
          <InputDemo
            label="Screenshot"
            type="file"
            callback={(e) => handleUpload(e, "screenshot")}
            className="mb-5 find-me hidden"
          />
          <img
            className={`absolute w-full h-full object-contain top-0 left-0  block`}
            src={state.screenshot || eventPlaceholderImage}
            alt=""
          />
        </label>
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
          disabled={isLoading}
          color="success"
        />

        <CropScreenshotDialog
          src={screenshotSrc}
          setSrc={setScreenshotSrc}
          croppedImageSrc={croppedScreenshotImageSrc}
          setCroppedImageSrc={setCroppedScreenshotImageSrc}
          setState={setState}
        />
      </form>
    </div>
  );
};

export default ParticipantCardCreateDialog;

// SCREENSHOT DIALOG
const CropScreenshotDialog = ({
  src = "",
  setSrc = (_: any) => {},
  croppedImageSrc = "",
  setCroppedImageSrc = (_: any) => {},
  setState = (_: any) => {},
}) => {
  const callback = () => {
    setSrc("");
  };
  return (
    <DialogDemo
      callback={callback}
      contentClassName="sm:max-w-[1000px] py-[50px]"
      isDialogOpened={src ? true : false}
      trigger={<div className="hidden">hidden</div>}
    >
      {(closeDialog) => (
        <CropScreenshotDialogContent
          closeDialog={closeDialog}
          src={src}
          setSrc={setSrc}
          croppedImageSrc={croppedImageSrc}
          setCroppedImageSrc={setCroppedImageSrc}
          setState={setState}
        />
      )}
    </DialogDemo>
  );
};

const CropScreenshotDialogContent = ({
  closeDialog = () => {},
  src = "",
  setSrc = (_: any) => {},
  croppedImageSrc = "",
  setCroppedImageSrc = (_: any) => {},
  setState = (_: any) => {},
}) => {
  const { resizeBase64Image } = useUtil();

  function getBase64ImageSize(base64String: any) {
    const padding = base64String.endsWith("==") ? 2 : base64String.endsWith("=") ? 1 : 0;
    const base64Length = base64String.length;
    const sizeInBytes = (base64Length * 3) / 4 - padding;
    const sizeInKB = sizeInBytes / 1024;
    return { bytes: sizeInBytes, kilobytes: sizeInKB };
  }

  return (
    <div className="crop-banner-dialog">
      <div className="max-w-[100%] mx-auto flex mb-10">
        <CropDemo src={src} aspect={16 / 9} scale={2} setCroppedImageSrc={setCroppedImageSrc} />
      </div>
      <div className="button-group flex gap-2 justify-end">
        <ButtonDemo
          className=""
          text="Cancel"
          variant="outline"
          type="button"
          onClick={() => {
            closeDialog();
            setSrc("");
          }}
        />
        <ButtonDemo
          className=""
          text={`${"Apply"}`}
          onClick={async () => {
            const size = getBase64ImageSize(croppedImageSrc).kilobytes;
            let filteredImage = croppedImageSrc;

            if (size > 500) filteredImage = await resizeBase64Image(croppedImageSrc, 500);

            setState((prev: any) => ({ ...prev, screenshot: filteredImage }));
            setSrc("");
            closeDialog();
          }}
        />
      </div>
    </div>
  );
};
