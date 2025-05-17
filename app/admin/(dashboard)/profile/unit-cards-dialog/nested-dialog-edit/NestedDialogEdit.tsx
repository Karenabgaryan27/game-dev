"use client";

import React, { useState, useEffect } from "react";
import { DialogDemo, ButtonDemo, UnitCard, InputDemo, SwitchDemo } from "@/components/index";
import localData from "@/localData";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiContext } from "@/contexts/ApiContext";
import { useGlobalContext } from "@/contexts/context";
import { Trash } from "lucide-react";

const { unitPlaceholderImage } = localData.images;

const NestedDialogEdit = ({ item = {}, className = "" }: { item?: any; className?: string }) => {
  const { unitImages } = useGlobalContext();

  return (
    <DialogDemo
      contentClassName="sm:max-w-[500px]"
      title="Edit Card"
      description="Edit the content and style"
      trigger={
        <div
          className={`wrapper h-0 shadow w-full pt-[130%] relative rounded-[5px] ${
            Object.keys(item).length || "pointer-events-none"
          }  card-${
            item.color || "gray"
          }  dark:bg-[rgba(255,255,255,0.1)] cursor-pointer hover:shadow-xl border hover:border-success ${className}`}
        >
          <img
            className={`absolute bottom-[5px] left-[50%] w-[90%] h-[80%] transform-[translateX(-50%)] object-contain ${
              item.color || "!grayscale !opacity-50"
            }`}
            src={
              (item.imageID && unitImages.find((image: any) => image.id == item.imageID)?.url) ||
              unitPlaceholderImage
            }
            alt=""
          />
        </div>
      }
    >
      {(closeDialog) => <Content closeDialog={closeDialog} item={item} />}
    </DialogDemo>
  );
};

export default NestedDialogEdit;

type StateProps = {
  imageID: number;
  label: string;
  color: string;
  isFeatured: boolean;
};

const Content = ({ closeDialog = () => {}, item = {} }: { closeDialog: () => void; item: any }) => {
  const [state, setState] = useState<StateProps>({
    imageID: 0,
    label: "",
    color: "",
    isFeatured: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { fetchedCurrentUser, updateUser, getUser } = useApiContext();
  const { currentUser } = useAuthContext();
  const { unitImages } = useGlobalContext();
  const { details } = fetchedCurrentUser;

  useEffect(() => {
    setState({
      imageID: item.imageID,
      label: item.label,
      color: item.color,
      isFeatured: item.isFeatured,
    });
  }, [item]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {
    let array = [];
    if (details.units) array = details.units;

    array = array.map((unit: any) => {
      if (unit.id == item.id) {
        return {
          ...unit,
          label: state.label,
          color: state.color,
          isFeatured: state.isFeatured,
          imageID: state.imageID,
          updatedAt: new Date(),
        };
      }
      return { ...unit };
    });
    const updatedFileds = {
      units: [...array],
    };

    updateUser({
      id: currentUser?.uid,
      updatedFields: updatedFileds,
      setIsLoading,
      callback: () => {
        closeDialog();
        getUser({ id: currentUser?.uid });
      },
    });
  };

  const handleDelete = () => {
    let array = [];
    if (details.units) array = details.units;

    array = array.filter((unit: any) => {
      if (unit.id == item.id) return;
      return { ...unit };
    });
    const updatedFileds = {
      units: [...array],
    };
    console.log(updatedFileds);

    updateUser({
      id: currentUser?.uid,
      updatedFields: updatedFileds,
      setIsLoading: setIsDeleting,
      callback: () => {
        closeDialog();
        getUser({ id: currentUser?.uid });
      },
    });
  };

  return (
    <div>
      <br />
      <div className="max-w-[150px] mx-auto mb-10">
        <UnitCard
          {...{
            imageID: state.imageID,
            color: state.color,
            label: state.label,
            glare: true,
            maxGlare: 0.8,
          }}
        />
      </div>

      <InputDemo
        label="Label"
        placeholder="Label"
        name="label"
        type="text"
        callback={(e) => onChange(e)}
        className="mb-5"
        value={state.label}
      />

      <div className="mb-3 bg-gray-50 dark:bg-neutral-800 p-3 rounded-md grid grid-cols-2 gap-x-2">
        <label className="flex items-center text-xs font-medium gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg">
          <div className={`w-[13px] h-[13px] flex items-center justify-center  rounded-full bg-purple-700 `}>
            <div
              className={`bg-gray-200 w-[6px] h-[6px] rounded-full  ${
                state.color == "purple" ? "block" : "hidden"
              }`}
            ></div>
            <input
              type="radio"
              name="color"
              className="hidden "
              onChange={() => setState((prev) => ({ ...prev, color: "purple" }))}
            />
          </div>
          <div>Purple</div>
        </label>
        <label className="flex items-center text-xs font-medium gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg">
          <div className={`w-[13px] h-[13px] flex items-center justify-center  rounded-full bg-yellow-500 `}>
            <div
              className={`bg-gray-200 w-[6px] h-[6px] rounded-full  ${
                state.color == "golden" ? "block" : "hidden"
              }`}
            ></div>
            <input
              type="radio"
              name="color"
              className="hidden "
              onChange={() => setState((prev) => ({ ...prev, color: "golden" }))}
            />
          </div>
          <div>Golden</div>
        </label>
        <label className="flex items-center text-xs font-medium gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg">
          <div className={`w-[13px] h-[13px] flex items-center justify-center  rounded-full bg-red-700`}>
            <div
              className={`bg-gray-200 w-[6px] h-[6px] rounded-full  ${
                state.color == "red" ? "block" : "hidden"
              }`}
            ></div>
            <input
              type="radio"
              name="color"
              className="hidden "
              onChange={() => setState((prev) => ({ ...prev, color: "red" }))}
            />
          </div>
          <div>Red</div>
        </label>
        <label className="flex items-center text-xs font-medium gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg">
          <div className={`w-[13px] h-[13px] flex items-center justify-center  rounded-full bg-blue-700`}>
            <div
              className={`bg-gray-200 w-[6px] h-[6px] rounded-full  ${
                state.color == "blue" ? "block" : "hidden"
              }`}
            ></div>
            <input
              type="radio"
              name="color"
              className="hidden "
              onChange={() => setState((prev) => ({ ...prev, color: "blue" }))}
            />
          </div>
          <div>Blue</div>
        </label>
        <label className="flex items-center text-xs font-medium gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg">
          <div className={`w-[13px] h-[13px] flex items-center justify-center  rounded-full bg-green-700`}>
            <div
              className={`bg-gray-200 w-[6px] h-[6px] rounded-full  ${
                state.color == "green" ? "block" : "hidden"
              }`}
            ></div>
            <input
              type="radio"
              name="color"
              className="hidden "
              onChange={() => setState((prev) => ({ ...prev, color: "green" }))}
            />
          </div>
          <div>Green</div>
        </label>
        <label className="flex items-center text-xs font-medium gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg">
          <div className={`w-[13px] h-[13px] flex items-center justify-center  rounded-full bg-black`}>
            <div
              className={`bg-gray-200 w-[6px] h-[6px] rounded-full  ${
                state.color == "dark" ? "block" : "hidden"
              }`}
            ></div>
            <input
              type="radio"
              name="color"
              className="hidden "
              onChange={() => setState((prev) => ({ ...prev, color: "dark" }))}
            />
          </div>
          <div>Dark</div>
        </label>
      </div>

      <SwitchDemo
        className="mb-4"
        label="set as featured."
        color="success"
        checked={state.isFeatured}
        callback={(isFeatured) => setState((prev) => ({ ...prev, isFeatured: isFeatured }))}
      />
      <br />

      {/* <div className="grid grid-cols-[repeat(auto-fill,_minmax(60px,_1fr))] justify-center gap-[10px] mb-[50px]">
        {unitImages.map((item: any, index: number) => {
          return (
            <div
              key={index}
              onClick={() => {
                setState((prev) => ({ ...prev, imageID: item.id }));
              }}
              className={`wrapper h-0 shadow w-full pt-[130%] relative rounded-[5px] bg-gray-100  dark:bg-neutral-800 cursor-pointer hover:shadow-xl border hover:border-success ${
                state.imageID == item.id ? "border-success" : ""
              }
              ${
                details.units?.find((artifact: any) => artifact.imageID == item.id)
                  ? "!pointer-events-none !opacity-20"
                  : ""
              }
              `}
            >
              <img
                className={`absolute left-[50%] top-[50%] transform-[translate(-50%,-50%)] w-[100%] h-[100%] object-contain`}
                src={item.url}
                alt=""
              />
            </div>
          );
        })}
      </div> */}

      <div className="button-group flex gap-2 justify-between">
        <ButtonDemo
          startIcon={<Trash />}
          className={`rounded-full w-[35px] h-[35px] `}
          variant="outline"
          color="danger"
          onClick={handleDelete}
          disabled={isDeleting}
        />
        <div className="flex gap-2">
          <ButtonDemo className="" text="Cancel" variant="outline" type="button" onClick={closeDialog} />
          <ButtonDemo
            className=""
            text={`${isLoading ? "Loading..." : "Edit"}`}
            onClick={onSubmit}
            disabled={isDeleting}
          />
        </div>
      </div>
    </div>
  );
};
