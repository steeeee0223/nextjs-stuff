"use client";

import Image from "next/image";
import { PlusCircle } from "lucide-react";

import { usePlatformStore } from "@swy/notion";
import { Button } from "@swy/ui/shadcn";

interface Params {
  params: { workspaceId: string };
}

const HomePage = ({ params: _ }: Params) => {
  const activeWorkspace = usePlatformStore(
    (state) => state.workspaces[state.activeWorkspace ?? ""],
  );
  /** Action */
  const onSubmit = () => {
    // TODO create doc
  };

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
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
        Welcome to {activeWorkspace?.name ?? "WorXpace"}
      </h2>
      <form action={onSubmit}>
        <Button type="submit">
          <PlusCircle className="mr-2 size-4" />
          Create a note
        </Button>
      </form>
    </div>
  );
};

export default HomePage;
