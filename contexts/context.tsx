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

const artifactImages = [
  { id: "hero-bb21--a8z9p3l1xq", url: images.tearOfArbonImage },
  { id: "hero-bb21--t1z4rw8nks", url: images.arbreImage },
  { id: "hero-bb21--v9x2pm4qtu", url: images.visageImage },
  { id: "hero-bb21--k3e6dl9bqp", url: images.tueurImage },
  { id: "hero-bb21--j5r0uc7vym", url: images.torqueImage },
  { id: "hero-bb21--b7a1nh3zqx", url: images.sourcesSilenceImage },
  { id: "hero-bb21--f6w8lt2ypk", url: images.sourcelamesImage },
  { id: "hero-bb21--m9e3zk4nwa", url: images.jargentisImage },
  { id: "hero-bb21--y2n7px0wct", url: images.souffleImage },
  { id: "hero-bb21--r4q6dv8bzm", url: images.sermentImage },
  { id: "hero-bb21--z3c5uf9lpx", url: images.orbeImage },
  { id: "hero-bb21--p8m1yr7qke", url: images.phoenixImage },
  { id: "hero-bb21--c0n9sk5tva", url: images.marteauImage },
  { id: "hero-bb21--n6w4tb3uyx", url: images.lanceImage },
  { id: "hero-bb21--x1d7rz9fmc", url: images.lamesImage },
  { id: "hero-bb21--u5k3qt0bwe", url: images.flechesImage },
  { id: "hero-bb21--l8a6pv7mcz", url: images.flammeImage },
  { id: "hero-bb21--h3b0uy9xkt", url: images.crocsImage },
  { id: "hero-bb21--w7d2rm1zvq", url: images.crocImage },
  { id: "hero-bb21--e9x5tl3pwa", url: images.creteImage },
  { id: "hero-bb21--g6v7nk2yjq", url: images.luciaImage },
  { id: "hero-bb21--s2p3qy0cxt", url: images.hurleImage },
  { id: "hero-bb21--a4z8mv9wre", url: images.coeurImage },
  { id: "hero-bb21--d1n6xb5pyt", url: images.bouclierImage },
  { id: "hero-bb21--q0k9wt3zmc", url: images.banniereImage },
  { id: "hero-bb21--o7r4cf2vtx", url: images.armureImage },
  { id: "hero-bb21--i3y5dm0bza", url: images.arcDeViolaImage },
  { id: "hero-bb21--t6n8xu4lpk", url: images.arbaleteImage },
  { id: "hero-bb21--b2e0zr7vqc", url: images.amuletteImage },
  { id: "hero-bb21--b2e0zt9vgc", url: images.batonImage },
  { id: "hero-bb21--b2efsfefef", url: images.thunderImage },
  { id: "hero-bb21--3fwrcttwv3", url: images.femmeImage },
  { id: "hero-bb21--fe3vrt4wfg", url: images.tailledragonImage },
];

const unitImages = [
  { id: "hero-bb21--x7l3zq9vta", url: images.unit1Image },
  { id: "hero-bb21--p1m6ry4cjd", url: images.unit2Image },
  { id: "hero-bb21--u0n9ks8wqe", url: images.unit3Image },
  { id: "hero-bb21--d2f7cv5zlx", url: images.unit4Image },
  { id: "hero-bb21--e8q4mx1vnb", url: images.unit5Image },
  { id: "hero-bb21--a9z3pl7kyd", url: images.unit6Image },
  { id: "hero-bb21--t3k6uw2hxo", url: images.unit7Image },
  { id: "hero-bb21--v6e8rn3yzc", url: images.unit8Image },
  { id: "hero-bb21--n4x1jd9qwb", url: images.unit9Image },
  { id: "hero-bb21--h0l7tp5smk", url: images.unit10Image },
]


type StateType = {
  [key: string]: any;
};

type ContextType = {
  state: StateType;
  setState: (newState: StateType) => void;
  heroImages: any;
  artifactImages: any;
  unitImages: any;
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
        artifactImages,
        unitImages
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
