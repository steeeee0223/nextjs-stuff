import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight, CircleHelp, MailOpen, RefreshCw } from "lucide-react";

import { Button } from "@acme/ui/shadcn";

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
  args: { children: "Button" },
};
export const Blue: Story = {
  args: { variant: "blue", children: "Upgrade" },
};
export const Warning: Story = {
  args: { variant: "warning", children: "Delete this project" },
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
export const Notion: Story = {
  args: { variant: "notion", children: "Notion Style" },
};
export const Link: Story = {
  args: { variant: "link", children: "Link" },
};
export const Icon: Story = {
  args: {
    variant: "outline",
    size: "icon",
    children: <ChevronRight className="h-4 w-4" />,
  },
};
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <MailOpen className="mr-2 h-4 w-4" /> Login with Email
      </>
    ),
  },
};
export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Please wait
      </>
    ),
  },
};
