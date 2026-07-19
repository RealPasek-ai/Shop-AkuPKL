import Swal from "sweetalert2";
import { authService } from "../../services/authService";

export const handleLogout = () => {
  authService.logout();                 // hapus sesi login (fashion_session)
  localStorage.removeItem("userData");  // hapus data profil dashboard
  // Reload penuh ke Beranda -> seluruh state login ter-reset;
  // refresh berikutnya tetap dalam keadaan logout. (Tidak memanggil setUser
  // agar useUser tidak menulis ulang "null" ke localStorage.)
  window.location.href = "/";
};


export const handleHapusAkun = (setUser) => {
  Swal.fire({
    title: "Apakah Anda yakin?",
    text: "Semua data akun Anda akan dihapus secara permanen dari perangkat ini!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
    buttonsStyling: true, 
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      setUser(null);
      window.location.href = "/";
    }
  });
};