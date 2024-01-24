"use client";

import { useCallback, useState } from "react";

import { ActionHandler, FieldErrors } from "@/lib";

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

interface UseActionResult<TInput, TOutput> {
  execute: (data: TInput) => Promise<void>;
  fieldErrors?: FieldErrors<TInput>;
  error?: string;
  data?: TOutput;
  isLoading: boolean;
}

export const useAction = <TInput, TOutput>(
  action: ActionHandler<TInput, TOutput>,
  options: UseActionOptions<TOutput>,
): UseActionResult<TInput, TOutput> => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      try {
        const result = await action(input);
        if (!result) return;

        const { fieldErrors, error, data } = result;
        setFieldErrors(fieldErrors);
        if (error) {
          setError(error);
          options.onError?.(error);
        }
        if (data) {
          setData(data);
          options.onSuccess?.(data);
        }
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options],
  );

  return { execute, fieldErrors, error, data, isLoading };
};
