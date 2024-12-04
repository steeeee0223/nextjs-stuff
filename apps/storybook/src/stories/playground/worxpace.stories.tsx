import type { Meta, StoryObj } from "@storybook/react";

import { CollaborativeEditor } from "@swy/liveblocks";
import { WorkspaceProvider } from "@swy/notion";
import { user, workspaces } from "@swy/notion/mock";
import { ModalProvider } from "@swy/ui/shared";

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

export const Playground: Story = {
  render: () => (
    <WorkspaceProvider
      user={user}
      workspaces={workspaces}
      initial="workspace-0"
      className="h-full"
    >
      <ModalProvider>
        <div className="flex h-screen bg-main">
          <LayoutWithLiveblocks>
            <CollaborativeEditor />
          </LayoutWithLiveblocks>
        </div>
      </ModalProvider>
    </WorkspaceProvider>
  ),
};
