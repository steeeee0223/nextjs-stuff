import type { Option } from "../_components";

export interface Section {
  title: string;
  description: string;
  plan?: string;
}

export type PanelData<T extends readonly string[]> = Record<T[number], Section>;

export const toOptions = (obj: Record<string, string>): Option[] =>
  Object.entries(obj).map(([value, label]) => ({ label, value }));
