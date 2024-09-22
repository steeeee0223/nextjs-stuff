"use client";

import { useState } from "react";

import { Spinner } from "@/components/custom/spinner";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useUnsplash } from "./use-unsplash";

export interface UnsplashPickerProps {
  className?: string;
  onSelect?: (url: string) => void;
}

export const UnsplashPicker = ({
  className,
  onSelect,
}: UnsplashPickerProps) => {
  const [query, setQuery] = useState<string>("");
  const { images, isLoading } = useUnsplash({ query, count: 24 });

  return (
    <div className={cn("max-h-[280px] w-full overflow-y-auto p-4", className)}>
      <Input
        id="unsplash"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for an image..."
      />
      <div className="mx-0 mt-4 flex items-center justify-center ">
        {isLoading || !images ? (
          <Spinner />
        ) : images.length ? (
          <div className="grid w-full grid-cols-4 gap-x-2 gap-y-6">
            {images?.map(({ id, urls, user, description }) => (
              <div
                key={id}
                tabIndex={-1}
                role="button"
                onClick={() => onSelect?.(urls.regular)}
                onKeyDown={() => onSelect?.(urls.regular)}
                className="group relative aspect-video cursor-pointer transition hover:opacity-75"
              >
                <img
                  src={urls.small}
                  alt={description ?? "Unsplash"}
                  className="h-16 w-full rounded-sm object-cover object-center"
                />
                <p className="absolute bottom-[-14px] w-full truncate text-[10px] opacity-100">
                  by{" "}
                  <a
                    href={user.portfolio_url}
                    className="underline opacity-70 group-hover:opacity-100"
                  >
                    {user.name}
                  </a>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No result found.</p>
        )}
      </div>
    </div>
  );
};
