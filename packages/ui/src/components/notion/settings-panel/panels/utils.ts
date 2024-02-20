export interface Section {
  title: string;
  description: string;
}

export type PanelData<T extends readonly string[]> = Record<T[number], Section>;
