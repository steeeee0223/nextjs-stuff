"use client";

import Image from "next/image";
import { useOrganization, useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";

import { Button, useTreeAction } from "@acme/ui/components";
import { useAction } from "@acme/ui/hooks";
import { cn } from "@acme/ui/lib";

import { createDocument } from "~/actions";
import { theme } from "~/constants/theme";

interface Params {
  params: { role: string; clientId: string };
}

const Client = ({ params: { role } }: Params) => {
  const { user } = useUser();
  const { organization } = useOrganization();
  const name = role === "organization" ? organization?.name : user?.firstName;

  const { dispatch } = useTreeAction();
  const { execute } = useAction(createDocument, {
    onSuccess: (data) => {
      const { id, title, isArchived, parentId } = data;
      console.log(`Document created: ${title}`);
      dispatch({ type: "add", payload: [{ id, title, isArchived, parentId }] });
    },
    onError: (e) => console.log(e),
  });
  const onSubmit = () => {
    execute({ title: "Untitled", parentId: undefined })
      .then(() => console.log(`processing`))
      .catch((e) => console.log(e));
  };

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
      <h2 className="text-lg font-medium">Welcome to {name}&apos;s WorXpace</h2>
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
