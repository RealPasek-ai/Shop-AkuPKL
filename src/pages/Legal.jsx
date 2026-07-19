import SectionTitle from '../components/common/SectionTitle'

/**
 * pages/Legal.jsx
 * Halaman statis Kebijakan Privasi & Syarat Ketentuan.
 * Satu komponen, dua isi (prop `doc`). Konten bersifat contoh untuk demo,
 * bukan nasihat hukum.
 */
const KONTEN = {
  privasi: {
    judul: 'Kebijakan Privasi',
    pembaruan: '18 Juli 2026',
    seksi: [
      {
        h: 'Data yang Kami Kumpulkan',
        p: 'Kami mengumpulkan data yang Anda berikan saat mendaftar dan berbelanja, seperti nama, email, nomor telepon, dan alamat pengiriman. Data pesanan dan preferensi juga kami simpan untuk memproses transaksi.',
      },
      {
        h: 'Penggunaan Data',
        p: 'Data digunakan untuk memproses pesanan, mengirim produk, memberikan dukungan, serta mengirim informasi penawaran bila Anda menyetujuinya. Kami tidak menjual data pribadi Anda kepada pihak ketiga.',
      },
      {
        h: 'Penyimpanan & Keamanan',
        p: 'Pada versi demo ini seluruh data disimpan secara lokal di peramban Anda (localStorage) dan tidak dikirim ke server. Kami menyarankan untuk tidak memasukkan data pribadi sungguhan.',
      },
      {
        h: 'Hak Anda',
        p: 'Anda berhak mengakses, memperbarui, atau menghapus data Anda kapan saja melalui halaman akun. Menghapus data akun akan menghilangkan seluruh informasi tersimpan di perangkat ini.',
      },
      {
        h: 'Kontak',
        p: 'Untuk pertanyaan seputar privasi, hubungi kami di support@wm.com.',
      },
    ],
  },
  syarat: {
    judul: 'Syarat & Ketentuan',
    pembaruan: '18 Juli 2026',
    seksi: [
      {
        h: 'Penerimaan Ketentuan',
        p: 'Dengan mengakses dan menggunakan WM., Anda menyetujui syarat dan ketentuan ini. Bila tidak setuju, mohon untuk tidak menggunakan layanan kami.',
      },
      {
        h: 'Akun & Keamanan',
        p: 'Anda bertanggung jawab menjaga kerahasiaan kredensial akun dan seluruh aktivitas yang terjadi di dalamnya. Segera beri tahu kami bila ada penggunaan tanpa izin.',
      },
      {
        h: 'Pemesanan & Pembayaran',
        p: 'Setiap pesanan tunduk pada ketersediaan produk. Harga ditampilkan dalam Rupiah dan dapat berubah sewaktu-waktu. Konfirmasi pembayaran akan menghasilkan invoice atas pesanan Anda.',
      },
      {
        h: 'Pengiriman & Pengembalian',
        p: 'Estimasi pengiriman bersifat perkiraan dan dapat berubah karena faktor logistik. Produk dapat dikembalikan dalam 14 hari sesuai kebijakan pengembalian, selama dalam kondisi asli.',
      },
      {
        h: 'Batasan Tanggung Jawab',
        p: 'Layanan disediakan "sebagaimana adanya". WM. tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan situs, sepanjang diizinkan oleh hukum yang berlaku.',
      },
    ],
  },
}

export default function Legal({ doc = 'privasi' }) {
  const konten = KONTEN[doc] || KONTEN.privasi

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <SectionTitle eyebrow="Legal" title={konten.judul} />
      <p className="mt-3 text-xs uppercase tracking-[0.15em] text-steel">
        Diperbarui {konten.pembaruan}
      </p>

      <div className="mt-10 space-y-8">
        {konten.seksi.map((s) => (
          <div key={s.h}>
            <h2 className="heading-display text-lg text-ink sm:text-xl">{s.h}</h2>
            <p className="mt-2 text-sm leading-relaxed text-smoke">{s.p}</p>
          </div>
        ))}
      </div>

      <p className="mt-12 border-t border-ash pt-6 text-xs leading-relaxed text-steel">
        Dokumen ini disediakan sebagai contoh untuk keperluan demo dan bukan nasihat hukum.
      </p>
    </section>
  )
}
