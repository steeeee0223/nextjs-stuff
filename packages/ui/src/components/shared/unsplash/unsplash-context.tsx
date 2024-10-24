"use client";

import { createContext, useContext } from "react";
import { createApi } from "unsplash-js";

export interface UnsplashContextInterface {
  unsplash: ReturnType<typeof createApi>;
}

export const UnsplashContext = createContext<UnsplashContextInterface | null>(
  null,
);

export function useUnsplashInternal(): UnsplashContextInterface {
  const object = useContext(UnsplashContext);
  if (!object)
    throw new Error("useUnsplash must be used within UnsplashProvider");
  return object;
}
