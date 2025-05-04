import React from "react";
import { BreadcrumbDemo } from "@/components/index";
import Content from "./Content";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  // if (Number(slug) > 3) notFound();

  const breadcrumbItems = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/admin/website",
      label: "Website",
    },
    {
      label: `${slug} Section`,
    },
  ];

  return (
    <main className="about-section-page py-5 px-10">
      <h2 className="text-2xl mb-3 capitalize">{slug} section</h2>
      <BreadcrumbDemo items={breadcrumbItems} />
      <br />
      <br />
      <br />
      <Content slug={slug} />
    </main>
  );
};

export default page;
