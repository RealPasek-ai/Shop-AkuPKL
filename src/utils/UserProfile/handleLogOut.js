import Swal from "sweetalert2";


export const handleLogout = (setUser) => {
  setUser(null);
  window.location.href = "/login";
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
      window.location.href = "/login";
    }
  });
};