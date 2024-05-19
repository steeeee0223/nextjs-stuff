/* eslint-disable @typescript-eslint/no-empty-function */
"use client";

import React, { createContext, useContext } from "react";

export type ModalData = Record<string, unknown>;

export interface ModalContextInterface<T extends ModalData> {
  data: T;
  isOpen: boolean;
  setOpen: <T>(modal: React.ReactNode, fetchData?: () => Promise<T>) => void;
  setClose: () => void;
}

export const ModalContext = createContext<ModalContextInterface<ModalData>>({
  data: {},
  isOpen: false,
  setOpen: () => {},
  setClose: () => {},
});

export function useModal<T extends ModalData>(): ModalContextInterface<T> {
  const object = useContext<ModalContextInterface<T>>(
    ModalContext as unknown as React.Context<ModalContextInterface<T>>,
  );
  if (!object) throw new Error("useModal must be used within ModalProvider");
  return object;
}
