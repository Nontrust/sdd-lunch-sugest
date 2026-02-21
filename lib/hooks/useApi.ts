"use client";

import { useState, useCallback } from "react";

interface UseApiResult<T> {
  data: T | null;
  error: string;
  loading: boolean;
  fetch: (url: string) => Promise<void>;
}

export function useApi<T>(): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (url: string) => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await globalThis.fetch(url);

      if (!res.ok) {
        const body = await res.json();
        setError(body.error);
        return;
      }

      setData(await res.json());
    } catch {
      setError("알 수 없는 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, fetch: fetchData };
}
