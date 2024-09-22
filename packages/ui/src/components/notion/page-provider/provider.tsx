"use client";

import React, { useMemo } from "react";

import { PageContext, type PageContextInterface } from "./context";

export interface PageProviderProps
  extends React.PropsWithChildren,
    PageContextInterface {
  className?: string;
}

export function PageProvider({
  className,
  children,
  isLoading,
  page,
  currentUser,
  otherUsers,
  ...handlers
}: PageProviderProps) {
  const pageContextValues: PageContextInterface = useMemo(
    () => ({
      isLoading,
      page,
      currentUser,
      otherUsers,
      ...handlers,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, page, currentUser, otherUsers],
  );

  return (
    <PageContext.Provider value={pageContextValues}>
      <div className={className}>{children}</div>
    </PageContext.Provider>
  );
}
