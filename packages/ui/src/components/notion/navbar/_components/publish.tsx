"use client";

import { useState, useTransition } from "react";
import { Check, Copy, Globe } from "lucide-react";
import { toast } from "sonner";

import { Hint } from "@/components/custom/hint";
import type { Page } from "@/components/notion/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOrigin } from "@/hooks";

interface PublishProps {
  page: Page;
  onUpdate?: (id: string, isPublished: boolean) => void;
}

export const Publish = ({ page, onUpdate }: PublishProps) => {
  const [isPublished, setIsPublished] = useState(page.isPublished);

  /** Url */
  const origin = useOrigin();
  const url = `${origin}/preview/d/${page.id}`;
  /** Copy */
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  /** Actions - Publish & Unpublish */
  const [isPending, startTransition] = useTransition();
  const handlePublish = () => {
    startTransition(() => {
      onUpdate?.(page.id, !isPublished);
      setIsPublished((prev) => !prev);
    });
    !isPublished
      ? toast.success(`Published Document: "${page.title}"`)
      : toast.success(`Unpublished Document: "${page.title}"`);
  };

  return (
    <Popover>
      <Hint description="Share or publish to the web" asChild>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="item"
            disabled={page.type !== "document"}
            className="ml-1 h-7 px-2"
          >
            Share
            {isPublished && <Globe className="ml-2 size-4 text-blue" />}
          </Button>
        </PopoverTrigger>
      </Hint>
      <PopoverContent
        className="w-[400px]"
        align="end"
        alignOffset={8}
        forceMount
      >
        <Tabs defaultValue="publish" className="relative my-0.5 w-full">
          <TabsList>
            <TabsTrigger value="publish">Publish</TabsTrigger>
          </TabsList>
          <TabsContent value="publish" className="p-5 pt-3">
            {isPublished ? (
              <div className="space-y-4">
                <div className="flex items-center gap-x-2 text-sm text-blue">
                  <Globe className="size-4 animate-pulse" />
                  <p className="font-medium">This note is live on web.</p>
                </div>
                <div className="flex items-center">
                  <Input
                    className="flex-1 truncate rounded-r-none border-r-0"
                    value={url}
                    disabled
                  />
                  <Button
                    variant="secondary"
                    onClick={onCopy}
                    disabled={copied}
                    size="icon-md"
                    className="rounded-l-none"
                  >
                    {copied ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="red"
                  className="w-full"
                  disabled={isPending}
                  onClick={handlePublish}
                >
                  Unpublish
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
                <Globe className="size-8 text-icon dark:text-icon-dark" />
                <p className="text-sm font-medium">Publish this note</p>
                <span className="text-xs text-muted dark:text-muted-dark">
                  Share your work with others.
                </span>
                <Button
                  variant="blue"
                  disabled={isPending || page.isArchived}
                  onClick={handlePublish}
                  className="mt-2 w-full"
                  size="sm"
                >
                  Publish
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};
