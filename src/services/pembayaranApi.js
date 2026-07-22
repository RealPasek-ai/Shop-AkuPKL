import { ambilOrder } from "../utils/orderStore";

function tunda(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchStatusPesanan(orderId) {
  await tunda(600);
  const order = ambilOrder(orderId);
  if (!order) throw new Error("Pesanan tidak ditemukan.");
  return order;
}

export async function fetchInvoice(invoiceId) {
  await tunda(500);
  const order = ambilOrder(invoiceId);
  if (!order) throw new Error("Invoice tidak ditemukan.");
  return order;
}
