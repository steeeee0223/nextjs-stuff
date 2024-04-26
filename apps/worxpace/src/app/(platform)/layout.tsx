import type { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import { ModalProvider } from "@acme/ui/custom";

import { WorxpaceProvider } from "~/components/providers";
import { EdgeStoreProvider } from "~/hooks";

export default function PlatformLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <EdgeStoreProvider>
        <Toaster />
        <WorxpaceProvider>
          <ModalProvider>{children}</ModalProvider>
        </WorxpaceProvider>
      </EdgeStoreProvider>
    </ClerkProvider>
  );
}
