"use client";

import React, { useLayoutEffect, useMemo, useState } from "react";

import { ModalContext } from "./modal-context";
import type { ModalContextInterface, ModalData } from "./modal-context";

export type ModalProviderProps<_T extends ModalData> = React.PropsWithChildren;

export function ModalProvider<T extends ModalData>({
  children,
}: ModalProviderProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<T>({} as T);
  const [showingModal, setShowingModal] = useState<React.ReactNode>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  const contextValue = useMemo<ModalContextInterface<ModalData>>(
    () => ({
      data,
      isOpen,
      setOpen: (modal, fetchData) => {
        if (!modal) return;
        fetchData?.()
          .then((newData) => setData({ ...data, ...newData }))
          .catch(() => console.log("[modal] Error while fetching modal data"));
        setShowingModal(modal);
        setIsOpen(true);
      },
      setClose: () => {
        setIsOpen(false);
        setData({} as T);
      },
    }),
    [data, isOpen],
  );

  if (!isMounted) return null;
  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {showingModal}
    </ModalContext.Provider>
  );
}
