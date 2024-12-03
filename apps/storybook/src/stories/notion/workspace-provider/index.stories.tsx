import type { Meta, StoryObj } from "@storybook/react";

import { WorkspaceProvider, WorkspaceSwitcher } from "@swy/notion";
import { user, workspaces } from "@swy/notion/mock";
import { ModalProvider } from "@swy/ui/shared";

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

export const WorkspaceLayout: Story = {
  args: {
    user,
    workspaces,
    initial: "workspace-0",
    className: "h-full",
    children: <div className="p-[54px]">Hi!</div>,
  },
  parameters: { layout: "fullscreen" },
  render: ({ children, ...props }) => {
    return (
      <WorkspaceProvider {...props}>
        <ModalProvider>
          <div className="flex h-screen bg-main">
            <BaseLayout>{children}</BaseLayout>
          </div>
        </ModalProvider>
      </WorkspaceProvider>
    );
  },
};
