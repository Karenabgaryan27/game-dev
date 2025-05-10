"use client";

import React, { useState, useEffect } from "react";
import { ButtonDemo, DialogDemo, InputDemo } from "@/components/index";
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
};

const SetupUserDialogContent = ({
  user = {},
  closeDialog = () => {},
}: {
  user: any;
  closeDialog: () => void;
}) => {
  const { updateUser, getUsers,getCurrentUser } = useApiContext();
  const {currentUser} = useAuthContext()

  const [state, setState] = useState<StateProps>({
    rank: "",
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

    updateUser({
      id: user.id,
      updatedFields,
      setIsLoading,
      callback: () => {
        closeDialog();
        getUsers({  });
        getCurrentUser({ id: currentUser?.uid });
      },
    });
  };

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      rank: user.rank,
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

        <div className="button-group flex gap-2 justify-end">
          <ButtonDemo className="" text="Cancel" variant="outline" type="button" onClick={closeDialog} />
          <ButtonDemo className="" text={`${isLoading ? "Loading..." : "Save"}`} />
        </div>
      </form>
    </div>
  );
};
