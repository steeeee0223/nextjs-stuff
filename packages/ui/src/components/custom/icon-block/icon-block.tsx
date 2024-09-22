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
      <PopoverTrigger asChild>
        <Button
          variant="subitem"
          className={cn(
            "p-0 disabled:opacity-100",
            iconBlockVariants({ size }),
            className,
          )}
          disabled={!editable && !onClick}
          onClick={!editable ? onClick : undefined}
        >
          <IconDisplay iconInfo={currentIcon} className="size-full" />
        </Button>
      </PopoverTrigger>
      {editable && (
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
                  onClick={remove}
                  variant="hint"
                  size="sm"
                  className="my-1 p-1"
                >
                  Remove
                </Button>
              </div>
            </TabsList>
            <TabsContent value="emoji" className="p-0 pt-3">
              <EmojiPicker
                height="300px"
                width="406px"
                theme={theme}
                skinTonesDisabled
                onEmojiClick={handleEmojiSelect}
              />
            </TabsContent>
            <TabsContent value="lucide" className="px-5 pb-2 pt-4">
              <LucidePicker
                onSelect={handleLucideSelect}
                onColorChange={setColor}
              />
            </TabsContent>
            <TabsContent value="file" className="px-5 pb-2 pt-4">
              <UrlForm disabled={isPending} onUrlSubmit={handleUrlSubmit} />
              <ImageDropzone
                className="mt-6 w-full"
                disabled={isPending}
                value={file}
                onChange={handleUpload}
              />
              <p className="p-4 text-center text-xs text-muted dark:text-muted-dark">
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
