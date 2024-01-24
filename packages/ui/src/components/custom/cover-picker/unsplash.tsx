/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";

import { FormErrors } from "@/components/form";
import { defaultImages } from "@/constants/images";
import { cn } from "@/lib/utils";

export interface UnsplashProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
  isLoading?: boolean;
  pending?: boolean;
}
export interface UnsplashImage {
  id: string;
  user: { name: string };
  links: { html: string };
  urls: { thumb: string; full: string };
}
export const Unsplash = ({
  id,
  errors,
  isLoading = false,
  pending = false,
}: UnsplashProps) => {
  const [images] = useState<UnsplashImage[]>(defaultImages);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  return isLoading ? (
    <div className="flex items-center justify-center p-6">
      <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
    </div>
  ) : (
    <div className="relative">
      <div className="mb-2 grid grid-cols-3 gap-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75",
              pending && "cursor-auto opacity-50 hover:opacity-50",
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              readOnly
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              src={image.urls.thumb}
              alt="Unsplash image"
              className="rounded-sm object-cover"
              fill
            />
            {selectedImageId === image.id && (
              <div
                className={cn(
                  "h-full w-full",
                  "flex items-center",
                  "absolute inset-y-0 justify-center bg-black/30",
                )}
              >
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};
