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
  tabTrigger:
    "relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent p-1 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
  tabTriggerText: "rounded-sm py-1 px-2 hover:bg-primary/5",
  tabRemove: "mx-2 border-none py-1 px-2 shadow-none hover:bg-primary/5",
  tabContent:
    "relative px-4 py-2 [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
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
        align="start"
        className="z-[99999] w-[520px] p-0 shadow-none"
      >
        <Tabs defaultValue="upload" className="relative mt-1 w-full">
          <TabsList className="flex w-full justify-start rounded-none border-b bg-transparent p-0">
            <div className="grow">
              <TabsTrigger value="upload" className={styles.tabTrigger}>
                <p className={styles.tabTriggerText}>Upload</p>
              </TabsTrigger>
              <TabsTrigger value="link" className={styles.tabTrigger}>
                <p className={styles.tabTriggerText}>Link</p>
              </TabsTrigger>
              <TabsTrigger value="unsplash" className={styles.tabTrigger}>
                <p className={styles.tabTriggerText}>Unsplash</p>
              </TabsTrigger>
            </div>
            <div className="grow-0">
              <Button
                onClick={onRemove}
                size="sm"
                className={styles.tabRemove}
                variant="outline"
              >
                Remove
              </Button>
            </div>
          </TabsList>
          <TabsContent value="upload" className={styles.tabContent}>
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
          <TabsContent value="link" className={styles.tabContent}>
            <UrlForm disabled={isSubmitting} onUrlSubmit={onUrlSubmit} />
            <p className="p-4 text-center text-xs text-muted-foreground">
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
