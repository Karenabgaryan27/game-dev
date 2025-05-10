"use client";

import React, { useState, useEffect } from "react";
import { ButtonDemo, DialogDemo, DropdownMenuDemo } from "@/components/index";
import { useApiContext } from "@/contexts/ApiContext";

export const DeleteUserDialog = ({ id = "" }) => {
  return (
    <DialogDemo contentClassName="" trigger={<div>{`${"Remove User"}`}</div>}>
      {(closeDialog) => <DeleteUserDialogContent id={id} closeDialog={closeDialog} />}
    </DialogDemo>
  );
};

const DeleteUserDialogContent = ({ id = "", closeDialog = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser,getUsers } = useApiContext();

  const handleDeleteUser = (id = "") => {
    const updatedFields: { [key: string]: any } = {};

    updatedFields.isDeleted = true;

    updateUser({
      id: id,
      updatedFields,
      setIsLoading,
      callback: () => {
        getUsers({})
        closeDialog();
      },
    });
  };

  return (
    <div className="crop-avatar-dialog">
      <h2 className="text-2xl text-center mb-5 max-w-[300px] mx-auto">
        Are you sure you want to delete this user?
      </h2>
      <br />
      <br />

      <div className="button-group flex gap-2 justify-end">
        <ButtonDemo
          className=""
          text="Cancel"
          variant="outline"
          type="button"
          onClick={() => {
            closeDialog();
          }}
          disabled={isLoading}
        />
        <ButtonDemo
          className=""
          text={`${isLoading ? "Loading..." : "Submit"}`}
          variant="destructive"
          disabled={isLoading}
          onClick={() => {
            handleDeleteUser(id);
            console.log(id, "here");
          }}
        />
      </div>
    </div>
  );
};
