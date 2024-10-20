import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { CollaborativeEditor } from "@swy/liveblocks";
import { ModalProvider, TreeProvider } from "@swy/ui/custom";
import { WorkspaceProvider } from "@swy/ui/notion";

import {
  documents,
  GROUPS,
  liveblocksAuth,
  user,
  workspaces,
} from "@/stories/notion/__mock__";
import { LayoutWithLiveblocks } from "@/stories/notion/workspace-provider/_components";

const meta = {
  title: "Playground",
  parameters: {
    layout: "fullscreen",
    msw: { handlers: [liveblocksAuth] },
  },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story["render"] = () => {
  const [pageId, setPageId] = useState("#");
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
            <CollaborativeEditor />
          </LayoutWithLiveblocks>
        </TreeProvider>
      </ModalProvider>
    </WorkspaceProvider>
  );
};

export const Playground: Story = {
  render: Template,
};
