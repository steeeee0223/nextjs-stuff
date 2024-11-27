import { Poppins } from "next/font/google";
import Image from "next/image";

import { cn } from "@swy/ui/lib";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function Logo() {
  return (
    <div className="hidden items-center gap-x-2 md:flex">
      <Image
        className="dark:hidden"
        src="/notion.svg"
        height="40"
        width="40"
        alt="Logo"
      />
      <Image
        className="hidden dark:block"
        src="/notion-dark.svg"
        height="40"
        width="40"
        alt="Logo"
      />
      <p className={cn("font-semibold", font.className)}>WorXpace</p>
    </div>
  );
}
