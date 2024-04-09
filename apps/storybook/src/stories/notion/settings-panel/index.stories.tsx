import type { Meta, StoryObj } from "@storybook/react";

import { SettingsPanel } from "@acme/ui/notion";

import { Settings } from "./settings";

const meta = {
  title: "notion/Settings Panel",
  component: SettingsPanel,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SettingsPanel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Settings />,
};
