"use client";

import React, { useState, useEffect } from "react";
import { ButtonDemo, DialogDemo, InputDemo, SelectScrollable } from "@/components/index";
import { useAuthContext } from "@/contexts/AuthContext";
import { useApiContext } from "@/contexts/ApiContext";

export const SetupUserDialog = ({ user = {} }) => {
  return (
    <DialogDemo contentClassName="" trigger={<div>{`${"Edit Settings"}`}</div>}>
      {(closeDialog) => <SetupUserDialogContent user={user} closeDialog={closeDialog} />}
    </DialogDemo>
  );
};

type StateProps = {
  rank: string;
  role: string;
};

const SetupUserDialogContent = ({
  user = {},
  closeDialog = () => {},
}: {
  user: any;
  closeDialog: () => void;
}) => {
  const { updateUser, getUser } = useApiContext();
  const { currentUser } = useAuthContext();

  const [state, setState] = useState<StateProps>({
    rank: "",
    role: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFields: { [key: string]: any } = {};

    if (state.rank !== user.rank) {
      updatedFields.rank = state.rank;
    }
    if (state.role !== user.role) {
      updatedFields.role = state.role;
    }

    updateUser({
      id: user.id,
      updatedFields,
      setIsLoading,
      callback: () => {
        closeDialog();
        getUser({ id: currentUser?.uid });
      },
    });
  };

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      rank: user.rank,
      role: user.role,
    }));
  }, [user]);

  return (
    <div className="crop-avatar-dialog">
      <h2 className="text-2xl text-center mb-5">Change user settings</h2>
      <form onSubmit={onSubmit} className={`${""}`}>
        <InputDemo
          label="Rank"
          placeholder="Rank"
          name="rank"
          type="text"
          callback={(e) => onChange(e)}
          className="mb-5"
          value={state.rank}
        />
        {currentUser?.uid !== user.id && (
          <SelectScrollable
            label="Role"
            triggerClassName="w-full mb-5"
            contentClassName=""
            defaultItems={["user", "admin"].map((type) => {
              return {
                label: type,
                value: type,
                isSelected: user.role == type,
              };
            })}
            callback={(selectedItem) => {
              setState((prev) => ({
                ...prev,
                role: selectedItem.value.toString(),
              }));
            }}
          />
        )}

        <div className="button-group flex gap-2 justify-end">
          <ButtonDemo className="" text="Cancel" variant="outline" type="button" onClick={closeDialog} />
          <ButtonDemo className="" text={`${isLoading ? "Loading..." : "Save"}`} />
        </div>
      </form>
    </div>
  );
};
