"use client";

import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { toast } from "sonner";
import { stableHash } from "swr/_internal";
import useSWRMutation from "swr/mutation";

import { Document } from "@acme/prisma";
import { IconBlock, useTree } from "@acme/ui/custom";
import { Button, Input, Skeleton } from "@acme/ui/shadcn";

import { updateInternalDocument } from "~/actions";
import { theme } from "~/constants/theme";
import { toIconInfo } from "~/lib";

interface TitleProps {
  page: Document;
}

const Title = ({ page }: TitleProps) => {
  const [icon, _setIcon] = useState(() => toIconInfo(page.icon));
  const [title, setTitle] = useState(page.title);
  /** Input */
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const enableInput = () => {
    // setTitle(page.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };
  const disableInput = () => setIsEditing(false);
  /** Action - Rename */
  const { dispatch } = useTree();
  const { trigger: update } = useSWRMutation(
    [page.id, false],
    updateInternalDocument,
    {
      onSuccess: (data) => {
        dispatch({
          type: "update:item",
          payload: { ...data, icon: toIconInfo(data.icon), group: data.type },
        });
        toast.success(`Renamed document "${data.title}"`);
      },
      optimisticData: () => ({ ...page, title, icon }),
      rollbackOnError: true,
    },
  );
  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
      if (title !== page.title) void update({ id: page.id, title, log: true });
    }
  };

  return (
    <div className={theme.flex.gap1}>
      <IconBlock
        key={stableHash(page.icon)}
        defaultIcon={toIconInfo(page.icon)}
        editable={false}
      />
      {isEditing ? (
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
