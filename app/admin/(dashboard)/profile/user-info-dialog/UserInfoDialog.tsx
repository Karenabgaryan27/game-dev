"use client";

import React, { useState, useEffect } from "react";
import {
  BreadcrumbDemo,
  Separator,
  HeroCard,
  CustomParallaxCard,
  ButtonDemo,
  DialogDemo,
  InputDemo,
} from "@/components/index";
import localData from "@/localData";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Settings, Pencil, Expand } from "lucide-react";
import { useApiContext } from "@/contexts/ApiContext";
import { useAuthContext } from "@/contexts/AuthContext";

type StateProps = {
  inGameID: string;
  country: string;
  languages: string;
  faction: string;
  gameTime: string;
  mainTroopType: string;
  troopLevel: string;
  power: string;
};

const UserInfoDialog = () => {
  return (
    <DialogDemo
      contentClassName="sm:max-w-[600px]"
      title="User information"
      description="Manage your personal data."
      trigger={
        <ButtonDemo startIcon={<Pencil />} className="rounded-full w-[35px] h-[35px]" variant="ghost" />
      }
    >
      {(closeDialog) => <UserInfoDialogContent closeDialog={closeDialog} />}
    </DialogDemo>
  );
};

const UserInfoDialogContent = ({ closeDialog = () => {} }) => {
  const [state, setState] = useState<StateProps>({
    inGameID: "",
    country: "",
    languages: "",
    faction: "",
    gameTime: "",
    mainTroopType: "",
    troopLevel: "",
    power: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const { fetchedPages, fetchedCurrentUser, updateUser, getCurrentUser } = useApiContext();
  const { currentUser } = useAuthContext();
  const { details } = fetchedCurrentUser;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFields: { [key: string]: any } = {};

    if (state.inGameID !== details.inGameID) {
      updatedFields.inGameID = state.inGameID;
    }
    if (state.country !== details.country) {
      updatedFields.country = state.country;
    }
    if (state.languages !== details.languages) {
      updatedFields.languages = state.languages;
    }

    if (state.faction !== details.faction) {
      updatedFields.faction = state.faction;
    }
    if (state.gameTime !== details.gameTime) {
      updatedFields.gameTime = state.gameTime;
    }
    if (state.mainTroopType !== details.mainTroopType) {
      updatedFields.mainTroopType = state.mainTroopType;
    }
    if (state.troopLevel !== details.troopLevel) {
      updatedFields.troopLevel = state.troopLevel;
    }
    if (state.power !== details.power) {
      updatedFields.power = state.power;
    }

    updateUser({
      id: currentUser?.uid,
      updatedFields,
      setIsLoading,
      callback: () => {
        closeDialog();
        getCurrentUser({ id: currentUser?.uid });
      },
    });
  };

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      inGameName: details.displayName,
      inGameID: details.inGameID,
      country: details.country,
      languages: details.languages,
      faction: details.faction,
      gameTime: details.gameTime,
      mainTroopType: details.mainTroopType,
      troopLevel: details.troopLevel,
      power: details.power,
    }));
  }, [fetchedCurrentUser]);

  return (
    <div>
      <br />
      <form action="" onSubmit={onSubmit} className="">
        <div className="wrapper grid grid-cols-1 sm:grid-cols-2 gap-x-7  mb-3">
   
          <InputDemo
            label="In-Game ID"
            placeholder="In-Game ID"
            name="inGameID"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            value={state.inGameID}
          />
          <InputDemo
            label="Country"
            placeholder="Country"
            name="country"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            value={state.country}
          />
          <InputDemo
            label="Languages"
            placeholder="Languages"
            name="languages"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            value={state.languages}
          />

          <InputDemo
            label="Faction"
            placeholder="Faction"
            name="faction"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            value={state.faction}
          />
          <InputDemo
            label="Game Time"
            placeholder="Game Time"
            name="gameTime"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            value={state.gameTime}
          />
          <InputDemo
            label="main Troop Type"
            placeholder="main Troop Type"
            name="mainTroopType"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            value={state.mainTroopType}
          />
          <InputDemo
            label="troop Level"
            placeholder="troop Level"
            name="troopLevel"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            value={state.troopLevel}
          />
          <InputDemo
            label="Power"
            placeholder="Power"
            name="power"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            value={state.power}
          />
        </div>

        <div className="button-group flex gap-2 justify-end">
          <ButtonDemo className="" text="Cancel" variant="outline" type='button' onClick={closeDialog}/>
          <ButtonDemo className="" text={`${isLoading ? "Loading..." : "Save"}`} />
        </div>
      </form>
    </div>
  );
};

export default UserInfoDialog;
