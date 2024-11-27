import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { IconBlock, IconMenu, type IconInfo } from "@swy/ui/shared";

const meta = {
  title: "shared/Icon Menu",
  component: IconMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof IconMenu>;
export default meta;

type Story = StoryObj<typeof meta>;

const defaultIcon: IconInfo = { type: "text", text: "S" }
const Template: Story["render"] = () => {
  const [icon, setIcon] = useState<IconInfo>(defaultIcon);
  return (
    <IconMenu
      onSelect={setIcon}
      onRemove={() => setIcon(defaultIcon)}
    >
      <IconBlock icon={icon} size="lg" />
    </IconMenu>
  );
};

export const Default: Story = {
  render: Template,
};
