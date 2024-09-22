import type { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import { ModalProvider } from "@acme/ui/custom";

import { EdgeStoreProvider } from "~/hooks";
import { WorkspaceProvider } from "./_components/workspace-provider";

export default function PlatformLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <EdgeStoreProvider>
        <Toaster />
        <WorkspaceProvider>
          <ModalProvider>{children}</ModalProvider>
        </WorkspaceProvider>
      </EdgeStoreProvider>
    </ClerkProvider>
  );
}
