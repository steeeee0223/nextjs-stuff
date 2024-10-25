import type { Meta, StoryObj } from "@storybook/react";

import { SettingsPanel } from "@swy/notion";
import {
  mockConnections,
  mockMemberships,
  mockSettings,
} from "@swy/notion/mock";
import { ModalProvider } from "@swy/ui/shared";

import { Settings } from "./settings";

const meta = {
  title: "notion/Settings Panel",
  component: SettingsPanel,
  parameters: { layout: "centered" },
  tags: ["!autodocs"],
} satisfies Meta<typeof SettingsPanel>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    settings: mockSettings,
    onFetchConnections: () => Promise.resolve(mockConnections),
    onFetchMemberships: () => Promise.resolve(mockMemberships),
  },
  render: (props) => (
    <div className="flex h-[calc(100vh-100px)] max-h-[720px] w-[calc(100vw-100px)] max-w-[1150px] rounded border-solid p-0 shadow">
      <SettingsPanel {...props} />
    </div>
  ),
};

export const Modal: Story = {
  args: { settings: mockSettings },
  render: ({ settings }) => (
    <ModalProvider>
      <Settings initialData={settings} />
    </ModalProvider>
  ),
};
