"use client";

import { useEffect, useState } from "react";

import type { Page } from "../types";

export const useFilter = (pages: Page[]) => {
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState<Page[] | null>(pages);
  const updateFilteredItems = (input: string) => {
    const v = input.trim().toLowerCase();
    const result = pages.filter((page) => page.title.toLowerCase().includes(v));
    setFilteredItems(
      v.length > 0 ? (result.length > 0 ? result : null) : pages,
    );
  };
  const updateSearch = (input: string) => {
    setSearch(input);
    updateFilteredItems(input);
  };

  useEffect(() => {
    setFilteredItems(pages);
  }, [pages]);

  return {
    search,
    filteredItems,
    updateSearch,
  };
};
