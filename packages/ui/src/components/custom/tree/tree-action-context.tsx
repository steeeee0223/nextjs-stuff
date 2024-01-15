"use client";

import type { Dispatch } from "react";
import { createContext, useContext } from "react";

import type { TreeItem } from "./index.types";
import type { TreeAction } from "./tree-actions";

interface TreeActionContextInterface {
  dispatch: Dispatch<TreeAction<TreeItem>>;
}

export const TreeActionContext =
  createContext<TreeActionContextInterface | null>(null);

export function useTreeAction(): TreeActionContextInterface {
  const object = useContext(TreeActionContext);
  if (!object)
    throw new Error("useTreeAction must be used within TreeProvider");
  return object;
}
