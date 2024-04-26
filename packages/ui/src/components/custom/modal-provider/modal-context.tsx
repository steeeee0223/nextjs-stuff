/* eslint-disable @typescript-eslint/no-empty-function */
"use client";

import React, { createContext, useContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ModalData {}

export interface ModalContextInterface {
  data: ModalData;
  isOpen: boolean;
  setOpen: (
    modal: React.ReactNode,
    fetchData?: () => Promise<ModalData>,
  ) => void;
  setClose: () => void;
}

export const ModalContext = createContext<ModalContextInterface>({
  data: {},
  isOpen: false,
  setOpen: () => {},
  setClose: () => {},
});

export function useModal(): ModalContextInterface {
  const object = useContext(ModalContext);
  if (!object) throw new Error("useModal must be used within ModalProvider");
  return object;
}
