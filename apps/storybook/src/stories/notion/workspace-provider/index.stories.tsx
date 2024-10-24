import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { WorkspaceProvider, WorkspaceSwitcher } from "@swy/notion";
import { documents, GROUPS, user, workspaces } from "@swy/notion/mock";
import { ModalProvider, TreeProvider } from "@swy/ui/shared";

import { BaseLayout } from "./_components";

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

const Template: Story["render"] = ({ children, ...props }) => {
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
  render: Template,
  parameters: { layout: "fullscreen" },
};
