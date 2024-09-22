import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";

import { ModalProvider, TreeProvider } from "@acme/ui/custom";
import { useSidebarLayout } from "@acme/ui/hooks";
import { cn } from "@acme/ui/lib";
import {
  Navbar,
  PageHeader,
  PageProvider,
  Sidebar,
  WorkspaceProvider,
  WorkspaceSwitcher,
} from "@acme/ui/notion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@acme/ui/shadcn";

import {
  documents,
  GROUPS,
  mockConnections,
  mockLogs,
  mockMemberships,
  mockPages,
  mockSettings,
  otherUsers,
  user,
  workspaces,
} from "../__mock__";

const meta = {
  title: "notion/Workspace",
  component: WorkspaceProvider,
} satisfies Meta<typeof WorkspaceProvider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Swticher: Story = {
  args: {
    user,
    workspaces,
    initial: "workspace-0",
    className: "h-full",
    children: <WorkspaceSwitcher />,
  },
  parameters: { layout: "centered" },
};

const Template: Story["render"] = ({ children, ...props }) => {
  return (
    <WorkspaceProvider {...props}>
      <ModalProvider>
        <TreeProvider
          className="flex h-screen bg-main"
          groups={GROUPS}
          initialItems={documents}
          onClickItem={(id) => toast.message(`Clicked: ${id}`)}
          isItemActive={(id) => id === "page-1"}
        >
          {children}
        </TreeProvider>
      </ModalProvider>
    </WorkspaceProvider>
  );
};

const Layout = () => {
  const { minSize, ref, collapse, expand, isResizing, isMobile } =
    useSidebarLayout("group", "sidebar", 240);

  return (
    <ResizablePanelGroup
      id="group"
      direction="horizontal"
      className="h-screen w-screen"
    >
      <ResizablePanel
        id="sidebar"
        ref={ref}
        className={cn(isResizing && "transition-all duration-300 ease-in-out")}
        defaultSize={isMobile ? 0 : undefined}
        minSize={isMobile ? 0 : minSize}
        maxSize={isMobile ? 100 : 50}
        collapsible
        order={1}
      >
        <Sidebar
          className="w-full"
          isMobile={isMobile}
          collapse={collapse}
          settingsProps={{
            settings: mockSettings,
            onFetchConnections: async () => mockConnections,
            onFetchMemberships: async () => mockMemberships,
          }}
          pageHandlers={{
            fetchPages: () => Promise.resolve(Object.values(mockPages)),
          }}
          workspaceHandlers={{}}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        order={2}
        className={cn(isResizing && "transition-all duration-300 ease-in-out")}
      >
        <PageProvider
          className="order-3 flex size-full flex-col overflow-hidden"
          page={mockPages.page1!}
          currentUser={user}
          otherUsers={otherUsers}
          fetchLogs={() => Promise.resolve(mockLogs)}
        >
          <Navbar
            className="w-full"
            onResetWidth={expand}
            isCollapsed={ref.current?.isCollapsed()}
          />
          <main className="h-full">
            <PageHeader unsplashAPIKey="UNSPLASH_API_KEY" />
          </main>
        </PageProvider>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export const WorkspaceLayout: Story = {
  args: {
    user,
    workspaces,
    initial: "workspace-0",
    className: "h-full",
    children: <Layout />,
  },
  render: Template,
  parameters: { layout: "fullscreen" },
};

export const WorkspaceNavbar: Story = {
  name: "Navbar",
  args: {
    user,
    workspaces,
    initial: "workspace-0",
    className: "h-full",
    children: <Navbar isCollapsed className="left-0 w-full" />,
  },
  render: ({ children, ...props }) => (
    <Template {...props}>
      <PageProvider
        className="order-3 flex w-full flex-col overflow-hidden"
        page={mockPages.page1!}
        currentUser={user}
        otherUsers={otherUsers}
        fetchLogs={() => Promise.resolve(mockLogs)}
      >
        {children}
      </PageProvider>
    </Template>
  ),
  parameters: { layout: "fullscreen" },
};
