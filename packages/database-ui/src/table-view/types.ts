import React from "react";

export type Property = "title" | "text" | "checkbox";

export interface Column {
  colId: number;
  type: Property;
  title: string;
  icon: React.ReactNode;
  width?: string;
}

export type CellDataType =
  | { type: "title" | "text"; value: string }
  | { type: "checkbox" };
