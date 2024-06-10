export interface Section {
  title: string;
  description: string;
  plan?: string;
}

export type PanelData<T extends readonly string[]> = Record<T[number], Section>;

export const styles = {
  button:
    "rounded-sm shadow-none select-none px-3 border border-primary/10 hover:bg-[#e1e1e1] h-8 text-sm font-normal",
  tooltip:
    "bg-black text-primary-foreground dark:text-primary text-xs rounded-sm px-1.5 py-0.5 border-none font-medium",
  blueButton:
    "bg-button h-8 rounded-sm px-3 text-sm font-medium text-white hover:bg-[#0077d4] hover:text-white",
};
