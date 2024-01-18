import * as z from "zod";

/**
 * Utility for DND reordering
 */
export function reorder<T>(list: T[], start: number, end: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(start, 1);
  result.splice(end, 0, removed!);
  return result;
}

export function findMaxOrder<T extends { order: number }>(list: T[]): number {
  return list.reduce((acc, item) => Math.max(acc, item.order), -1);
}

export const TitleSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});
