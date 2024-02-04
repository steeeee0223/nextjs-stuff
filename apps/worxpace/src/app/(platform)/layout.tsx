import type { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import { ModalProvider } from "~/components/providers";
import { EdgeStoreProvider } from "~/hooks";

export default function PlatformLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <EdgeStoreProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </EdgeStoreProvider>
    </ClerkProvider>
  );
}
