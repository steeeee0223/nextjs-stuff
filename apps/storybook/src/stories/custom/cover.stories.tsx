import type { Meta, StoryObj } from "@storybook/react";

import { Cover } from "@acme/ui/custom";

import image from "@/stories/assets/addon-library.png";

const meta = {
  title: "custom/Cover",
  component: Cover,
  tags: ["autodocs"],
} satisfies Meta<typeof Cover>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: image.src,
    unsplashAPIKey: "UNSPLASH_ACCESS_KEY",
    onUrlChange: async (url) => console.log(`Uploading url: ${url}`),
    onUploadChange: async (file) => console.log(`Uploading file: ${file.name}`),
    onRemove: async () => console.log(`Removing file`),
  },
};
