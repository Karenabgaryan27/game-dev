"use client";

import React, { useState, useEffect } from "react";
import { Separator, ButtonDemo, DialogDemo } from "@/components/index";
import { Pencil } from "lucide-react";
import { useApiContext } from "@/contexts/ApiContext";
import NestedDialogEdit from "./nested-dialog-edit/NestedDialogEdit";
import NestedDialogCreate from "./nested-dialog-create/NestedDialogCreate";

const HeroCardsDialog = () => {
  return (
    <DialogDemo
      contentClassName="sm:max-w-[600px]"
      title="Hero cards"
      description="Manage your cards."
      trigger={
        <ButtonDemo startIcon={<Pencil />} className="rounded-full w-[35px] h-[35px]" variant="ghost" />
      }
    >
      {(closeDialog) => <HeroCardsDialogContent closeDialog={closeDialog} />}
    </DialogDemo>
  );
};

const HeroCardsDialogContent = ({ closeDialog = () => {} }) => {
  const [heroes, setHeroes] = useState([]);
  const [featuredHeroes, setFeaturedHeroes] = useState([]);

  const { fetchedCurrentUser } = useApiContext();
  const { details } = fetchedCurrentUser;

  useEffect(() => {
    if (!details.heroes) return;
    setHeroes(details.heroes);

    const preFeaturedHeroes = details.heroes.filter((item: any) => item.isFeatured && item);
    setFeaturedHeroes(preFeaturedHeroes);
  }, [details.heroes]);

  return (
    <div className="hero-cards-dialog">
      <Separator title="Featured Heroes" className="mb-6" titleClassName="bg-white" />
      <div className="card-group nested-hero-card-group grid grid-cols-[repeat(auto-fill,_minmax(80px,_1fr))] justify-center gap-[10px] mb-[50px]">
        {featuredHeroes.length ? (
          featuredHeroes.map((item: any, index) => {
            return <NestedDialogEdit item={item} key={index} />;
          })
        ) : (
          <NestedDialogEdit />
        )}
      </div>

      <Separator title="All Heroes" className="mb-6 " titleClassName="bg-white" />
      <div className="card-group nested-hero-card-group grid grid-cols-[repeat(auto-fill,_minmax(80px,_1fr))] justify-center gap-[10px]">
        {heroes.length ? (
          heroes.map((item: any, index) => {
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

export default HeroCardsDialog;
