import type { Meta, StoryObj } from "@storybook/react";

import { TreeProvider } from "@swy/ui/shared";

import { AddItem, Provider, TreeItems } from "./_components";
import { folderSystemItems, groupFolderItems } from "./utils";

const meta = {
  title: "shared/Tree",
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
        <TreeItems />
      </div>
    ),
  },
};

export const FolderSystem: Story = {
  args: {
    className: "w-80 bg-neutral-200 p-4 rounded-sm",
    children: <TreeItems title="React App" />,
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
        <TreeItems group="main" title="System" />
        <TreeItems group="config" title="Config" />
      </div>
    ),
  },
};

export const WithSWR: Story = {
  args: {
    className: "w-80 bg-neutral-200 p-4 rounded-sm",
    initialItems: [],
    children: <TreeItems />,
  },
  render: (props) => <Provider {...props} />,
};
