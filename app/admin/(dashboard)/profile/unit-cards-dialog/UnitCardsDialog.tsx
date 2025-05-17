"use client";

import React, { useState, useEffect } from "react";
import {
  Separator,
  ButtonDemo,
  DialogDemo,
} from "@/components/index";
import {  Pencil,  } from "lucide-react";
import { useApiContext } from "@/contexts/ApiContext";
import NestedDialogEdit from "./nested-dialog-edit/NestedDialogEdit";
import NestedDialogCreate from "./nested-dialog-create/NestedDialogCreate";


const UnitCardsDialog = () => {
  return (
    <DialogDemo
      contentClassName="sm:max-w-[600px]"
      title="Unit cards"
      description="Manage your cards."
      trigger={
        <ButtonDemo startIcon={<Pencil />} className="rounded-full w-[35px] h-[35px]" variant="ghost" />
      }
    >
      {(closeDialog) => <UnitCardsDialogContent closeDialog={closeDialog} />}
    </DialogDemo>
  );
};

const UnitCardsDialogContent = ({ closeDialog = () => {} }) => {
  const [units, setUnits] = useState([]);
  const [featuredUnits, setFeaturedUnits] = useState([]);

  const {  fetchedCurrentUser } = useApiContext();
  const { details } = fetchedCurrentUser;


  useEffect(() => {
    if (!details.units) return;
    setUnits(details.units);

    const preFeaturedUnits = details.units.filter((item: any) => item.isFeatured && item);
    setFeaturedUnits(preFeaturedUnits);
  }, [details.units]);

  return (
    <div className="unit-cards-dialog">
      <Separator title="Featured Units" className="mb-6" titleClassName="bg-white" />
      <div className="card-group nested-unit-card-group grid grid-cols-[repeat(auto-fill,_minmax(80px,_1fr))] justify-center gap-[10px] mb-[50px]">
        {featuredUnits.length ? (
          featuredUnits.map((item: any, index) => {
            return <NestedDialogEdit item={item} key={index} />;
          })
        ) : (
          <NestedDialogEdit />
        )}
      </div>

      <Separator title="All Units" className="mb-6 " titleClassName="bg-white" />
      <div className="card-group nested-unit-card-group grid grid-cols-[repeat(auto-fill,_minmax(80px,_1fr))] justify-center gap-[10px]">
        {units.length ? (
          units.map((item: any, index) => {
            return <NestedDialogEdit item={item} key={index} />;
          })
        ) : (
          <NestedDialogEdit />
        )}
        <NestedDialogCreate />
      </div>
      <br />
      <br />

      <div className="button-group flex gap-2 justify-end">
        <ButtonDemo className="" text="Close" variant="outline" type="button" onClick={closeDialog} />
      </div>
    </div>
  );
};

export default UnitCardsDialog;
