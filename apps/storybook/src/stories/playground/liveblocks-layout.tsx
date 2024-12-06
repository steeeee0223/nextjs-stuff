import React from "react";

import { createClient, createRoomContext, RoomProvider } from "@swy/liveblocks";
import {
  Navbar,
  PageHeader,
  PageProvider,
  Sidebar2,
  usePlatformStore,
  WorkspaceSwitcher2,
} from "@swy/notion";
import {
  mockConnections,
  mockLogs,
  mockMemberships,
  mockPages,
  mockSettings,
} from "@swy/notion/mock";
import { useSidebarLayout } from "@swy/ui/hooks";
import { cn } from "@swy/ui/lib";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@swy/ui/shadcn";

import { usePages } from "./use-pages";

/** Setup Liveblocks */
const authEndpoint = "/api/liveblocks";
const client = createClient({ authEndpoint });
const { useSelf, useOthers } = createRoomContext(client);

type LayoutProps = React.PropsWithChildren;

export const LayoutWithLiveblocks = ({ children }: LayoutProps) => {
  const { minSize, ref, collapse, expand, isResizing, isMobile, isCollapsed } =
    useSidebarLayout("group", "sidebar", 240);
  /** Bound stores */
  const activeWorkspace = usePlatformStore((state) => state.activeWorkspace);
  const workspaces = usePlatformStore((state) => state.workspaces);
  const user = usePlatformStore((state) => state.user);
  const setActiveWorkspace = usePlatformStore(
    (state) => state.setActiveWorkspace,
  );
  const { pageId, isLoading, fetchPages, selectPage } =
    usePages(activeWorkspace);

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
        <Sidebar2
          className="w-full"
          isMobile={isMobile}
          collapse={collapse}
          redirect={selectPage}
          settingsProps={{
            settings: mockSettings,
            onFetchConnections: () => Promise.resolve(mockConnections),
            onFetchMemberships: () => Promise.resolve(mockMemberships),
          }}
          pageHandlers={{ isLoading, fetchPages }}
          WorkspaceSwitcher={
            <WorkspaceSwitcher2
              user={user!}
              activeWorkspace={workspaces[activeWorkspace!]!}
              workspaces={Object.values(workspaces)}
              onSelect={setActiveWorkspace}
            />
          }
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        order={2}
        className={cn(isResizing && "transition-all duration-300 ease-in-out")}
      >
        <RoomProvider authEndpoint={authEndpoint} roomId={pageId}>
          <PageLayout pageId={pageId} isCollapsed={isCollapsed} expand={expand}>
            {children}
          </PageLayout>
        </RoomProvider>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export const PageLayout = ({
  children,
  pageId,
  expand,
  isCollapsed,
}: LayoutProps & {
  pageId: string;
  expand: () => void;
  isCollapsed?: boolean;
}) => {
  const currentUser = useSelf();
  const otherUsers = useOthers();
  return (
    <PageProvider
      className="order-3 flex size-full flex-col overflow-hidden"
      page={mockPages[pageId]!}
      currentUser={currentUser}
      otherUsers={otherUsers}
      fetchLogs={() => Promise.resolve(mockLogs)}
    >
      <Navbar
        className="w-full"
        onResetWidth={expand}
        isCollapsed={isCollapsed}
      />
      <main className="h-full">
        <PageHeader unsplashAPIKey="UNSPLASH_API_KEY" />
        {pageId === "#" ? (
          <div className="px-[54px] text-[32px]">Welcome to WorXpace</div>
        ) : (
          children
        )}
      </main>
    </PageProvider>
  );
};
