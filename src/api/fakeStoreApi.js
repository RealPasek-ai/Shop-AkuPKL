/**
 * fakeStoreApi.js
 * Lapisan service terpusat untuk komunikasi dengan FakeStoreAPI.
 * Semua pemanggilan data produk & kategori HARUS lewat file ini
 * agar mudah di-maintain oleh tim (single source of truth).
 */

const BASE_URL = 'https://fakestoreapi.com';

async function handleResponse(res) {
  if (!res.ok) {
    throw new Error(`Request gagal dengan status ${res.status}`);
  }
  return res.json();
}

/** Ambil seluruh produk */
export async function getAllProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return handleResponse(res);
}

/** Ambil satu produk berdasarkan id */
export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return handleResponse(res);
}

/** Ambil daftar semua kategori */
export async function getAllCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`);
  return handleResponse(res);
}

/** Ambil produk berdasarkan kategori */
export async function getProductsByCategory(category) {
  const res = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(category)}`
  );
  return handleResponse(res);
}
