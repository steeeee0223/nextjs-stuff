import type { Meta, StoryObj } from "@storybook/react";

import { CRUDItem } from "@swy/ui/shared";

const meta = {
  title: "shared/Crud Item",
  component: CRUDItem,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
  render: (args) => {
    return (
      <div className="group/sidebar relative flex h-full w-60 flex-col overflow-y-auto bg-sidebar">
        <CRUDItem {...args} />
      </div>
    );
  },
} satisfies Meta<typeof CRUDItem>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "New Page",
    icon: { type: "lucide", name: "circle-plus" },
    expandable: false,
    onCreate: () => alert("Added New Page"),
  },
};
export const Search: Story = {
  args: {
    label: "Search",
    icon: { type: "lucide", name: "search" },
    expandable: false,
    onClick: () => alert("Opened Search Bar"),
    shortcut: "⌘K",
  },
};
export const Settings: Story = {
  args: {
    label: "Settings",
    icon: { type: "lucide", name: "settings" },
    expandable: false,
    onClick: () => alert("Opened Settings Block"),
    shortcut: "⌘,",
  },
};
export const TreeItem: Story = {
  args: {
    id: "test-id",
    lastEditedBy: "John Doe",
    label: "Folder",
    icon: { type: "lucide", name: "folder" },
    onClick: () => alert(`Clicked item`),
    active: true,
    level: 0,
    expandable: true,
    onExpand: () => alert(`Expanded item`),
    onCreate: () => alert(`Created item`),
    onDelete: () => alert(`Deleted item`),
  },
};
