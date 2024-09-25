"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@swy/ui/shadcn";

import { usePlatform } from "~/hooks";

interface ErrorProps {
  error: Error & { digest?: string };
  reset?: () => void;
}

const Error = ({ error }: ErrorProps) => {
  const { workspaceId } = usePlatform();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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
        <Link href={`/workspace/${workspaceId}`}>Go back</Link>
      </Button>
    </div>
  );
};

export default Error;
