import type { StateCreator } from "zustand";

import type { Page } from "../types";

interface PageState {
  pages: Record<string, Page>;
  activePage: string | null;
}
interface PageActions {
  setActivePage: (pageId: string | null) => void;
  setPages: (pages: Page[]) => void;
  addPage: (workspace: Page) => void;
  updatePage: (
    pageId: string,
    data: Partial<
      Pick<
        Page,
        | "title"
        | "icon"
        | "isArchived"
        | "isPublished"
        | "coverImage"
        | "isFavorite"
      >
    >,
  ) => void;
  deletePage: (pageId: string) => void;
  resetPages: () => void;
}

export type PageSlice = PageState & PageActions;

const initialState: PageState = {
  pages: {},
  activePage: null,
};

export const createPageSlice: StateCreator<PageSlice, [], [], PageSlice> = (
  set,
) => ({
  ...initialState,
  setActivePage: (pageId) =>
    set((state) => {
      if (!(pageId && pageId in state.pages)) return {};
      return { activePage: pageId };
    }),
  setPages: (pages) =>
    set({
      pages: pages.reduce(
        (acc, workspace) => ({ ...acc, [workspace.id]: workspace }),
        {},
      ),
    }),
  addPage: (workspace) =>
    set(({ pages }) => ({
      pages: { ...pages, [workspace.id]: workspace },
    })),
  updatePage: (pageId, data) =>
    set(({ pages }) => ({
      pages: {
        ...pages,
        [pageId]: { ...pages[pageId]!, ...data },
      },
    })),
  deletePage: (pageId) =>
    set(({ pages }) => {
      delete pages[pageId];
      return { pages };
    }),
  resetPages: () => set(initialState),
});
