import type { Meta, StoryObj } from "@storybook/react";
import { FolderIcon } from "lucide-react";

import type { TreeItem } from "@acme/ui/components";
import { TreeProvider } from "@acme/ui/components";

import { AddItem, TreeItems } from "./_components";
import { createItem, delay } from "./utils";

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
        <TreeItems />
      </div>
    ),
  },
};

export const FolderSystem: Story = {
  args: {
    className: "w-80 bg-neutral-200 p-4 rounded-sm",
    children: <TreeItems />,
    fetchItems: async () => {
      const items: TreeItem[] = [
        createItem("test-id-1", "app", undefined, FolderIcon),
        createItem("test-id-2", "page.tsx", "test-id-1"),
        createItem("test-id-3", "layout.tsx", "test-id-1"),
        createItem("test-id-4", "globals.css", "test-id-1"),
        createItem("test-id-5", "docs", "test-id-1", FolderIcon),
        createItem("test-id-6", "page.tsx", "test-id-5"),
        createItem("test-id-7", "package.json", undefined),
        createItem("test-id-8", "tsconfig.json", undefined),
      ];
      await delay(2000);
      return { data: items };
    },
  },
};
