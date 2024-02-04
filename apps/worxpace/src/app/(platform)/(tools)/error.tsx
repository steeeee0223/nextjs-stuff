"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@acme/ui/components";

import { useClient } from "~/hooks";

const Error = () => {
  const { path } = useClient();
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="/error.png"
        height="300"
        width="300"
        alt="Error"
        className="dark:hidden"
      />
      <Image
        src="/error-dark.png"
        height="300"
        width="300"
        alt="Error"
        className="hidden dark:block"
      />
      <h2 className="text-xl font-medium">Something went wrong!</h2>
      <Button asChild>
        <Link href={path}>Go back</Link>
      </Button>
    </div>
  );
};

export default Error;
