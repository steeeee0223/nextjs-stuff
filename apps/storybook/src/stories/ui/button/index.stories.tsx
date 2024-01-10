import type { Meta, StoryObj } from "@storybook/react";
import NextLink from "next/link";
import { ChevronRight, MailOpen, RefreshCw } from "lucide-react";

import { Button } from "@acme/ui/components";

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
export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};
export const Destructive: Story = {
  args: { variant: "destructive", children: "Destructive" },
};
export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};
export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost" },
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
export const AsChild: Story = {
  args: {
    asChild: true,
    children: <NextLink href="/login">Login</NextLink>,
  },
};
