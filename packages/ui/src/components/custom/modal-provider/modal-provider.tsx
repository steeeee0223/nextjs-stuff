"use client";

import React, { useEffect, useState } from "react";

import { ModalContext } from "./modal-context";
import type { ModalContextInterface, ModalData } from "./modal-context";

export type ModalProviderProps = React.PropsWithChildren;

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<ModalData>({});
  const [showingModal, setShowingModal] = useState<React.ReactNode>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const contextValue: ModalContextInterface = {
    data,
    isOpen,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setOpen: async (modal, fetchData) => {
      if (modal) {
        const newData = (await fetchData?.()) ?? {};
        setData({ ...data, ...newData });
        setShowingModal(modal);
        setIsOpen(true);
      }
    },
    setClose: () => {
      setIsOpen(false);
      setData({});
    },
  };

  if (!isMounted) return null;
  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {showingModal}
    </ModalContext.Provider>
  );
};
