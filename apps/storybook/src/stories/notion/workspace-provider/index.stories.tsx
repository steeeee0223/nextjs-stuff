import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { CollaborativeEditor } from "@swy/liveblocks";
import { ModalProvider, TreeProvider } from "@swy/ui/custom";
import { WorkspaceProvider, WorkspaceSwitcher } from "@swy/ui/notion";

import {
  documents,
  GROUPS,
  liveblocksAuth,
  user,
  workspaces,
} from "../__mock__";
import { BaseLayout, LayoutWithLiveblocks } from "./_components";

const meta = {
  title: "notion/Workspace",
  component: WorkspaceProvider,
} satisfies Meta<typeof WorkspaceProvider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Swticher: Story = {
  args: {
    user,
    workspaces,
    initial: "workspace-0",
    className: "h-full",
    children: <WorkspaceSwitcher />,
  },
  parameters: { layout: "centered" },
};

const BaseTemplate: Story["render"] = ({ children, ...props }) => {
  const [pageId, setPageId] = useState("#");
  return (
    <WorkspaceProvider {...props}>
      <ModalProvider>
        <TreeProvider
          className="flex h-screen bg-main"
          groups={GROUPS}
          initialItems={documents}
          onClickItem={setPageId}
          isItemActive={(id) => id === pageId}
        >
          <BaseLayout pageId={pageId}>{children}</BaseLayout>
        </TreeProvider>
      </ModalProvider>
    </WorkspaceProvider>
  );
};

export const WorkspaceLayout: Story = {
  args: {
    user,
    workspaces,
    initial: "workspace-0",
    className: "h-full",
    children: <div className="p-[54px]">Hi!</div>,
  },
  render: BaseTemplate,
  parameters: { layout: "fullscreen" },
};

const LiveblocksTemplate: Story["render"] = ({ children, ...props }) => {
  const [pageId, setPageId] = useState("#");
  return (
    <WorkspaceProvider {...props}>
      <ModalProvider>
        <TreeProvider
          className="flex h-screen bg-main"
          groups={GROUPS}
          initialItems={documents}
          onClickItem={setPageId}
          isItemActive={(id) => id === pageId}
        >
          <LayoutWithLiveblocks pageId={pageId}>
            {children}
          </LayoutWithLiveblocks>
        </TreeProvider>
      </ModalProvider>
    </WorkspaceProvider>
  );
};

export const WithLiveblocks: Story = {
  args: {
    user,
    workspaces,
    initial: "workspace-0",
    className: "h-full",
    children: <CollaborativeEditor />,
  },
  render: LiveblocksTemplate,
  parameters: {
    layout: "fullscreen",
    msw: { handlers: [liveblocksAuth] },
  },
};
