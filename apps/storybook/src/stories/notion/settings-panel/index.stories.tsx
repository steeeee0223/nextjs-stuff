import type { Meta, StoryObj } from "@storybook/react";

import { ModalProvider } from "@acme/ui/custom";
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
  render: () => (
    <div className="flex h-[calc(100vh-100px)] max-h-[720px] w-[calc(100vw-100px)] max-w-[1150px] rounded border-solid p-0 shadow">
      <SettingsPanel />
    </div>
  ),
};

export const Modal: Story = {
  render: () => (
    <ModalProvider>
      <Settings />
    </ModalProvider>
  ),
};
