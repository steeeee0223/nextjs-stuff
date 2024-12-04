import type { Meta, StoryObj } from "@storybook/react";

import { AddItem, Provider, TreeView, WithInitialItems } from "./_components";
import { folderSystemItems, groupFolderItems } from "./data";

const meta = {
  title: "shared/Tree View",
  component: TreeView,
  parameters: { layout: "centered" },
} satisfies Meta<typeof TreeView>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    group: "project",
    title: "React App",
  },
  render: (props) => (
    <WithInitialItems initialItems={folderSystemItems}>
      <TreeView {...props} />
    </WithInitialItems>
  ),
};

export const Loading: Story = {
  args: {
    group: "project",
    title: "React App",
    isLoading: true,
  },
  render: (props) => (
    <WithInitialItems isLoading={props.isLoading}>
      <TreeView {...props} />
    </WithInitialItems>
  ),
};

export const Sidebar: Story = {
  args: {
    group: "default",
    title: "Group",
  },
  render: (props) => (
    <WithInitialItems>
      <AddItem group="default" />
      <TreeView {...props} />
    </WithInitialItems>
  ),
};

export const FolderSystem: Story = {
  args: {
    group: "project",
    title: "React App",
  },
  render: (props) => (
    <WithInitialItems initialItems={folderSystemItems}>
      <TreeView {...props} />
    </WithInitialItems>
  ),
};

export const GroupFolders: Story = {
  args: {
    group: "main",
    title: "System",
  },
  render: (props) => (
    <WithInitialItems initialItems={groupFolderItems}>
      <AddItem group="main" />
      <TreeView {...props} />
      <TreeView group="config" title="Config" />
    </WithInitialItems>
  ),
};

export const WithSWR: Story = {
  args: {
    group: "swr",
    title: "Project",
  },
  render: (props) => (
    <Provider>
      <TreeView {...props} />
    </Provider>
  ),
};
