"use client";

import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

import { useTree } from "@acme/ui/custom";
import { cn } from "@acme/ui/lib";
import { Button } from "@acme/ui/shadcn";

import { createDocument } from "~/actions";
import { theme } from "~/constants/theme";
import { useClient } from "~/hooks";
import { toIconInfo } from "~/lib";

const Client = () => {
  const { workspace, workspaceId } = useClient();
  /** Action */
  const { dispatch } = useTree();
  const { trigger } = useSWRMutation(`doc:${workspaceId}`, createDocument, {
    onSuccess: (data) => {
      const { id, title, parentId, icon, type: group } = data;
      toast.success(`Document created: ${title}`);
      dispatch({
        type: "add",
        payload: [{ id, title, group, parentId, icon: toIconInfo(icon) }],
      });
    },
    onError: (e: Error) => toast.error(e.message),
  });
  const onSubmit = () =>
    void trigger({ title: "Untitled", parentId: undefined, type: "document" });

  return (
    <div
      className={cn(
        theme.flex.center,
        "h-full flex-col justify-center space-y-4",
      )}
    >
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {workspace}&apos;s WorXpace
      </h2>
      <form action={onSubmit}>
        <Button type="submit">
          <PlusCircle className={cn(theme.size.icon, "mr-2")} />
          Create a note
        </Button>
      </form>
    </div>
  );
};

export default Client;
