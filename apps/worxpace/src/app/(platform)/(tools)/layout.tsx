import { type PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { Sidebar } from "./_components/sidebar";

const ToolsLayout = ({ children }: PropsWithChildren) => {
  const { userId } = auth();
  if (!userId) redirect("/select-role");

  return (
    <div className="flex h-full dark:bg-[#1F1F1F]">
      <Sidebar />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default ToolsLayout;
