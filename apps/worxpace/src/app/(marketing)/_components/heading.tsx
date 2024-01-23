"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@acme/ui/components";

import { theme } from "~/constants/theme";

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

      <Button>
        Get Started <ArrowRight className={`${theme.size.icon} ml-2`} />
      </Button>
    </div>
  );
};

export default Heading;
