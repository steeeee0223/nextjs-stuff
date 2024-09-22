"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@acme/ui/shadcn";

const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
        Your Ideas , Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">Steeeee WorXpace</span>
      </h1>
      <h3 className="text-base font-medium sm:text-xl md:text-2xl">
        Steeeee WorXpace is the connected workspace where <br />
        better, faster work happens.
      </h3>
      <Link href="/select-role">
        <Button className="mt-4">
          Get Started <ArrowRight className="ml-2 size-4" />
        </Button>
      </Link>
    </div>
  );
};

export default Heading;
