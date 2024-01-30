import { type PropsWithChildren } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "~/lib";
import DocsProvider from "./_components/docs-provider";

const ToolsLayout = ({ children }: PropsWithChildren) => {
  if (!isAuthenticated()) redirect("/select-role");

  return <DocsProvider>{children}</DocsProvider>;
};

export default ToolsLayout;
