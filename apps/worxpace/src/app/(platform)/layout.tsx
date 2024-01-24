import { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";

export default function PlatformLayout({ children }: PropsWithChildren) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
