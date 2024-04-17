"use client";

import Image from "next/image";
import { ImageIcon, X } from "lucide-react";

import {
  CoverPicker,
  type CoverPickerProps,
} from "@/components/custom/cover-picker";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Styles */
const buttonProps: ButtonProps = {
  className: "text-muted-foreground text-xs",
  variant: "outline",
  size: "sm",
};

export interface CoverImageProps extends Omit<CoverPickerProps, "asChild"> {
  url: string | null;
  preview?: boolean;
}

export const Cover = ({ url, preview, ...props }: CoverImageProps) => {
  return (
    <div
      className={cn(
        "group relative h-[35vh] w-full",
        url ? "bg-muted" : "h-[12vh]",
      )}
    >
      {!!url && (
        <Image
          src={url}
          fill
          sizes="100%"
          priority
          alt="Cover"
          className="object-cover"
          unoptimized
        />
      )}
      {url && !preview && (
        <div
          className={cn(
            "flex items-center gap-x-2",
            "absolute bottom-5 right-5 opacity-0 group-hover:opacity-100",
          )}
        >
          <CoverPicker asChild {...props}>
            <Button {...buttonProps}>
              <ImageIcon className="mr-2 h-4 w-4" />
              Change cover
            </Button>
          </CoverPicker>
          <Button onClick={props.onRemove} {...buttonProps}>
            <X className="mr-2 h-4 w-4" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="h-[35vh] w-full" />;
};
