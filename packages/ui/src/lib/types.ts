export type FieldErrors<T> = Record<keyof T, string[]>;

export interface ActionState<TInput, TOutput> {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
}

export type ActionHandler<TInput, TOutput> = (
  data: TInput,
) => Promise<ActionState<TInput, TOutput>>;

export interface Entity<T> {
  ids: string[];
  entities: Record<string, T>;
}

export interface Modified<T> {
  item: T;
  ids: string[];
}
