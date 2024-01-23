import Image from "next/image";

import { cn } from "@acme/ui/lib";

import { theme } from "~/constants/theme";

export default function Heroes() {
  return (
    <div className={cn(theme.flex.center, "max-w-5xl flex-col justify-center")}>
      <div className={theme.flex.center}>
        <div className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px] ">
          <Image
            src="/documents.png"
            fill
            className="object-contain dark:hidden"
            alt="Documents"
          />
          <Image
            src="/documents-dark.png"
            fill
            className="hidden object-contain dark:block"
            alt="Documents"
          />
        </div>
        <div className="relative hidden h-[400px] w-[400px] md:block">
          <Image
            src="/reading.png"
            fill
            className="object-contain dark:hidden"
            alt="Reading"
          />
          <Image
            src="/reading-dark.png"
            fill
            className="hidden object-contain dark:block"
            alt="Reading"
          />
        </div>
      </div>
    </div>
  );
}
