"use client";

import type { DependencyList } from "react";
import { useEffect, useState } from "react";

import type { ActionState } from "@/lib";

interface UseFetchOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

interface UseFetchResult<T> {
  error?: string;
  data?: T;
  isLoading: boolean;
}

export const useFetch = <T>(
  action: () => Promise<ActionState<never, T>>,
  options: UseFetchOptions<T>,
  dependencies: DependencyList = [],
): UseFetchResult<T> => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const execute = async () => {
      try {
        const result = await action();
        if (!result) return;

        const { error, data } = result;
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
    };
    execute();
  }, dependencies);

  return { error, data, isLoading };
};
