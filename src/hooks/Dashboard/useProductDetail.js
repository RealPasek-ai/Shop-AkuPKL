import { useEffect, useState } from 'react';
import { getProductById } from '../api/fakeStoreApi';

/** useProductDetail — mengambil detail satu produk berdasarkan id */
export function useProductDetail(id) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    getProductById(id)
      .then((data) => {
        if (isMounted) setProduct(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || 'Produk tidak ditemukan.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { product, isLoading, error };
}
