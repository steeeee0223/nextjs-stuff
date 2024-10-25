"use client";

import useSWR, { type Fetcher } from "swr";

import { defaultImages } from "./constants";
import type { UnsplashImage } from "./index.types";
import { useUnsplashInternal } from "./unsplash-context";

export interface UnsplashConfig {
  query?: string;
  count?: number;
}

export const useUnsplash = ({ query = "", count }: UnsplashConfig) => {
  const { unsplash } = useUnsplashInternal();
  const fetcher: Fetcher<UnsplashImage[], string> = async (key) => {
    let search;
    try {
      const [, query] = key.split(":");
      if (!query?.length) {
        search = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count,
        });
        if (!search.response) throw new Error("Failed to get random photos");
        return search.response as UnsplashImage[];
      }

      search = await unsplash.search.getPhotos({ query, perPage: count });
      if (!search.response) throw new Error(`Failed to get photos: ${query}`);
      return search.response.results as UnsplashImage[];
    } catch (e) {
      console.log(`[unsplash] Failed to get images from Unsplash!`);
      console.log(e);
      return defaultImages as UnsplashImage[];
    }
  };
  const { data, isLoading, error, mutate } = useSWR<UnsplashImage[], Error>(
    `unsplash:${query}`,
    fetcher,
    {
      onError: (e) => console.log(`[unsplash] Error: ${e.message}`),
      revalidateOnFocus: false,
    },
  );
  return { images: data, isLoading, error, mutate };
};
