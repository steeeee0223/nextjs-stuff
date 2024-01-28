import { type PropsWithChildren } from "react";
import { redirect } from "next/navigation";

import { TreeProvider } from "@acme/ui/components";

import { fetchClient, fetchDocuments, isAuthenticated } from "~/lib";
import { Sidebar } from "./_components/sidebar";

const ToolsLayout = ({ children }: PropsWithChildren) => {
  if (!isAuthenticated()) redirect("/select-role");

  const fetchItems = async () => {
    "use server";
    try {
      const { userId, orgId } = fetchClient();
      const documents = await fetchDocuments(userId, orgId);
      console.log(`docs:`, documents);
      const data = documents.map(({ id, title, parentId, isArchived }) => ({
        id,
        title,
        parentId,
        isArchived,
      }));
      return { data };
    } catch {
      return { error: `Error occurred while fetching documents` };
    }
  };

  return (
    <TreeProvider
      className="flex h-full dark:bg-[#1F1F1F]"
      fetchItems={fetchItems}
    >
      <Sidebar />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </TreeProvider>
  );
};

export default ToolsLayout;
