"use client";

import Image from "next/image";
import { ImageIcon, X } from "lucide-react";

import { CoverPicker } from "@/components/custom";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CoverImageProps {
  url: string | null;
  preview?: boolean;
  onUploadChange?: (file: File) => Promise<void>;
  onUnsplash?: (url: string) => Promise<void>;
  onRemove?: () => Promise<void>;
}

export const Cover = ({
  url,
  preview,
  onUploadChange,
  onUnsplash,
  onRemove,
}: CoverImageProps) => {
  /** Styles */
  const buttonProps: ButtonProps = {
    className: "text-muted-foreground text-xs",
    variant: "outline",
    size: "sm",
  };

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
          <CoverPicker
            asChild
            onUploadChange={onUploadChange}
            onUnsplash={onUnsplash}
            onRemove={onRemove}
          >
            <Button {...buttonProps}>
              <ImageIcon className="mr-2 h-4 w-4" />
              Change cover
            </Button>
          </CoverPicker>
          <Button onClick={onRemove} {...buttonProps}>
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
