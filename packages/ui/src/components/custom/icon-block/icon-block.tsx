"use client";

import { MouseEventHandler, useMemo, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { cva, type VariantProps } from "class-variance-authority";
import { Theme, type EmojiClickData } from "emoji-picker-react";
import { useTheme } from "next-themes";

import "./styles.css";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import IconDisplay from "./display";
import { useIconBlock } from "./icon-block-context";
import type { LucideName } from "./index.types";
import { UrlForm } from "./url-form";

/** Styles */
const styles = {
  popoverTrigger:
    "flex items-center rounded-sm text-muted-foreground hover:bg-primary/5 cursor-pointer",
  tabTrigger:
    "relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
  tabContent:
    "relative px-5 py-2 [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
};

const iconBlockVariants = cva("", {
  variants: {
    size: {
      sm: "size-5 rounded-sm p-0.5 text-sm/4",
      md: "size-10 rounded-md p-1 text-3xl/8",
      lg: "size-16 rounded-md p-1 text-5xl/tight",
      xl: "size-[78px] rounded-lg p-1 text-7xl",
    },
  },
  defaultVariants: { size: "sm" },
});

export interface IconBlockProps extends VariantProps<typeof iconBlockVariants> {
  editable?: boolean;
  className?: string;
  /** @method onClick this fires only if `editable` is set to `false` */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const IconBlock = ({
  className,
  size,
  editable = true,
  onClick,
}: IconBlockProps) => {
  /** Theme */
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? Theme.DARK : Theme.LIGHT;
  /** Icon Info */
  const { currentIcon, setIcon, setColor, remove, upload } = useIconBlock();
  const handleEmojiSelect = ({ emoji }: EmojiClickData) =>
    setIcon({ type: "emoji", emoji });
  const handleLucideSelect = (name: LucideName, color?: string) =>
    setIcon({ type: "lucide", name, color });
  const handleUrlSubmit = (url: string) => setIcon({ type: "file", url });
  /** Upload */
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File>();
  const handleUpload = (file?: File) => {
    if (file) {
      startTransition(() => {
        setFile(file);
        upload(file);
      });
    }
    setFile(undefined);
  };
  /** UI */
  const EmojiPicker = useMemo(
    () => dynamic(() => import("emoji-picker-react"), { ssr: false }),
    [],
  );
  const LucidePicker = useMemo(
    () => dynamic(() => import("./lucide-picker"), { ssr: false }),
    [],
  );
  const ImageDropzone = useMemo(
    () =>
      dynamic(() => import("@/components/dnd/single-image-dropzone"), {
        ssr: false,
      }),
    [],
  );
  return (
    <Popover>
      <PopoverTrigger
        className={styles.popoverTrigger}
        disabled={!editable && !onClick}
        onClick={!editable ? onClick : undefined}
      >
        <IconDisplay
          iconInfo={currentIcon}
          className={cn(iconBlockVariants({ size, className }))}
        />
      </PopoverTrigger>
      {editable && (
        <PopoverContent className="z-[99999] h-[356px] w-[408px] p-0 shadow-none">
          <Tabs defaultValue="emoji" className="relative mt-1 w-full">
            <TabsList className="flex w-full justify-start rounded-none border-b bg-transparent p-0">
              <div className="grow">
                <TabsTrigger value="emoji" className={styles.tabTrigger}>
                  Emojis
                </TabsTrigger>
                <TabsTrigger value="lucide" className={styles.tabTrigger}>
                  Icons
                </TabsTrigger>
                <TabsTrigger value="file" className={styles.tabTrigger}>
                  Upload
                </TabsTrigger>
              </div>
              <div className="grow-0">
                <Button
                  onClick={remove}
                  size="sm"
                  className="mx-2 my-1 border-none p-1 shadow-none hover:bg-primary/5"
                  variant="outline"
                >
                  Remove
                </Button>
              </div>
            </TabsList>
            <TabsContent value="emoji" className={cn(styles.tabContent, "p-0")}>
              <EmojiPicker
                height="300px"
                width="406px"
                theme={theme}
                skinTonesDisabled
                onEmojiClick={handleEmojiSelect}
              />
            </TabsContent>
            <TabsContent value="lucide" className={styles.tabContent}>
              <LucidePicker
                onSelect={handleLucideSelect}
                onColorChange={setColor}
              />
            </TabsContent>
            <TabsContent value="file" className={styles.tabContent}>
              <UrlForm disabled={isPending} onUrlSubmit={handleUrlSubmit} />
              <ImageDropzone
                className="mt-6 w-full border-solid border-primary/10"
                disabled={isPending}
                value={file}
                onChange={handleUpload}
              />
              <p className="p-4 text-center text-xs text-muted-foreground">
                Recommended size is 280 × 280 pixels
              </p>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      )}
    </Popover>
  );
};

IconBlock.Skeleton = function IconSkeleton({
  className,
  size,
}: Pick<IconBlockProps, "size" | "className">) {
  return (
    <div
      className={cn(
        "shrink-0 justify-center",
        iconBlockVariants({ size, className }),
      )}
    >
      {" "}
    </div>
  );
};
