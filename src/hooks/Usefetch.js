import { useCallback, useEffect, useState } from "react";

/**
 * Custom hook generic buat data fetching.
 * fetchFn harus berupa function yang me-return Promise (biasanya panggil async function).
 * dependencies dipakai persis kayak dependency array useEffect biasa.
 *
 * Return: { data, loading, error, refetch }
 */
export default function useFetch(fetchFn, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const jalankanFetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const hasil = await fetchFn();
      setData(hasil);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan yang tidak diketahui.");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(() => {
    jalankanFetch();
  }, [jalankanFetch]);

  return { data, loading, error, refetch: jalankanFetch };
}