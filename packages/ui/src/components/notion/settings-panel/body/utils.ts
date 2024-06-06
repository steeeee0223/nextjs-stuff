export interface Section {
  title: string;
  description: string;
  plan?: string;
}

export type PanelData<T extends readonly string[]> = Record<T[number], Section>;

export const styles = {
  button: "rounded-sm shadow-none select-none hover:bg-primary/10 px-2",
  tooltip:
    "bg-black text-primary-foreground dark:text-primary text-xs rounded-sm px-1.5 py-0.5 border-none font-medium",
};
