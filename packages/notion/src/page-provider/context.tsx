"use client";

import { createContext, useContext } from "react";

import type { Log } from "@swy/ui/shared";
import type { User } from "@swy/validators";

import type { Page } from "../types";

export interface PageContextInterface {
  isLoading?: boolean;
  page: Page | null;
  currentUser?: User | null;
  otherUsers?: User[] | null;
  fetchLogs?: (pageId: string) => Promise<Log[]>;
  onUpdate?: (
    pageId: string,
    data: Partial<
      Pick<Page, "title" | "icon" | "isArchived" | "isPublished" | "coverImage">
    >,
  ) => void;
  onChangeState?: (
    pageId: string,
    action: "archive" | "restore" | "delete",
  ) => void;
}

export const PageContext = createContext<PageContextInterface | null>(null);

export function usePage(): PageContextInterface {
  const object = useContext(PageContext);
  if (!object) throw new Error("usePage must be used within PageProvider");
  return object;
}
