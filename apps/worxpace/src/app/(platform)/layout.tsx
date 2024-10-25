import type { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import { ModalProvider } from "@swy/ui/shared";

import { WorkspaceProvider } from "./_components/workspace-provider";

export default function PlatformLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <Toaster />
      <WorkspaceProvider>
        <ModalProvider>{children}</ModalProvider>
      </WorkspaceProvider>
    </ClerkProvider>
  );
}
