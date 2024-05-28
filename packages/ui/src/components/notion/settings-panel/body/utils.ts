export interface Section {
  title: string;
  description: string;
}

export type PanelData<T extends readonly string[]> = Record<T[number], Section>;

export const styles = {
  button: "rounded-sm shadow-none select-none hover:bg-primary/10 px-2",
};
