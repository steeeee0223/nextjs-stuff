/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import dynamic from "next/dynamic";
import { ImageIcon, Smile, X } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";

import type { Document } from "@acme/prisma";
import {
  Button,
  Cover,
  CoverPicker,
  IconPicker,
  Skeleton,
  useTreeAction,
  type ButtonProps,
} from "@acme/ui/components";
import { useAction } from "@acme/ui/hooks";
import { cn } from "@acme/ui/lib";

import { updateDocument } from "~/actions";
import { theme } from "~/constants/theme";
import { useEdgeStore } from "~/hooks";

interface ToolbarProps {
  document: Document;
  preview?: boolean;
}

const Toolbar = ({ document, preview }: ToolbarProps) => {
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
  const deleteFile = async (onComplete?: () => Promise<void>) => {
    try {
      if (document.coverImage)
        await edgestore.publicFiles.delete({
          url: document.coverImage,
        });
    } catch {
      console.log(
        `[edgestore] file with url not found: ${document.coverImage}`,
      );
    }
    await onComplete?.();
  };
  /** Tree Actions */
  const { dispatch } = useTreeAction();
  /** Action - update */
  const { execute: update } = useAction(updateDocument, {
    onSuccess: (data) => dispatch({ type: "update", payload: data }),
    onError: (e) => toast.error(e),
  });
  const onUpdateTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
    update({
      id: document.id,
      title: e.currentTarget.value || "Untitled",
    })
      .then(() => console.log(`updating title`))
      .catch((e) => console.log(e));
  };
  const onIconSelect = (icon: string) => update({ id: document.id, icon });
  const onRemoveIcon = () => update({ id: document.id, icon: null });
  const onUploadCover = async (file: File) => {
    const res = await edgestore.publicFiles.upload({
      file,
      options: { replaceTargetUrl: document.coverImage ?? undefined },
    });
    console.log(`uploaded to edgestore: ${res.url}`);
    update({ id: document.id, coverImage: res.url })
      .then(() => console.log(`updating title`))
      .catch((e) => console.log(e));
  };
  const onUnsplashCover = async (url: string) =>
    await deleteFile(() => update({ id: document.id, coverImage: url }));
  const onRemoveCover = async () =>
    await deleteFile(() => update({ id: document.id, coverImage: null }));
  const onUpdateContent = (content: string) =>
    update({ id: document.id, content });
  const onUploadIntoNote = async (file: File) => {
    const res = await edgestore.publicFiles.upload({ file });
    return res.url;
  };
  /** Block Note Editor */
  const BlockNoteEditor = useMemo(
    () => dynamic(() => import("~/components/block-editor"), { ssr: false }),
    [],
  );
  /** Props */
  const buttonProps: ButtonProps = {
    className: "text-muted-foreground text-xs",
    variant: "outline",
    size: "sm",
  };

  return (
    <>
      <Cover
        preview={preview}
        url={document.coverImage}
        onUploadChange={onUploadCover}
        onUnsplash={onUnsplashCover}
        onRemove={onRemoveCover}
      />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <div className="group relative pl-[54px]">
          {!!document.icon && !preview && (
            <div className={cn(theme.flex.gap2, "group/icon pt-6")}>
              <IconPicker onChange={onIconSelect}>
                <p className="text-6xl transition hover:opacity-75">
                  {document.icon}
                </p>
              </IconPicker>
              <Button
                onClick={onRemoveIcon}
                className="rounded-full text-xs text-muted-foreground opacity-0 transition group-hover/icon:opacity-100"
                variant="outline"
                size="icon"
              >
                <X className={theme.size.icon} />
              </Button>
            </div>
          )}
          {!!document.icon && preview && (
            <p className="pt-6 text-6xl">{document.icon}</p>
          )}
          <div
            className={cn(
              theme.flex.gap1,
              "py-4 opacity-0 group-hover:opacity-100",
            )}
          >
            {!document.icon && !preview && (
              <IconPicker asChild onChange={onIconSelect}>
                <Button {...buttonProps}>
                  <Smile className={cn(theme.size.icon, "mr-2")} />
                  Add icon
                </Button>
              </IconPicker>
            )}
            {!document.coverImage && !preview && (
              <CoverPicker
                asChild
                onUploadChange={onUploadCover}
                onUnsplash={onUnsplashCover}
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
        <BlockNoteEditor
          editable={!preview}
          initialContent={document.content}
          onChange={onUpdateContent}
          onUpload={onUploadIntoNote}
        />
      </div>
    </>
  );
};

export function ToolbarSkeleton() {
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

export default Toolbar;
