/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { ImageIcon } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { stableHash } from "swr/_internal";

import type { CoverImage, Document } from "@acme/prisma";
import { Cover, CoverPicker, IconBlock, type IconInfo } from "@acme/ui/custom";
import { cn } from "@acme/ui/lib";
import { Button, Skeleton, type ButtonProps } from "@acme/ui/shadcn";

import { theme } from "~/constants/theme";
import { useEdgeStore } from "~/hooks";
import { toIcon, toIconInfo, UpdateDocumentHandler } from "~/lib";

/** Styles */
const buttonProps: ButtonProps = {
  className: "text-muted-foreground text-xs",
  variant: "outline",
  size: "sm",
};

interface DocHeaderProps {
  document: Document;
  preview?: boolean;
  onUpdate?: UpdateDocumentHandler;
}

const DocHeader = ({ document, preview, onUpdate }: DocHeaderProps) => {
  /** Input */
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(document.title);
  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(document.title);
      inputRef.current?.focus();
    }, 0);
  };
  const disableInput = () => setIsEditing(false);
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
    }
  };
  /** Edgestore */
  const { edgestore } = useEdgeStore();
  const deleteFile = async (data?: CoverImage | IconInfo | null) => {
    if (data?.type !== "file") return;
    const url = data.url;
    try {
      await edgestore.publicFiles.delete({ url });
    } catch {
      console.log(`[edgestore] file with url not found: ${url}`);
    }
  };
  /** Tree Actions */
  const onUpdateTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
    void onUpdate?.({
      id: document.id,
      title: e.currentTarget.value ?? value,
      log: true,
    });
  };
  const onIconSelect = async (iconInfo: IconInfo) => {
    await deleteFile(toIconInfo(document.icon));
    await onUpdate?.({ id: document.id, icon: toIcon(iconInfo) });
  };
  const onRemoveIcon = () => onUpdate?.({ id: document.id, icon: null });
  const onUploadIcon = async (file: File) => {
    const replaceTargetUrl =
      document.icon?.type === "file" ? document.icon.src : undefined;
    const { url } = await edgestore.publicFiles.upload({
      file,
      options: { replaceTargetUrl },
    });
    await onUpdate?.({
      id: document.id,
      icon: { type: "file", src: url },
      log: true,
    });
    console.log(`[doc:icon] uploaded to edgestore: ${url}`);
  };
  const onUploadCover = async (file: File) => {
    const replaceTargetUrl =
      document.coverImage?.type === "file"
        ? document.coverImage.url
        : undefined;
    const { url } = await edgestore.publicFiles.upload({
      file,
      options: { replaceTargetUrl },
    });
    await onUpdate?.({
      id: document.id,
      coverImage: { type: "file", url },
      log: true,
    });
    console.log(`[doc:cover] uploaded to edgestore: ${url}`);
  };
  const onUploadUrl = async (url: string) => {
    await deleteFile(document.coverImage);
    await onUpdate?.({
      id: document.id,
      coverImage: { type: "url", url },
      log: true,
    });
  };
  const onRemoveCover = async () => {
    await deleteFile(document.coverImage);
    await onUpdate?.({ id: document.id, coverImage: null, log: true });
  };

  return (
    <>
      <Cover
        unsplashAPIKey={process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!}
        preview={preview}
        url={document.coverImage?.url ?? null}
        onUploadChange={onUploadCover}
        onUrlChange={onUploadUrl}
        onRemove={onRemoveCover}
      />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <div className="group relative pl-[54px]">
          <IconBlock
            key={stableHash(document.icon)}
            defaultIcon={toIconInfo(document.icon)}
            editable={!preview}
            size="xl"
            onRemove={onRemoveIcon}
            onSelect={onIconSelect}
            onUpload={onUploadIcon}
          />
          <div
            className={cn(
              theme.flex.gap1,
              "py-4 opacity-0 group-hover:opacity-100",
            )}
          >
            {!document.coverImage && !preview && (
              <CoverPicker
                asChild
                unsplashAPIKey={process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!}
                onUploadChange={onUploadCover}
                onUrlChange={onUploadUrl}
                onRemove={onRemoveCover}
              >
                <Button {...buttonProps}>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Add cover
                </Button>
              </CoverPicker>
            )}
          </div>
          {isEditing && !preview ? (
            <TextareaAutosize
              ref={inputRef}
              onBlur={disableInput}
              onKeyDown={onKeyDown}
              value={value}
              onChange={onUpdateTitle}
              className="resize-none break-words bg-transparent text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
            />
          ) : (
            <div
              onClick={enableInput}
              className="break-words pb-[11.5px] text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
            >
              {document.title}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export function DocHeaderSkeleton() {
  return (
    <>
      <Cover.Skeleton />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <div className="space-y-4 pl-8 pt-4">
          <Skeleton className="h-14 w-[50%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[40%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </div>
    </>
  );
}

export default DocHeader;
