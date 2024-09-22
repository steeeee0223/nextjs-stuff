"use client";

import type { PropsWithChildren } from "react";

const PublicLayout = ({ children }: PropsWithChildren) => {
  return <div className="h-full bg-main">{children}</div>;
};

export default PublicLayout;
