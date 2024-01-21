/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import type { KeyboardEventHandler } from "react";
import { forwardRef, useRef, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import type * as z from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Textarea,
} from "@/components/ui";
import { TitleSchema } from "./utils";

interface KanbanItemFormProps {
  listId: string;
  enableEditing: VoidFunction;
  disableEditing: VoidFunction;
  isEditing: boolean;
  onCreateItem?: (title: string) => void;
}

export const KanbanItemForm = forwardRef<
  HTMLTextAreaElement,
  KanbanItemFormProps
>(({ enableEditing, disableEditing, isEditing, onCreateItem }, ref) => {
  /** Form */
  const form = useForm<z.infer<typeof TitleSchema>>({
    resolver: zodResolver(TitleSchema),
    defaultValues: { title: "" },
  });
  const formRef = useRef<HTMLFormElement>(null);
  useOnClickOutside(formRef, disableEditing);
  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") disableEditing();
  });

  const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };
  /** Action */
  const [isPending, startTransition] = useTransition();
  const onSubmit = (values: z.infer<typeof TitleSchema>) => {
    startTransition(() => {
      onCreateItem?.(values.title);
      form.reset();
    });
  };

  return isEditing ? (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-1 space-y-4 px-1 py-0.5"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  ref={ref}
                  onKeyDown={onTextareaKeyDown}
                  placeholder="Enter a title for this item..."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-1">
          <Button type="submit" disabled={isPending} size="sm">
            Add item
          </Button>
          <Button onClick={disableEditing} size="sm" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  ) : (
    <div className="px-2 pt-2">
      <Button
        onClick={enableEditing}
        className="h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
        size="sm"
        variant="ghost"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add an item
      </Button>
    </div>
  );
});

KanbanItemForm.displayName = "KanbanItemForm";
