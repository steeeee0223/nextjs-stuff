/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import type * as z from "zod";
import { useImperativeHandle, useRef, useState, useTransition } from "react";
import { Form, FormControl, FormField, FormItem, Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEventListener } from "usehooks-ts";

import type { KanbanList } from "./index.types";
import { TitleSchema } from "./utils";

interface KanbanListHeaderProps {
  title: string;
  listId: string;
  onUpdateTitle?: (data: Pick<KanbanList, "id" | "title">) => void;
}

export const KanbanListHeader = ({
  listId,
  title,
  onUpdateTitle,
}: KanbanListHeaderProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  /** Form */
  const onBlur = () => formRef.current?.requestSubmit();
  const form = useForm<z.infer<typeof TitleSchema>>({
    resolver: zodResolver(TitleSchema),
    defaultValues: { title },
  });
  /** Input */
  const [isEditing, setIsEditing] = useState(false);
  const { ref } = form.register("title");
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current);
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };
  const disableEditing = () => setIsEditing(false);
  /** Action */
  const [isPending, startTransition] = useTransition();
  const onSubmit = (values: z.infer<typeof TitleSchema>) => {
    startTransition(() => {
      if (values.title !== title) {
        onUpdateTitle?.({ title: values.title, id: listId });
      }
    });
    disableEditing();
  };

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") formRef.current?.requestSubmit();
  });

  return isEditing ? (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 px-[2px]"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  ref={inputRef}
                  onBlur={onBlur}
                  placeholder="Enter list title.."
                  className={cn(
                    "border-transparent hover:border-input focus:border-input",
                    "text-neutral-700",
                    "text-sm font-medium",
                    "h-auto px-[7px]",
                    "bg-transparent focus:bg-white",
                    "truncate transition",
                  )}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <button type="submit" hidden />
      </form>
    </Form>
  ) : (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={enableEditing}
      className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium text-neutral-700"
    >
      {title}
    </div>
  );
};
