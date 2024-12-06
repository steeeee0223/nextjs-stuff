import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { CollaborativeEditor } from "@swy/liveblocks";
import { usePlatformStore } from "@swy/notion";
import { user, workspaces } from "@swy/notion/mock";
import { ModalProvider } from "@swy/ui/shared";

import { liveblocksAuth } from "@/stories/notion/__mock__";
import { LayoutWithLiveblocks } from "./liveblocks-layout";

const meta = {
  title: "Playground",
  parameters: {
    layout: "fullscreen",
    msw: { handlers: [liveblocksAuth] },
  },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story["render"] = () => {
  const setWorkspaces = usePlatformStore((state) => state.setWorkspaces);
  const setUser = usePlatformStore((state) => state.setUser);
  const setActiveWorkspace = usePlatformStore(
    (state) => state.setActiveWorkspace,
  );
  const setActivePage = usePlatformStore((state) => state.setActivePage);
  useEffect(() => {
    setWorkspaces(workspaces);
    setUser(user);
    setActiveWorkspace(workspaces[0]!.id);
    setActivePage("#");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalProvider>
      <div className="flex h-screen bg-main">
        <LayoutWithLiveblocks>
          <CollaborativeEditor />
        </LayoutWithLiveblocks>
      </div>
    </ModalProvider>
  );
};

export const Playground: Story = {
  render: Template,
};
