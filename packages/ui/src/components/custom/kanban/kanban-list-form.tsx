/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { useImperativeHandle, useRef, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import type * as z from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import type { KanbanList } from "./index.types";
import { useKanbanAction } from "./kanban-action-context";
import { useKanban } from "./kanban-context";
import { TitleSchema } from "./utils";

export interface ListFormProps {
  onCreateList?: (list: KanbanList) => void;
}

export const KanbanListForm = ({ onCreateList }: ListFormProps) => {
  /** Form */
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof TitleSchema>>({
    resolver: zodResolver(TitleSchema),
    defaultValues: { title: "" },
  });
  /** Input */
  const { ref } = form.register("title");
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current);
  const [isEditing, setIsEditing] = useState(false);
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus());
  };
  const disableEditing = () => setIsEditing(false);
  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") disableEditing();
  });
  useOnClickOutside(formRef, disableEditing);
  /** Action */
  const { getMaxListOrder } = useKanban();
  const { dispatch } = useKanbanAction();
  const onSubmit = (values: z.infer<typeof TitleSchema>) => {
    startTransition(() => {
      const payload: KanbanList = {
        id: uuidv4(),
        title: values.title,
        order: getMaxListOrder() + 1,
        items: [],
      };
      dispatch({ type: "add:list", payload });
      onCreateList?.(payload);
    });
    form.reset();
    disableEditing();
  };

  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            ref={formRef}
            className="w-full space-y-4 rounded-md bg-white p-3 shadow-md"
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
                      placeholder="Enter list title..."
                      ref={inputRef}
                      className={cn(
                        "border-transparent hover:border-input focus:border-input",
                        "h-7 px-2 py-1 text-sm font-medium transition",
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-1">
              <Button
                type="submit"
                disabled={isPending}
                size="sm"
                className="mr-2"
              >
                Add List
              </Button>
              <Button onClick={disableEditing} size="sm" variant="ghost">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <button
          onClick={enableEditing}
          className={cn(
            "flex items-center text-neutral-700",
            "w-full rounded-md bg-white/80 p-3 text-sm font-medium transition hover:bg-white/50",
          )}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add a list
        </button>
      )}
    </li>
  );
};
