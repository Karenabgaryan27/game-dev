import React from "react";
import type { Metadata } from "next";
import Content from "./Content";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page description",
};

export default function Home() {
  return <Content />;
}
