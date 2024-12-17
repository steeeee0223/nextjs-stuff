"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Navbar,
  PageProvider,
  Sidebar2,
  usePlatformStore,
  WorkspaceSwitcher2,
} from "@swy/notion";
import { useSidebarLayout } from "@swy/ui/hooks";
import { cn } from "@swy/ui/lib";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@swy/ui/shadcn";

import { fallbackUser, fallbackWorkspace } from "~/constants";
import { useAppActions, useAppState } from "~/hooks";
import { useSidebarData } from "~/hooks/use-sidebar-data";

export default function CoreLayout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const { minSize, ref, collapse, expand, isResizing, isMobile, isCollapsed } =
    useSidebarLayout("group", "sidebar", 240);

  const { isSignedIn } = useAppState();
  const { goToOnboarding, selectWorkspace, logout } = useAppActions();
  const user = usePlatformStore((state) => state.user);
  const workspaces = usePlatformStore((state) => state.workspaces);
  const activeWorkspace = usePlatformStore((state) => state.activeWorkspace);

  const sidebarProps = useSidebarData();

  useEffect(() => {
    if (!isSignedIn || !activeWorkspace) router.push("/sign-in");
  }, [activeWorkspace, isSignedIn, router]);

  return (
    activeWorkspace && (
      <ResizablePanelGroup
        id="group"
        direction="horizontal"
        className="h-screen w-screen"
      >
        <ResizablePanel
          id="sidebar"
          ref={ref}
          className={cn(
            isResizing && "transition-all duration-300 ease-in-out",
          )}
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
            {...sidebarProps}
            WorkspaceSwitcher={
              <WorkspaceSwitcher2
                user={user ?? fallbackUser}
                workspaces={Object.values(workspaces)}
                activeWorkspace={
                  workspaces[activeWorkspace] ?? fallbackWorkspace
                }
                onSelect={(wid) => selectWorkspace(user?.id ?? "", wid)}
                onCreateWorkspace={goToOnboarding}
                onLogout={logout}
              />
            }
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          order={2}
          className={cn(
            isResizing && "transition-all duration-300 ease-in-out",
          )}
        >
          <PageProvider
            className="order-3 flex size-full flex-col overflow-hidden"
            page={null}
          >
            <Navbar
              className="w-full"
              onResetWidth={expand}
              isCollapsed={isCollapsed}
            />
            <main className="h-full">{children}</main>
          </PageProvider>
        </ResizablePanel>
      </ResizablePanelGroup>
    )
  );
}
