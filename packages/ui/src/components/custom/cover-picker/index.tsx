"use client";

import { useState, type PropsWithChildren } from "react";

import { SingleImageDropzone } from "@/components/dnd";
import { FormSubmit } from "@/components/form";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { cn } from "@/lib";
import { Unsplash } from "./unsplash";

/** Styles */
const tabTriggerStyle = cn(
  "relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
);
const tabContentStyle = cn(
  "relative px-4 py-2 [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
);

export interface CoverPickerProps extends PropsWithChildren {
  asChild?: boolean;
  onUploadChange?: (file: File) => Promise<void>;
  onUnsplash?: (url: string) => Promise<void>;
  onRemove?: () => Promise<void>;
}

export const CoverPicker = ({
  children,
  asChild,
  onUploadChange,
  onUnsplash,
  onRemove,
}: CoverPickerProps) => {
  /** Upload */
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
  };
  const handleUpload = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);
      await onUploadChange?.(file);
    }
    onClose();
  };
  /** Unsplash */
  const handleUnsplash = async (formData: FormData) => {
    const image = (formData.get("image") as string) ?? "";
    const [, , url] = image.split("|");
    await onUnsplash?.(url!);
    onClose();
  };

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="z-[99999] w-96 p-0 shadow-none">
        <Tabs defaultValue="upload" className="relative mt-1 w-full">
          <TabsList className="flex w-full justify-start rounded-none border-b bg-transparent p-0">
            <div className="grow">
              <TabsTrigger value="upload" className={tabTriggerStyle}>
                Upload
              </TabsTrigger>
              <TabsTrigger value="unsplash" className={tabTriggerStyle}>
                Unsplash
              </TabsTrigger>
            </div>
            <div className="grow-0">
              <Button
                onClick={onRemove}
                size="sm"
                className="mx-2 my-1 border-none p-1"
                variant="outline"
              >
                Remove
              </Button>
            </div>
          </TabsList>
          <TabsContent value="upload" className={tabContentStyle}>
            <SingleImageDropzone
              className="w-full outline-none"
              disabled={isSubmitting}
              value={file}
              onChange={handleUpload}
            />
            <p className="p-4 text-center text-xs text-muted-foreground">
              Images wider than 1500 pixels work best.
            </p>
          </TabsContent>
          <TabsContent value="unsplash" className={tabContentStyle}>
            <form action={handleUnsplash} className="space-y-4">
              <Unsplash id="image" />
              <FormSubmit className="w-full">Select</FormSubmit>
            </form>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
