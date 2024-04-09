"use client";

import { createContext, useContext } from "react";

import type { IconInfo } from "./index.types";

export interface IconBlockContextInterface {
  currentIcon: IconInfo;
  setIcon: (icon: IconInfo) => void;
  setColor: (color?: string) => void;
  remove: () => void;
  upload: (file: File) => void;
}

export const IconBlockContext = createContext<IconBlockContextInterface | null>(
  null,
);

export function useIconBlock(): IconBlockContextInterface {
  const object = useContext(IconBlockContext);
  if (!object)
    throw new Error("useIconBlock must be used within IconBlockProvider");
  return object;
}
