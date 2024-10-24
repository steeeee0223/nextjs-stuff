import type { Meta, StoryObj } from "@storybook/react";

import { liveblocksAuth } from "@/stories/notion/__mock__";
import { NotionWorkspace } from "./playground";

const meta = {
  title: "Playground",
  parameters: {
    layout: "fullscreen",
    msw: { handlers: [liveblocksAuth] },
  },
} satisfies Meta;
export default meta;

export type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: NotionWorkspace,
};
