import { PropsWithChildren } from "react";

import { Navbar } from "./_components";

export default function MarketingLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full bg-main">
      <Navbar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
}
