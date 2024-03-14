import type { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import { ModalProvider, WorxpaceProvider } from "~/components/providers";
import { EdgeStoreProvider } from "~/hooks";

export default function PlatformLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <EdgeStoreProvider>
        <Toaster />
        <WorxpaceProvider>
          <ModalProvider />
          {children}
        </WorxpaceProvider>
      </EdgeStoreProvider>
    </ClerkProvider>
  );
}
