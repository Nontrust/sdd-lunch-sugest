"use client";

import { useState, useCallback } from "react";

interface MutationOptions {
  url: string;
  method?: string;
  body?: unknown;
}

interface UseApiMutationResult {
  execute: (options: MutationOptions) => Promise<Response | null>;
  error: string;
}

export function useApiMutation(): UseApiMutationResult {
  const [error, setError] = useState("");

  const execute = useCallback(async ({ url, method = "POST", body }: MutationOptions) => {
    setError("");

    try {
      const res = await globalThis.fetch(url, {
        method,
        ...(body !== undefined && {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error);
        return null;
      }

      return res;
    } catch {
      setError("알 수 없는 오류가 발생했습니다");
      return null;
    }
  }, []);

  return { execute, error };
}
