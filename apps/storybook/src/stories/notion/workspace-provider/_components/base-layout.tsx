import { Navbar, PageHeader, PageProvider, Sidebar } from "@swy/notion";
import {
  mockConnections,
  mockLogs,
  mockMemberships,
  mockPages,
  mockSettings,
  otherUsers,
  user,
} from "@swy/notion/mock";
import { useSidebarLayout } from "@swy/ui/hooks";
import { cn } from "@swy/ui/lib";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@swy/ui/shadcn";

import { useDocuments } from "./use-documents";

interface LayoutProps extends React.PropsWithChildren {
  pageId: string;
}

export const BaseLayout = ({ pageId, children }: LayoutProps) => {
  const { minSize, ref, collapse, expand, isResizing, isMobile } =
    useSidebarLayout("group", "sidebar", 240);
  const { isLoading, fetchPages } = useDocuments({
    workspaceId: "workspace-0",
  });

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
            onFetchConnections: () => Promise.resolve(mockConnections),
            onFetchMemberships: () => Promise.resolve(mockMemberships),
          }}
          pageHandlers={{ isLoading, fetchPages }}
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
          page={mockPages[pageId]!}
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
            {pageId === "#" ? (
              <div className="px-[54px] text-[32px]">Welcome to WorXpace</div>
            ) : (
              children
            )}
          </main>
        </PageProvider>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
