'use client';

import React, { useState } from "react";
import { useApiContext } from "@/contexts/ApiContext";
import { ButtonDemo, InputDemo } from "@/components/index";
import localData from "@/localData";
import useUtil from "@/hooks/useUtil";

const { placeholderImage } = localData.images;

const ParticipationCardCreateDialog = ({
  id = "",
  createdBy = "",
  name = "",
  points = 0,
  screenshot = placeholderImage,
  closeDialog = () => {},
}) => {
  const [state, setState] = useState({ name: "", imageBase64: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { deleteEvent, updateEvent } = useApiContext();

  const { compressImage, convertToBase64 } = useUtil();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEvent({
      id,
      name: state.name,
      imageBase64: state.imageBase64,
      setIsLoading,
      callback: () => {
        closeDialog();
      },
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const deleteSingleMovie = (id: string = "") => {
    deleteEvent({
      id,
      callback: () => {
        closeDialog();
      },
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    try {
      const compressedBlob = await compressImage(file, 300); // target 300KB
      const imageBase64 = await convertToBase64(compressedBlob);
      console.log(imageBase64);
      setState((prev) => ({ ...prev, imageBase64 }));
    } catch (err) {
      console.error("Error during upload process:", err);
    }
  };
  return (
    <div className="card event-card">
      <div className="card-header  mb-3">
        {name && <h2 className="text-xs font-bold mb-6 bg-gray-100 p-3">{name}</h2>}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <div className="badge bg-success rounded-full w-5 h-5 flex items-center justify-center text-custom-sm  font-normal text-white">
              <span className="ml-[-2px]  ">+{points}</span>
            </div>
            <span className="text-sm">Points</span>
          </span>
          <h2 className="text-sm font-medium">
            Created by <span className="capitalize underline">{createdBy}</span>{" "}
          </h2>
        </div>
      </div>

      <div className="card-content mb-3 h-0 pt-[56.25%] relative wrapper rounded-lg">
        <img className=" absolute w-full h-full top-0 object-cover" src={screenshot} alt="" />
      </div>

      <div className="card-footer">
        <form action="" onSubmit={onSubmit}>
          <InputDemo
            placeholder="Name"
            name="name"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-3"
          />

          <InputDemo type="file" callback={(e) => handleUpload(e)} className="mb-5" />
          <br />
          <ButtonDemo
            text={`${isLoading ? "Updating..." : "Update Event"}`}
            className={`w-full mb-3 text-sm`}
            disabled={isLoading}
          />
        </form>
        <ButtonDemo
          text="Delete"
          variant="outline"
          onClick={() => deleteSingleMovie(id)}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ParticipationCardCreateDialog;
