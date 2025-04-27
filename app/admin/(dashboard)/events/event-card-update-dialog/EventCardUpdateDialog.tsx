"use client";

import React, { useState } from "react";
import { useApiContext } from "@/contexts/ApiContext";
import { ButtonDemo, InputDemo, TextareaDemo, SelectScrollable, DialogDemo } from "@/components/index";
import useUtil from "@/hooks/useUtil";

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
  type: "Custom",
  name: "",
  points: "",
  expiry: "",
  background: "",
  screenshot: "",
  description: "",
};

const EventCardUpdateDialog = ({
  item = {},
  className = "",
}: {
  item: Record<string, unknown>;
  className?: string;
}) => {
  return (
    <DialogDemo
      color="warning"
      title="Update Event"
      description={"This applies only on custom events"}
      trigger={
        <ButtonDemo
          color="warning"
          text="Update"
          className={`ml-auto flex cursor-pointer w-full ${className}`}
        />
      }
    >
      {(closeDialog) => <Content closeDialog={closeDialog} item={item} />}
    </DialogDemo>
  );
};

const Content = ({
  item = {},
  closeDialog = () => {},
}: {
  item: Record<string, any>;
  closeDialog: () => void;
}) => {
  const [state, setState] = useState<EventStateProps>(defaultState);
  const [isLoading, setIsLoading] = useState(false);

  const { updateEvent } = useApiContext();
  const { compressImage, convertToBase64 } = useUtil();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let expires = null;

    if (state.expiry) {
      const hours = Number(state.expiry) * 60;
      expires = new Date(Date.now() + hours * 60 * 1000);
    }
    updateEvent({
      id: item.id,
      name: state.name,
      description: state.description,
      points: state.points,
      background: state.background,
      screenshot: state.screenshot,
      expires,
      setIsLoading,
      callback: () => {
        closeDialog();
        setTimeout(() => setState(defaultState), 500);
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
      <form onSubmit={onSubmit} className="m-5 max-w-[360px] mx-auto add-movie-form ">
        <div className="text-sm mb-5 text-gray-300">Type: Custom</div>
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
                    })
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
                label="background"
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
          text={`${isLoading ? "Updating..." : "Update Event"}`}
          className={`w-full mb-5 text-sm`}
          disabled={isLoading || state.type === ""}
          color="warning"
        />
      </form>
    </div>
  );
};

export default EventCardUpdateDialog;
