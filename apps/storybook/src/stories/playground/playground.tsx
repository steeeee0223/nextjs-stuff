import { lazy, Suspense, useState } from "react";

import { WorkspaceProvider } from "@swy/notion";
import { documents, GROUPS, user, workspaces } from "@swy/notion/mock";
import { ModalProvider, TreeProvider } from "@swy/ui/shared";

import { LayoutWithLiveblocks } from "../notion/workspace-provider/_components";

const Editor = lazy(() => import("@swy/blocknote/collab"));

export const NotionWorkspace = () => {
  const [pageId, setPageId] = useState("#");
  const [content, setContent] = useState<string>();

  return (
    <WorkspaceProvider
      user={user}
      workspaces={workspaces}
      initial="workspace-0"
      className="h-full"
    >
      <ModalProvider>
        <TreeProvider
          className="flex h-screen bg-main"
          groups={GROUPS}
          initialItems={documents}
          onClickItem={setPageId}
          isItemActive={(id) => id === pageId}
        >
          <LayoutWithLiveblocks pageId={pageId}>
            <Suspense fallback={<div>Loading...</div>}>
              <Editor
                id={pageId}
                editable
                initialContent={content}
                onChange={setContent}
              />
            </Suspense>
          </LayoutWithLiveblocks>
        </TreeProvider>
      </ModalProvider>
    </WorkspaceProvider>
  );
};
