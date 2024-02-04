"use client";

import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

import { Button, useTreeAction } from "@acme/ui/components";
import { useAction } from "@acme/ui/hooks";
import { cn } from "@acme/ui/lib";

import { createDocument } from "~/actions";
import { theme } from "~/constants/theme";
import { useClient } from "~/hooks";

const Client = () => {
  const { workspace } = useClient();
  /** Action */
  const { dispatch } = useTreeAction();
  const { execute } = useAction(createDocument, {
    onSuccess: (data) => {
      const { id, title, isArchived, parentId, icon } = data;
      toast.success(`Document created: ${title}`);
      dispatch({
        type: "add",
        payload: [{ id, title, isArchived, parentId, icon }],
      });
    },
    onError: (e) => toast.error(e),
  });
  const onSubmit = () =>
    execute({ title: "Untitled", parentId: undefined })
      .then(() => console.log(`processing`))
      .catch((e) => console.log(e));

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
