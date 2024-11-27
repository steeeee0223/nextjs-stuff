import { Button } from "@swy/ui/shadcn";

import Logo from "./logo";

export default function Footer() {
  return (
    <div className="z-50 flex w-full items-center bg-main p-6">
      <Logo />
      <div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
        <Button variant="item" size="sm">
          Privacy Policy
        </Button>
        <Button variant="item" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
}
