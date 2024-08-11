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
  tabTrigger: "p-1",
  tabTriggerText: "rounded-sm py-1 px-2 hover:bg-primary/5",
  tabContent: "px-4 py-2",
};

export interface CoverPickerProps extends PropsWithChildren {
  /** @param unsplashAPIKey - Unsplash Access Key */
  unsplashAPIKey: string;
  asChild?: boolean;
  onUploadChange?: (file: File) => Promise<void>;
  onUrlChange?: (url: string) => Promise<void>;
  onRemove?: () => Promise<void>;
}

export const CoverPicker = ({
  children,
  asChild,
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
  const handleUpload = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);
      await onUploadChange?.(file);
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
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent
        variant="notion"
        align="start"
        className="z-[99999] w-[520px] p-0 shadow-none"
      >
        <Tabs defaultValue="upload" className="relative mt-1 w-full">
          <TabsList variant="notion">
            <div className="grow">
              <TabsTrigger
                value="upload"
                variant="notion"
                className={styles.tabTrigger}
              >
                <p className={styles.tabTriggerText}>Upload</p>
              </TabsTrigger>
              <TabsTrigger
                value="link"
                variant="notion"
                className={styles.tabTrigger}
              >
                <p className={styles.tabTriggerText}>Link</p>
              </TabsTrigger>
              <TabsTrigger
                value="unsplash"
                variant="notion"
                className={styles.tabTrigger}
              >
                <p className={styles.tabTriggerText}>Unsplash</p>
              </TabsTrigger>
            </div>
            <div className="grow-0">
              <Button
                onClick={onRemove}
                size="sm"
                className="mx-2 px-2 py-1"
                variant="hint"
              >
                Remove
              </Button>
            </div>
          </TabsList>
          <TabsContent
            value="upload"
            variant="notion"
            className={styles.tabContent}
          >
            <SingleImageDropzone
              className="w-full border-solid border-primary/10"
              disabled={isSubmitting}
              value={file}
              onChange={handleUpload}
            />
            <p className="p-4 text-center text-xs text-muted-foreground">
              Images wider than 1500 pixels work best.
            </p>
          </TabsContent>
          <TabsContent
            value="link"
            variant="notion"
            className={styles.tabContent}
          >
            <UrlForm disabled={isSubmitting} onUrlSubmit={onUrlSubmit} />
            <p className="p-4 text-center text-xs text-muted-foreground">
              Works with any image form the web.
            </p>
          </TabsContent>
          <TabsContent
            value="unsplash"
            variant="notion"
            className={styles.tabContent}
          >
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
