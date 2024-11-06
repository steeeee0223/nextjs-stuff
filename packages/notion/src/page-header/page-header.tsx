"use client";

import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { ImageIcon } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

import { Button, Skeleton } from "@swy/ui/shadcn";
import {
  Cover,
  CoverPicker,
  IconBlock,
  IconMenu,
  type IconInfo,
} from "@swy/ui/shared";

import { generateDefaultIcon } from "../common";
import { PageContextInterface, usePage } from "../page-provider";
import { Page, UploadFile } from "../types";

interface PageHeaderProps {
  unsplashAPIKey?: string;
  preview?: boolean;
  onUpload?: UploadFile;
}

export const PageHeader = (props: PageHeaderProps) => {
  const { page, onUpdate } = usePage();
  if (!page) return null;
  return <PageHeader.Content page={page} onUpdate={onUpdate} {...props} />;
};

interface PageHeaderContentProps extends PageHeaderProps {
  page: Page;
  onUpdate?: PageContextInterface["onUpdate"];
}

PageHeader.Content = function PageHeaderContent({
  unsplashAPIKey,
  preview,
  page,
  onUpdate,
  onUpload,
}: PageHeaderContentProps) {
  /** Title */
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(page.title);
  const enableInput = () => {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      setValue(page.title);
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
  const onTitleUpdate = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onUpdate?.(page.id, { title: e.target.value });
  };
  /** Icon */
  const icon = page.icon ?? generateDefaultIcon(page.type);
  const onIconSelect = (icon: IconInfo) => onUpdate?.(page.id, { icon });
  const onIconRemove = () =>
    onUpdate?.(page.id, { icon: generateDefaultIcon(page.type) });
  const onIconUpload = async (file: File) => {
    const replaceTargetUrl = icon.type === "file" ? icon.url : undefined;
    const url = URL.createObjectURL(file);
    onUpdate?.(page.id, { icon: { type: "file", url } });
    const res = await onUpload?.(file, { replaceTargetUrl });
    if (res?.url) onUpdate?.(page.id, { icon: { type: "file", url: res.url } });
  };
  /** Cover */
  const onCoverUpload = async (file: File) => {
    const replaceTargetUrl =
      page.coverImage?.type === "file" ? page.coverImage.url : undefined;
    const url = URL.createObjectURL(file);
    onUpdate?.(page.id, { coverImage: { type: "file", url } });
    const res = await onUpload?.(file, { replaceTargetUrl });
    if (res?.url)
      onUpdate?.(page.id, { coverImage: { type: "file", url: res.url } });
  };
  const onCoverUrlChange = (url: string) =>
    onUpdate?.(page.id, { coverImage: { type: "url", url } });
  const onCoverRemove = () => onUpdate?.(page.id, { coverImage: null });
  return (
    <>
      <Cover
        unsplashAPIKey={unsplashAPIKey ?? ""}
        preview={preview}
        url={page.coverImage?.url ?? null}
        onUploadChange={onCoverUpload}
        onUrlChange={onCoverUrlChange}
        onRemove={onCoverRemove}
      />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <div className="group relative pl-[54px]">
          <IconMenu
            disabled={preview}
            onRemove={onIconRemove}
            onSelect={onIconSelect}
            onUpload={onIconUpload}
          >
            <IconBlock icon={icon} size="xl" />
          </IconMenu>
          <div className="flex items-center gap-x-1 py-4 opacity-0 group-hover:opacity-100">
            {!page.coverImage && !preview && (
              <CoverPicker
                unsplashAPIKey={unsplashAPIKey ?? ""}
                onUploadChange={onCoverUpload}
                onUrlChange={onCoverUrlChange}
                onRemove={onCoverRemove}
              >
                <Button variant="hint" size="sm">
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
              onChange={onTitleUpdate}
              className="resize-none break-words bg-transparent text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
            />
          ) : (
            <div
              role="button"
              tabIndex={-1}
              onClick={enableInput}
              onKeyDown={enableInput}
              className="break-words pb-[11.5px] text-5xl font-bold text-[#3F3F3F] outline-none dark:text-[#CFCFCF]"
            >
              {page.title}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

PageHeader.Skeleton = function PageHeaderSkeleton() {
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
};
