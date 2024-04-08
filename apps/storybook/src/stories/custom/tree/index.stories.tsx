import type { Meta, StoryObj } from "@storybook/react";

import { TreeProvider } from "@acme/ui/components";

import { AddItem, Provider, TreeItems } from "./_components";
import { folderSystemItems, groupFolderItems } from "./utils";

const meta = {
  title: "custom/Tree",
  component: TreeProvider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof TreeProvider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Sidebar: Story = {
  args: {
    className: "w-80 bg-neutral-200 p-4 rounded-sm",
    initialItems: [],
    children: (
      <div>
        <AddItem />
        <TreeItems showEmptyChild />
      </div>
    ),
  },
};

export const FolderSystem: Story = {
  args: {
    className: "w-80 bg-neutral-200 p-4 rounded-sm",
    children: <TreeItems title="React App" showEmptyChild={false} />,
    initialItems: folderSystemItems,
  },
};

export const GroupFolders: Story = {
  args: {
    groups: ["main", "config"],
    className: "w-80 bg-neutral-200 p-4 rounded-sm",
    initialItems: groupFolderItems,
    children: (
      <div>
        <AddItem group="main" />
        <TreeItems group="main" title="System" showEmptyChild={false} />
        <TreeItems group="config" title="Config" showEmptyChild={false} />
      </div>
    ),
  },
};

export const WithSWR: Story = {
  args: {
    className: "w-80 bg-neutral-200 p-4 rounded-sm",
    initialItems: [],
    children: <TreeItems showEmptyChild />,
  },
  render: (props) => <Provider {...props} />,
};
