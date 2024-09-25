import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight, CircleHelp, MailOpen, RefreshCw } from "lucide-react";

import { Button } from "@swy/ui/shadcn";

const meta = {
  title: "Shadcn/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: { children: "Notion style" },
};
export const Blue: Story = {
  args: { variant: "blue", children: "Upgrade" },
};
export const Warning: Story = {
  args: { variant: "red", children: "Delete this project" },
};
export const Hint: Story = {
  args: {
    variant: "hint",
    size: "xs",
    children: (
      <>
        <CircleHelp className="mr-1.5 h-3.5 w-3.5" />
        Learn more about this feature
      </>
    ),
  },
};
export const Link: Story = {
  args: { variant: "link", children: "Link" },
};
export const Nav: Story = {
  args: {
    variant: "nav",
    size: "icon",
    children: <ChevronRight className="size-4" />,
  },
};
export const Item: Story = {
  args: {
    variant: "item",
    children: (
      <>
        <MailOpen className="mr-2 size-4" /> Login with Email
      </>
    ),
  },
};
export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <RefreshCw className="mr-2 size-4 animate-spin" /> Please wait
      </>
    ),
  },
};
