"use client";

import { useMemo } from "react";
import { createApi } from "unsplash-js";

import { UnsplashContext } from "./unsplash-context";
import { UnsplashPicker, type UnsplashPickerProps } from "./unsplash-picker";

export interface UnsplashProps extends UnsplashPickerProps {
  /** @param apiKey - Unsplash Access Key */
  apiKey: string;
}

export const Unsplash = ({ apiKey, ...props }: UnsplashProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const unsplash = useMemo(() => createApi({ accessKey: apiKey, fetch }), []);

  return (
    <UnsplashContext.Provider value={{ unsplash }}>
      <UnsplashPicker {...props} />
    </UnsplashContext.Provider>
  );
};
