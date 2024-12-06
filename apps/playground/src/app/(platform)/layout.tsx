"use client";

import React, { useEffect } from "react";
import { Toaster } from "sonner";

import { ModalProvider } from "@swy/ui/shared";

import { useMockDB } from "~/hooks";

export default function PlatformLayout({ children }: React.PropsWithChildren) {
  const { setupDB } = useMockDB();

  useEffect(() => {
    setupDB();
  }, [setupDB]);

  return (
    <>
      <Toaster />
      <ModalProvider>
        <div className="flex h-screen items-center justify-center">
          {children}
        </div>
      </ModalProvider>
    </>
  );
}
