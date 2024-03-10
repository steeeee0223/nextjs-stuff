import type { Meta, StoryObj } from "@storybook/react";

import { TreeProvider } from "@acme/ui/components";

import { AddItem, TreeItems } from "./_components";
import { delay, folderSystemItems, groupFolderItems } from "./utils";

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
    queryKey: "sidebar",
    className: "w-80 bg-neutral-200 p-4 rounded-sm",
    fetchItems: async () => {
      await delay(3000);
      return [];
    },
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
    queryKey: "folders",
    className: "w-80 bg-neutral-200 p-4 rounded-sm",
    children: <TreeItems title="React App" showEmptyChild={false} />,
    fetchItems: async () => {
      await delay(2000);
      return folderSystemItems;
    },
  },
};

export const GroupFolders: Story = {
  args: {
    queryKey: "groups",
    groups: ["main", "config"],
    className: "w-80 bg-neutral-200 p-4 rounded-sm",
    fetchItems: async () => {
      await delay(2000);
      return groupFolderItems;
    },
    children: (
      <div>
        <AddItem group="main" />
        <TreeItems group="main" title="System" showEmptyChild={false} />
        <TreeItems group="config" title="Config" showEmptyChild={false} />
      </div>
    ),
  },
};
