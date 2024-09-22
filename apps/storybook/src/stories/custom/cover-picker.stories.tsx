import type { Meta, StoryObj } from "@storybook/react";
import { ImageIcon } from "lucide-react";

import { CoverPicker } from "@acme/ui/custom";
import { Button } from "@acme/ui/shadcn";

const meta = {
  title: "custom/Cover Picker",
  component: CoverPicker,
  tags: ["autodocs"],
  argTypes: { children: { control: false } },
} satisfies Meta<typeof CoverPicker>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    unsplashAPIKey: "UNSPLASH_ACCESS_KEY",
    onUploadChange: (file) => console.log(`Uploading file: ${file.name}`),
    onRemove: () => console.log(`Removing file`),
    onUrlChange: (url) => console.log(`Uploading url: ${url}`),
    children: (
      <Button>
        <ImageIcon className="mr-2 h-4 w-4" />
        Change cover
      </Button>
    ),
  },
};
