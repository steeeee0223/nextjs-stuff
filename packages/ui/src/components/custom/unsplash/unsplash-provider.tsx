"use client";

import { useMemo } from "react";
import { createApi } from "unsplash-js";

import {
  UnsplashContext,
  type UnsplashContextInterface,
} from "./unsplash-context";
import { UnsplashPicker, type UnsplashPickerProps } from "./unsplash-picker";

export interface UnsplashProps extends UnsplashPickerProps {
  /** @param apiKey - Unsplash Access Key */
  apiKey: string;
}

export const Unsplash = ({ apiKey, ...props }: UnsplashProps) => {
  const contextValue = useMemo<UnsplashContextInterface>(
    () => ({ unsplash: createApi({ accessKey: apiKey, fetch }) }),
    [apiKey],
  );

  return (
    <UnsplashContext.Provider value={contextValue}>
      <UnsplashPicker {...props} />
    </UnsplashContext.Provider>
  );
};
