"use client";

import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { toast } from "sonner";
import { stableHash } from "swr/_internal";

import type { Document } from "@acme/prisma";
import { IconBlock } from "@acme/ui/custom";
import { Button, Input, Skeleton } from "@acme/ui/shadcn";

import { theme } from "~/constants/theme";
import { toIconInfo, type UpdateDocumentHandler } from "~/lib";

export interface TitleProps {
  page: Document;
  editable?: boolean;
  onUpdate?: UpdateDocumentHandler;
}

const Title = ({ page, editable = true, onUpdate }: TitleProps) => {
  const _ = useState(() => toIconInfo(page.icon));
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
  /** Handlers */
  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
      if (title !== page.title) {
        void onUpdate?.({ id: page.id, title });
        toast.success(`Renamed document "${title}"`);
      }
    }
  };

  return (
    <div className={theme.flex.gap1}>
      <IconBlock
        key={stableHash(page.icon)}
        defaultIcon={toIconInfo(page.icon)}
        editable={false}
      />
      {editable && isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className="h-7 rounded-sm px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="h-auto rounded-sm p-1 font-normal"
        >
          <span className="truncate">{page.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return (
    <div className={theme.flex.gap1}>
      <Skeleton className="h-5 w-5 rounded-sm" />
      <Skeleton className="h-6 w-20 rounded-sm" />
    </div>
  );
};

export default Title;
