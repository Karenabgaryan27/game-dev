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


const ArtifactCardsDialog = () => {
  return (
    <DialogDemo
      contentClassName="sm:max-w-[600px]"
      title="Artifact cards"
      description="Manage your cards."
      trigger={
        <ButtonDemo startIcon={<Pencil />} className="rounded-full w-[35px] h-[35px]" variant="ghost" />
      }
    >
      {(closeDialog) => <ArtifactCardsDialogContent closeDialog={closeDialog} />}
    </DialogDemo>
  );
};

const ArtifactCardsDialogContent = ({ closeDialog = () => {} }) => {
  const [artifacts, setArtifacts] = useState([]);
  const [featuredArtifacts, setFeaturedArtifacts] = useState([]);

  const {  fetchedCurrentUser } = useApiContext();
  const { details } = fetchedCurrentUser;


  useEffect(() => {
    if (!details.artifacts) return;
    setArtifacts(details.artifacts);

    const preFeaturedArtifacts = details.artifacts.filter((item: any) => item.isFeatured && item);
    setFeaturedArtifacts(preFeaturedArtifacts);
  }, [details.artifacts]);

  return (
    <div className="artifact-cards-dialog">
      <Separator title="Featured Artifacts" className="mb-6" titleClassName="bg-white" />
      <div className="card-group nested-artifact-card-group grid grid-cols-[repeat(auto-fill,_minmax(80px,_1fr))] justify-center gap-[10px] mb-[50px]">
        {featuredArtifacts.length ? (
          featuredArtifacts.map((item: any, index) => {
            return <NestedDialogEdit item={item} key={index} />;
          })
        ) : (
          <NestedDialogEdit />
        )}
      </div>

      <Separator title="All Artifacts" className="mb-6 " titleClassName="bg-white" />
      <div className="card-group nested-artifact-card-group grid grid-cols-[repeat(auto-fill,_minmax(80px,_1fr))] justify-center gap-[10px]">
        {artifacts.length ? (
          artifacts.map((item: any, index) => {
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

export default ArtifactCardsDialog;
