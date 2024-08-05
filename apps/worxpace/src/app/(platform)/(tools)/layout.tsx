"use client";

import { type PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import DocsProvider from "./_components/docs-provider";

const ToolsLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  if (!isSignedIn) router.push("/select-role");

  return <DocsProvider>{children}</DocsProvider>;
};

export default ToolsLayout;
