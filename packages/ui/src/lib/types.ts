export type FieldErrors<T> = Record<keyof T, string[]>;

export interface Entity<T> {
  ids: string[];
  entities: Record<string, T>;
}

export interface Modified<T> {
  item: T;
  ids: string[];
}
