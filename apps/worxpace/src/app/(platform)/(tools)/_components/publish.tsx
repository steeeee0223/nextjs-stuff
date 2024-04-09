"use client";

import { useState } from "react";
import { Check, Copy, Globe } from "lucide-react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

import type { Document } from "@acme/prisma";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@acme/ui/components";
import { useOrigin } from "@acme/ui/hooks";
import { cn } from "@acme/ui/lib";

import { updateInternalDocument } from "~/actions";
import { theme } from "~/constants/theme";

interface PublishProps {
  page: Document;
}

const Publish = ({ page }: PublishProps) => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trigger: update } = useSWRMutation(
    [page.id, false],
    updateInternalDocument,
    {
      onSuccess: (data) => {
        setIsSubmitting(false);
        setIsPublished(data.isPublished);
        data.isPublished
          ? toast.success(`Published Document: "${data.title}"`)
          : toast.success(`Unpublished Document: "${data.title}"`);
      },
      onError: (e: Error) => toast(e.message),
    },
  );
  const handlePublish = () => {
    setIsSubmitting(true);
    void update({ id: page.id, isPublished: !isPublished, log: true });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost" disabled={page.type !== "document"}>
          Publish
          {isPublished && (
            <Globe className={cn(theme.size.icon, "ml-2 text-sky-500")} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="z-99999 w-72"
        align="end"
        alignOffset={8}
        forceMount
      >
        {isPublished ? (
          <div className="space-y-4">
            <div className={theme.flex.gap2}>
              <Globe
                className={cn(theme.size.icon, "animate-pulse text-sky-500")}
              />
              <p className="text-xs font-medium text-sky-500">
                This note is live on web.
              </p>
            </div>
            <div className={theme.flex.center}>
              <input
                className="h-8 flex-1 truncate rounded-l-md border bg-muted px-2 text-xs"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className={theme.size.icon} />
                ) : (
                  <Copy className={theme.size.icon} />
                )}
              </Button>
            </div>
            <Button
              size="sm"
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={handlePublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className={cn(theme.flex.center, "flex-col justify-center")}>
            <Globe className="mb-2 h-8 w-8 text-muted-foreground" />
            <p className="mb-2 text-sm font-medium">Publish this note</p>
            <span className="mb-4 text-xs text-muted-foreground">
              Share your work with others.
            </span>
            <Button
              disabled={isSubmitting || page.isArchived}
              onClick={handlePublish}
              className="w-full text-xs"
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
