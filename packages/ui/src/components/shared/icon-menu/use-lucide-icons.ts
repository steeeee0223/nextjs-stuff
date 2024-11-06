"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

import type { LucideName } from "../icon-block";

type IconTag = [name: LucideName, tags: string[]];

export const useLucideIcons = () => {
  const [isLoading, startTransition] = useTransition();
  /** Metadata for Lucide icons */
  const allIcons = useMemo(
    () => Object.keys(dynamicIconImports) as LucideName[],
    [],
  );
  const [tags, setTags] = useState<IconTag[]>([]);
  /** Filtered icons */
  const [icons, setIcons] = useState(allIcons);
  const filterIcons = (value: string) =>
    setIcons(
      value.length > 0
        ? tags
            .filter(([name, keywords]) =>
              value
                .toLowerCase()
                .split(" ")
                .some((keyword) =>
                  [...name.split("-"), ...keywords].includes(keyword),
                ),
            )
            .map(([name]) => name)
        : allIcons,
    );

  useEffect(() => {
    const fetchTags = async () => {
      console.log("fetching tags for lucide icons");
      const res = await fetch("https://lucide.dev/api/tags");
      const data = (await res.json()) as Record<string, string[]>;
      setTags(Object.entries(data) as IconTag[]);
    };

    startTransition(() => void fetchTags());
  }, []);

  return { isLoading, allIcons, icons, filterIcons };
};
