import { z } from "zod";

import type { ActionHandler, FieldErrors } from "./types";

export const createSafeAction =
  <TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: ActionHandler<TInput, TOutput>,
  ): ActionHandler<TInput, TOutput> =>
  async (data) => {
    const result = schema.safeParse(data);
    return result.success
      ? await handler(result.data)
      : {
          fieldErrors: result.error.flatten()
            .fieldErrors as FieldErrors<TInput>,
        };
  };
