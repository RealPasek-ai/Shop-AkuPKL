import { useEffect, useState } from 'react';
import { getAllCategories } from '../api/fakeStoreApi';

/** useCategories — mengambil daftar semua kategori produk */
export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getAllCategories()
      .then((data) => {
        if (isMounted) setCategories(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || 'Gagal memuat kategori.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, isLoading, error };
}
