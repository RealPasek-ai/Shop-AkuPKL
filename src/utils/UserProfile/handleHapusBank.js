import Swal from 'sweetalert2';

export const handleHapusBank = (id, setKartu) => {
  Swal.fire({
    title: 'Hapus Kartu?',
    text: "Kartu yang dihapus tidak dapat dikembalikan.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, Hapus!',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
     
      setKartu((prev) => prev.filter((item) => item.id !== id));
      Swal.fire('Terhapus!', 'Kartu berhasil dihapus.', 'success');
    }
  });
};