"use client";

import React, { useState } from "react";
import { useApiContext } from "@/contexts/ApiContext";
import { ButtonDemo, InputDemo, TextareaDemo, SelectScrollable, DialogDemo } from "@/components/index";
import useUtil from "@/hooks/useUtil";
import localData from "@/localData";
import { Timestamp } from "firebase/firestore";
import { useAuthContext } from "@/contexts/AuthContext";

const { plusIcon } = localData.svgs;
const { knightsImage } = localData.images;

type EventStateProps = {
  type: string | number;
  name: string;
  points: string | number;
  expiry: string | number;
  background: string;
  screenshot: string;
  description: string;
};

const defaultState = {
  type: "",
  name: "",
  points: 5,
  expiry: 12,
  background: "",
  screenshot: "",
  description: "",
};

const EventCardCreateDialog = () => {
  return (
    <DialogDemo
      iconImage={knightsImage}
      title="Create Event"
      description="Choose an event type or create a custom one"
      trigger={
        <ButtonDemo
          text="Create Event"
          variant="outline"
          className={`bg-blue-400 hover:bg-blue-500 w-full h-full  text-white hover:text-white  absolute top-0 left-0  fill-white flex-col text-lg cursor-pointer `}
          endIcon={plusIcon}
        />
      }
    >
      {(closeDialog) => <Content closeDialog={closeDialog} />}
    </DialogDemo>
  );
};

const Content = ({ closeDialog = () => {} }) => {
  const [state, setState] = useState<EventStateProps>(defaultState);
  const [isLoading, setIsLoading] = useState(false);

  const { addEvent } = useApiContext();
  const { currentUser } = useAuthContext();
  const { compressImage, convertToBase64 } = useUtil();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let fields: { [key: string]: any } = {};

    if (state.type === "Custom") {
      let expires = null;
      if (state.expiry !== "none") {
        const hours = Number(state.expiry) * 60;
        expires = new Date(Date.now() + hours * 60 * 1000);
      }

      fields = {
        type: state.type,
        name: state.name,
        description: state.description,
        points: state.points,
        background: state.background,
        screenshot: state.screenshot,
        ...(expires ? { ttl: Timestamp.fromDate(new Date(expires)) } : {ttl: null}),

        createdAt: new Date(),
        createdBy: currentUser?.displayName,
        userId: currentUser?.uid,
      };

      addEvent({
        fields,
        setIsLoading,
        callback: () => {
          closeDialog();
          setTimeout(() => setState(defaultState), 500);
        },
      });
      
    } else {
      let fields: { [key: string]: any } = {};

      const hours = Number(state.expiry) * 60;
      const expires = new Date(Date.now() + hours * 60 * 1000);

      fields = {
        type: state.type,
        ...(expires ? { ttl: Timestamp.fromDate(new Date(expires)) } : {}),

        createdAt: new Date(),
        createdBy: currentUser?.displayName,
        userId: currentUser?.uid,
      };
      addEvent({
        fields,
        setIsLoading,
        callback: () => {
          closeDialog();
          setTimeout(() => setState(defaultState), 500);
        },
      });
    }

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
      const compressedBlob = await compressImage(file, type === "screenshot" ? 100 : 500);
      const imageBase64 = await convertToBase64(compressedBlob);
      console.log(imageBase64);
      setState((prev) => ({ ...prev, [type]: imageBase64 }));
    } catch (err) {
      console.error("Error during upload process:", err);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={onSubmit} className="m-5 max-w-[360px] mx-auto add-movie-form ">
        <SelectScrollable
          label="Type*"
          triggerClassName="w-full mb-5"
          contentClassName=""
          defaultItems={["Behemoth", "Caravan", "Gates", "Merit Farming", "Resource Donation", "Custom"].map(
            (type) => {
              return {
                label: type,
                value: type,
                isSelected: false,
              };
            }
          )}
          callback={(selectedItem) => {
            setState((prev) => ({
              ...prev,
              type: selectedItem.value,
            }));
          }}
        />
        {state.type === "Custom" && (
          <>
            <InputDemo
              label="Name"
              placeholder="Name"
              name="name"
              type="text"
              callback={(e) => onChange(e)}
              className="mb-5"
              value={state.name}
            />

            <div className="flex gap-2">
              <div className="flex-1">
                <SelectScrollable
                  label="Expiry"
                  triggerClassName="w-full mb-5"
                  contentClassName=""
                  defaultItems={[
                    {
                      label: "No time limit",
                      value: "none",
                      isSelected: false,
                    },
                    ...Array.from({ length: 24 }, (_, i) => {
                      const value = `${i + 1}`;
                      return {
                        label: `${value} hour${value !== "1" ? "s" : ""}`,
                        value,
                        isSelected: value === state.expiry.toString(),
                      };
                    }),
                  ]}
                  callback={(selectedItem) => {
                    setState((prev) => ({
                      ...prev,
                      expiry: selectedItem.value,
                    }));
                  }}
                />
              </div>
              <div className="flex-1">
                <SelectScrollable
                  label="Points"
                  triggerClassName="w-full mb-5"
                  contentClassName=""
                  defaultItems={[
                    {
                      label: "No points",
                      value: "0",
                      isSelected: false,
                    },
                    ...Array.from({ length: 100 }, (_, i) => {
                      const value = `${i + 1}`;
                      return {
                        label: `${value} point${value !== "1" ? "s" : ""}`,
                        value,
                        isSelected: value === state.points.toString(),
                      };
                    }),
                  ]}
                  callback={(selectedItem) => {
                    setState((prev) => ({
                      ...prev,
                      points: selectedItem.value,
                    }));
                  }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <InputDemo
                label="Background"
                type="file"
                callback={(e) => handleUpload(e, "background")}
                className="mb-5 find-me"
              />
              <InputDemo
                label="Example"
                type="file"
                callback={(e) => handleUpload(e, "screenshot")}
                className="mb-5 find-me"
              />
            </div>
            <TextareaDemo
              label="Description"
              placeholder="Description"
              name="description"
              type="text"
              callback={(e) => onChange(e)}
              className="mb-5"
              value={state.description}
            />
          </>
        )}

        <ButtonDemo
          text={`${isLoading ? "Adding..." : "Add Event"}`}
          className={`w-full mb-5 text-sm`}
          disabled={isLoading || state.type === ""}
          color="blue"
        />
      </form>
    </div>
  );
};

export default EventCardCreateDialog;
