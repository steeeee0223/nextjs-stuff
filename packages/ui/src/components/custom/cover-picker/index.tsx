"use client";

import { useState, type PropsWithChildren } from "react";

import { Unsplash } from "@/components/custom/unsplash";
import { SingleImageDropzone } from "@/components/dnd";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlForm } from "./url-form";

/** Styles */
const styles = {
  tabContent: "p-4 pb-2",
};

export interface CoverPickerProps extends PropsWithChildren {
  /** @param unsplashAPIKey - Unsplash Access Key */
  unsplashAPIKey: string;
  onUploadChange?: (file: File) => void;
  onUrlChange?: (url: string) => void;
  onRemove?: () => void;
}

export const CoverPicker = ({
  children,
  unsplashAPIKey,
  onUploadChange,
  onUrlChange,
  onRemove,
}: CoverPickerProps) => {
  /** Upload */
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
  };
  const handleUpload = (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);
      onUploadChange?.(file);
    }
    onClose();
  };
  /** Link & Unsplash */
  const onUrlSubmit = (url: string) => {
    setIsSubmitting(true);
    void onUrlChange?.(url);
    onClose();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="start" className="w-[520px]">
        <Tabs defaultValue="upload" className="relative my-0.5 w-full">
          <TabsList>
            <div className="grow">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="link">Link</TabsTrigger>
              <TabsTrigger value="unsplash">Unsplash</TabsTrigger>
            </div>
            <div className="grow-0">
              <Button
                onClick={onRemove}
                size="sm"
                className="px-2 py-1"
                variant="hint"
              >
                Remove
              </Button>
            </div>
          </TabsList>
          <TabsContent value="upload" className={styles.tabContent}>
            <SingleImageDropzone
              className="w-full"
              disabled={isSubmitting}
              value={file}
              onChange={handleUpload}
            />
            <p className="p-4 text-center text-xs text-muted dark:text-muted-dark">
              Images wider than 1500 pixels work best.
            </p>
          </TabsContent>
          <TabsContent value="link" className={styles.tabContent}>
            <UrlForm disabled={isSubmitting} onUrlSubmit={onUrlSubmit} />
            <p className="p-4 text-center text-xs text-muted dark:text-muted-dark">
              Works with any image form the web.
            </p>
          </TabsContent>
          <TabsContent value="unsplash" className={styles.tabContent}>
            <Unsplash
              className="overflow-y-scroll p-0"
              apiKey={unsplashAPIKey}
              onSelect={onUrlSubmit}
            />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
