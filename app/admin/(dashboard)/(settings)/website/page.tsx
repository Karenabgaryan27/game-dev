"use client";

import React from "react";
import { BreadcrumbDemo, TableDemo } from "@/components/index";
import { Card, CardHeader } from "@/components/ui/card";

const breadcrumbItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    label: "Website",
  },
];

const sections = [
  {
    invoice: "1",
    name: "Header",
    href: "/admin/website/header",
  },

  {
    invoice: "3",
    name: "Features",
    href: "/admin/website/features",
  },
  {
    invoice: "4",
    name: "Contact",
    href: "/admin/website/contact",
  },
  {
    invoice: "5",
    name: "Footer",
    href: "/admin/website/footer",
    isDisabled: true,
  },
];

const Pages = () => {
  return (
    <main className="pages-page py-5 px-10">
      <h2 className="text-2xl mb-3">Pages</h2>
      <BreadcrumbDemo items={breadcrumbItems} />
      <br />
      <br />
      <br />
      <Card className="mb-[300px] min-h-[500px] relative">
        <CardHeader>
          <div className="bg-image" style={{backgroundImage: 'url("/assets/images/rest/soldier.png")'}}></div>
          <h2 className="text-1xl font-bold mb-3">Home Page</h2>
          <TableDemo invoices={sections} />
        </CardHeader>
      </Card>
    </main>
  );
};

export default Pages;
