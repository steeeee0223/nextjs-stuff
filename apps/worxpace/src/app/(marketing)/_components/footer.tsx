import { Button } from "@acme/ui/components";
import { cn } from "@acme/ui/lib";

import { theme } from "~/constants/theme";
import Logo from "./logo";

export default function Footer() {
  return (
    <div
      className={cn(
        theme.flex.center,
        theme.background.navbar,
        "z-50 w-full p-6",
      )}
    >
      <Logo />
      <div
        className={cn(
          theme.flex.gap2,
          "w-full justify-between text-muted-foreground md:ml-auto md:justify-end",
        )}
      >
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
}
