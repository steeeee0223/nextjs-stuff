import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { CollaborativeEditor } from "@swy/liveblocks";
import { WorkspaceProvider } from "@swy/notion";
import { documents, GROUPS, user, workspaces } from "@swy/notion/mock";
import { ModalProvider, TreeProvider } from "@swy/ui/shared";

import { liveblocksAuth } from "@/stories/notion/__mock__";
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
