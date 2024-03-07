import type { Meta, StoryObj } from "@storybook/react";

import type { TreeItem } from "@acme/ui/components";
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
    className: "w-80 bg-neutral-200 p-4 rounded-sm",
    fetchItems: async () => {
      const items = [] as TreeItem[];
      await delay(3000);
      return { data: items };
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
    className: "w-80 bg-neutral-200 p-4 rounded-sm",
    children: <TreeItems title="React App" showEmptyChild={false} />,
    fetchItems: async () => {
      await delay(2000);
      return { data: folderSystemItems };
    },
  },
};

export const GroupFolders: Story = {
  args: {
    groups: ["main", "config"],
    className: "w-80 bg-neutral-200 p-4 rounded-sm",
    fetchItems: async () => {
      await delay(2000);
      return { data: groupFolderItems };
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
