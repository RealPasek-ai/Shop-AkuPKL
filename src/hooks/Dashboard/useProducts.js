import { useEffect, useState } from 'react';
import { getAllProducts, getProductsByCategory } from '../../api/fakeStoreApi';

/**
 * useProducts
 * Mengambil daftar produk (semua atau per kategori) beserta status loading/error.
 * @param {string|null} category - jika diisi, mengambil produk khusus kategori tsb.
 */
export function useProducts(category = null) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const fetcher = category ? getProductsByCategory(category) : getAllProducts();

    fetcher
      .then((data) => {
        if (isMounted) setProducts(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || 'Terjadi kesalahan saat memuat produk.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [category]);

  return { products, isLoading, error };
}
