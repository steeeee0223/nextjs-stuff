"use client";

import { ImageIcon, X } from "lucide-react";

import {
  CoverPicker,
  type CoverPickerProps,
} from "@/components/custom/cover-picker";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface CoverImageProps extends CoverPickerProps {
  url: string | null;
  preview?: boolean;
}

export const Cover = ({ url, preview, ...props }: CoverImageProps) => {
  return (
    <div
      className={cn(
        "group relative h-[30vh] max-h-[280px] w-full",
        url ? "bg-main" : "h-[12vh]",
      )}
    >
      {!!url && (
        <img
          src={url}
          alt="Cover"
          className="block size-full object-cover object-center"
        />
      )}
      {url && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
          <div className="rounded-sm bg-popover">
            <CoverPicker {...props}>
              <Button size="sm">
                <ImageIcon className="mr-2 size-4" />
                Change cover
              </Button>
            </CoverPicker>
          </div>
          <div className="rounded-sm bg-popover">
            <Button onClick={props.onRemove} size="sm">
              <X className="mr-2 size-4" />
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="h-[35vh] w-full" />;
};
