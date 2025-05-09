"use client";

import React, { useState, useEffect } from "react";
import { ButtonDemo, DialogDemo, DropdownMenuDemo } from "@/components/index";
import { useApiContext } from "@/contexts/ApiContext";
import { useAuthContext } from "@/contexts/AuthContext";

export const DeleteUserDialog = ({ id = "" }) => {
  return (
    <DialogDemo
      contentClassName=""
      trigger={
        <ButtonDemo
          text={`${"Delete Profile"}`}
          color="danger"
          className={`text-sm rounded-full flex`}
          variant="outline"
        />
      }
    >
      {(closeDialog) => <DeleteUserDialogContent id={id} closeDialog={closeDialog} />}
    </DialogDemo>
  );
};

const DeleteUserDialogContent = ({ id = "", closeDialog = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteUser } = useApiContext();
  const { currentUser } = useAuthContext();

  const handleDeleteUser = (id = "") => {
    deleteUser({
      id: id,
      setIsLoading,
      callback: () => {
        if (!currentUser) return alert("Current User is undefined");
        currentUser.delete();
        closeDialog();
      },
    });
  };

  return (
    <div className="crop-avatar-dialog">
      <h2 className="text-2xl text-center mb-5 max-w-[300px] mx-auto">
        Are you sure you want to delete your account?
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
          }}
        />
      </div>
    </div>
  );
};
