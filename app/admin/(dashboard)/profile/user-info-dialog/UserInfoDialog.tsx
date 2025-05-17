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
  mainUnitType: string;
  unitLevel: string;
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
    mainUnitType: "",
    unitLevel: "",
    power: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const { fetchedPages, fetchedCurrentUser, updateUser, getUser } = useApiContext();
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
    if (state.mainUnitType !== details.mainUnitType) {
      updatedFields.mainUnitType = state.mainUnitType;
    }
    if (state.unitLevel !== details.unitLevel) {
      updatedFields.unitLevel = state.unitLevel;
    }
    if (state.power !== details.power) {
      updatedFields.power = state.power;
    }

    console.log(updatedFields, ' kkkk')

    updateUser({
      id: currentUser?.uid,
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
      inGameName: details.displayName,
      inGameID: details.inGameID,
      country: details.country,
      languages: details.languages,
      faction: details.faction,
      gameTime: details.gameTime,
      mainUnitType: details.mainUnitType,
      unitLevel: details.unitLevel,
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
            placeholder="e.g., John Doe"
            name="inGameID"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            value={state.inGameID}
          />
          <InputDemo
            label="Country"
            placeholder="e.g., United States"
            name="country"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            value={state.country}
          />
          <InputDemo
            label="Languages"
            placeholder="e.g., English, Spanish"
            name="languages"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            value={state.languages}
          />

          <InputDemo
            label="Faction"
            placeholder="e.g., League of Order"
            name="faction"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            value={state.faction}
          />
          <InputDemo
            label="Game Time"
            placeholder="e.g., 13:00 – 17:00 UTC"
            name="gameTime"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            value={state.gameTime}
          />
          <InputDemo
            label="main Unit Type"
            placeholder="e.g., Archer"
            name="mainUnitType"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            value={state.mainUnitType}
          />
          <InputDemo
            label="unit Level"
            placeholder="e.g., T4"
            name="unitLevel"
            type="text"
            callback={(e) => onChange(e)}
            className="mb-5"
            value={state.unitLevel}
          />
          <InputDemo
            label="Power"
            placeholder="e.g., 10M"
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
