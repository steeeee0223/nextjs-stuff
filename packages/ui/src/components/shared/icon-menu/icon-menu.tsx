"use client";

import React, { lazy, Suspense, useState, useTransition } from "react";

import { cn } from "@swy/ui/lib";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@swy/ui/shadcn";

import { UrlForm } from "../common";
import type { IconInfo, LucideName } from "../icon-block";
import { Spinner } from "../spinner";
import { EmojiPicker } from "./emoji-picker";
import { LucidePicker } from "./lucide-picker";

export interface IconMemuProps extends React.PropsWithChildren {
  className?: string;
  disabled?: boolean;
  onSelect?: (iconInfo: IconInfo) => void;
  onRemove?: () => void;
  onUpload?: (file: File) => void;
}

const ImageDropzone = lazy(() => import("../single-image-dropzone"));

/**
 * A controlled popover menu for icon selection and upload.
 */
export const IconMenu: React.FC<IconMemuProps> = ({
  className,
  disabled,
  children,
  onSelect,
  onRemove,
  onUpload,
}) => {
  /** Icon Info */
  const selectEmoji = (emoji: string) => onSelect?.({ type: "emoji", emoji });
  const selectLucideIcon = (name: LucideName, color?: string) =>
    onSelect?.({ type: "lucide", name, color });
  const submitUrl = (url: string) => onSelect?.({ type: "file", url });
  /** Upload */
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File>();
  const handleUpload = (file?: File) => {
    if (file) {
      startTransition(() => {
        setFile(file);
        onUpload?.(file);
      });
    }
    setFile(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant="subitem"
          className={cn("size-fit p-0 disabled:opacity-100", className)}
        >
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-[356px] w-[408px]">
        <Tabs defaultValue="emoji" className="relative my-0.5 w-full">
          <TabsList>
            <div className="flex grow">
              <TabsTrigger value="emoji">Emojis</TabsTrigger>
              <TabsTrigger value="lucide">Icons</TabsTrigger>
              <TabsTrigger value="file">Upload</TabsTrigger>
            </div>
            <div className="flex grow-0">
              <Button
                onClick={onRemove}
                variant="hint"
                size="sm"
                className="my-1 p-1"
              >
                Remove
              </Button>
            </div>
          </TabsList>
          <TabsContent value="emoji" className="bg-transparent px-3 pb-2 pt-4">
            <EmojiPicker onSelect={selectEmoji} />
          </TabsContent>
          <TabsContent value="lucide" className="bg-transparent px-3 pb-2 pt-4">
            <LucidePicker onSelect={selectLucideIcon} />
          </TabsContent>
          <TabsContent value="file" className="px-5 pb-2 pt-4">
            <UrlForm disabled={isPending} onUrlSubmit={submitUrl} />
            <Suspense fallback={<Loading />}>
              <ImageDropzone
                className="mt-6 w-full"
                disabled={isPending}
                value={file}
                onChange={handleUpload}
              />
            </Suspense>
            <p className="p-4 text-center text-xs text-muted dark:text-muted-dark">
              Recommended size is 280 × 280 pixels
            </p>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

const Loading = () => (
  <div className="flex min-h-40 w-full flex-col items-center justify-center">
    <Spinner />
  </div>
);
