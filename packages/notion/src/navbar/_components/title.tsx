"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { toast } from "sonner";
import stableHash from "stable-hash";

import { Button, Input, Skeleton } from "@swy/ui/shadcn";
import { IconBlock } from "@swy/ui/shared";

import { generateDefaultIcon } from "../../common";
import type { Page } from "../../types";

export interface TitleProps {
  editable?: boolean;
  page: Page;
  onUpdate?: (id: string, title: string) => void;
}

export const Title = ({ editable = true, page, onUpdate }: TitleProps) => {
  const [title, setTitle] = useState(page.title);
  /** Input */
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const enableInput = () => {
    if (editable) {
      setIsEditing(true);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
      }, 0);
    }
  };
  const disableInput = () => setIsEditing(false);
  /** Icon */
  const icon = page.icon ?? generateDefaultIcon(page.type);
  /** Handlers */
  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
      if (title !== page.title) {
        onUpdate?.(page.id, title);
        toast.success(`Renamed document "${title}"`);
      }
    }
  };

  useEffect(() => {
    setTitle(page.title);
  }, [page]);

  return (
    <div className="flex items-center gap-x-1">
      <IconBlock
        key={stableHash(icon)}
        defaultIcon={icon}
        editable={false}
        className="flex-shrink-0"
      />
      {editable && isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="item"
          size="sm"
          className="h-auto p-1"
        >
          <span className="truncate">{page.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return (
    <div className="flex items-center gap-x-1">
      <Skeleton className="h-5 w-5" />
      <Skeleton className="h-6 w-20" />
    </div>
  );
};
