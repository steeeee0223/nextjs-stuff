"use client";

import React, { useEffect } from "react";

import { mockDB } from "~/db";
import { useMockDB } from "~/hooks";

export default function Layout({ children }: React.PropsWithChildren) {
  const { update } = useMockDB();

  useEffect(() => {
    update(mockDB);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">{children}</div>
  );
}
