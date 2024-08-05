"use client";

import { type PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import DocsProvider from "./_components/docs-provider";

const ToolsLayout = ({ children }: PropsWithChildren) => {
  const { userId } = useAuth();
  if (!userId) redirect("/select-role");

  return <DocsProvider>{children}</DocsProvider>;
};

export default ToolsLayout;
