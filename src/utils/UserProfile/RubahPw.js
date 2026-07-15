import Swal from "sweetalert2";

export const handleGantiPassword = async (user, setUser) => {
  const result = await Swal.fire({
    title: "Ganti Password",
    html: `
      <input type="password" id="swal-input1" class="swal2-input" placeholder="Password Lama" style="margin-bottom: 10px; width: 80%;">
      <input type="password" id="swal-input2" class="swal2-input" placeholder="Password Baru" style="width: 80%;">
    `,
    showCancelButton: true,
    confirmButtonText: "Ganti",
    cancelButtonText: "Batal",
    buttonsStyling: false,
    customClass: {
      popup: "rounded-3xl font-sans p-6 md:p-8 border border-gray-100 shadow-2xl bg-white",
      title: "text-base font-extrabold tracking-wider uppercase text-left border-b border-gray-100 pb-4 mb-4 text-gray-900",
      actions: "flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6 w-full",
      confirmButton: "px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer shadow-sm",
      cancelButton: "px-6 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer",
    },
    preConfirm: () => {
      const passwordLama = Swal.getPopup().querySelector('#swal-input1').value;
      const passwordBaru = Swal.getPopup().querySelector('#swal-input2').value;

      if (!passwordLama || !passwordBaru) {
        Swal.showValidationMessage('Kedua password wajib diisi');
        return false;
      }
      if (passwordLama !== user.password) {
        Swal.showValidationMessage('Password lama salah');
        return false;
      }
      if (passwordBaru.length < 6) {
        Swal.showValidationMessage('Password baru minimal 6 karakter');
        return false;
      }
      return { passwordLama, passwordBaru };
    }
  });

  if (result.isConfirmed) {
    setUser((prev) => ({
      ...prev,
      password: result.value.passwordBaru,
    }));

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Password berhasil diganti",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-3xl font-sans p-6 border border-gray-100 shadow-2xl bg-white",
        title: "text-lg font-bold text-gray-900",
        confirmButton: "px-8 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer mt-4"
      }
    });
  }
};