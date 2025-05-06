"use client";

import React, { useState, createContext, useContext } from "react";
import localData from "@/localData";

const { images } = localData;

const heroImages = [
  { id: "hero-bb21--0e1f1e1cb001", url: images.MadelineImage },
  { id: "hero-bb21--0e1f1e1cb002", url: images.GoreshImage },
  { id: "hero-bb21--0e1f1e1cb003", url: images.SkogulImage },
  { id: "hero-bb21--0e1f1e1cb004", url: images.SyndrionImage },
  { id: "hero-bb21--0e1f1e1cb005", url: images.FfraegarImage },
  { id: "hero-bb21--0e1f1e1cb006", url: images.WaldyrImage },
  { id: "hero-bb21--0e1f1e1cb007", url: images.VelynImage },
  { id: "hero-bb21--0e1f1e1cb008", url: images.TheodoreImage },
  { id: "hero-bb21--0e1f1e1cb056", url: images.ForondilImage },
  { id: "hero-bb21--0e1f1e1cb009", url: images.TheiaImage },
  { id: "hero-bb21--0e1f1e1cb010", url: images.PanImage },
  { id: "hero-bb21--0e1f1e1cb011", url: images.OrdoImage },
  { id: "hero-bb21--0e1f1e1cb012", url: images.NikaImage },
  { id: "hero-bb21--0e1f1e1cb013", url: images.NicoImage },
  { id: "hero-bb21--0e1f1e1cb014", url: images.LiliyaImage },
  { id: "hero-bb21--0e1f1e1cb015", url: images.KreggImage },
  { id: "hero-bb21--0e1f1e1cb016", url: images.KinnaraImage },
  { id: "hero-bb21--0e1f1e1cb017", url: images.KellaImage },
  { id: "hero-bb21--0e1f1e1cb018", url: images.IndisImage },
  { id: "hero-bb21--0e1f1e1cb019", url: images.HoskImage },
  { id: "hero-bb21--0e1f1e1cb020", url: images.GarwoodImage },
  { id: "hero-bb21--0e1f1e1cb021", url: images.EmrysImage },
  { id: "hero-bb21--0e1f1e1cb022", url: images.ElianaImage },
  { id: "hero-bb21--0e1f1e1cb023", url: images.BakshiImage },
  { id: "hero-bb21--0e1f1e1cb024", url: images.BakharImage },
  { id: "hero-bb21--0e1f1e1cb025", url: images.AtheusImage },
  { id: "hero-bb21--0e1f1e1cb026", url: images.AlwynImage },
  { id: "hero-bb21--0e1f1e1cb027", url: images.AlistairImage },
  { id: "hero-bb21--0e1f1e1cb028", url: images.ChakchaImage },
  { id: "hero-bb21--0e1f1e1cb029", url: images.ThundelynImage },
  { id: "hero-bb21--0e1f1e1cb030", url: images.ThaleiaImage },
  { id: "hero-bb21--0e1f1e1cb036", url: images.FalgrimImage },
  { id: "hero-bb21--0e1f1e1cb031", url: images.SibylImage },
  { id: "hero-bb21--0e1f1e1cb032", url: images.HsiangImage },
  { id: "hero-bb21--0e1f1e1cb034", url: images.BahornImage },
  { id: "hero-bb21--0e1f1e1cb033", url: images.BertrandImage },
  { id: "hero-bb21--0e1f1e1cb094", url: images.ToharImage },
  { id: "hero-bb21--0e1f1e1cb035", url: images.DanfelImage },
  { id: "hero-bb21--0e1f1e1cb039", url: images.MogroImage },
  { id: "hero-bb21--0e1f1e1cb037", url: images.MaggratImage },
  { id: "hero-bb21--0e1f1e1cb038", url: images.ZaydaImage },
  { id: "hero-bb21--0e1f1e1cb040", url: images.TobinImage },
  { id: "hero-bb21--0e1fb0343423", url: images.UragImage },

];

type StateType = {
  [key: string]: any;
};

type ContextType = {
  state: StateType;
  setState: (newState: StateType) => void;
  heroImages: any;
};

export const Context = createContext<ContextType | null>(null);

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [state, setState] = useState<StateType>({});

  return (
    <Context.Provider
      value={{
        state,
        ...state,
        setState,
        heroImages,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useGlobalContext must be used within an Provider");
  }
  return context;
};
