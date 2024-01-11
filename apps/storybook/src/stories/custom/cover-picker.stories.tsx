import type { Meta, StoryObj } from "@storybook/react";
import { ImageIcon } from "lucide-react";

import { Button, CoverPicker } from "@acme/ui/components";

const meta = {
  title: "custom/Cover Picker",
  component: CoverPicker,
  tags: ["autodocs"],
} satisfies Meta<typeof CoverPicker>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    asChild: true,
    onUploadChange: async (file) => console.log(`Uploading file: ${file.name}`),
    onRemove: async () => console.log(`Removing file`),
    onUnsplash: async (url) => console.log(`Uploading unsplash image: ${url}`),
    children: (
      <>
        <Button variant="outline">
          <ImageIcon className="mr-2 h-4 w-4" />
          Change cover
        </Button>
      </>
    ),
  },
};
