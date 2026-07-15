import Swal from "sweetalert2";


export const handleEmail = async (formData, setFormData, setUser) => {
  const result = await Swal.fire({
    title: formData.email ? "EDIT EMAIL" : "ADD EMAIL",
    input: "email",
    inputValue: formData.email || "",
    inputPlaceholder: "contoh@gmail.com",
    showCancelButton: true,
    confirmButtonText: "Simpan",
    cancelButtonText: "Batal",
    buttonsStyling: false, 
    customClass: {
      popup: "rounded-3xl font-sans p-6 md:p-8 border border-gray-100 shadow-2xl bg-white",
      title: "text-base font-extrabold tracking-wider uppercase text-left border-b border-gray-100 pb-4 mb-4 text-gray-900",
      input: "w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 transition-all focus:bg-white focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 shadow-xs",
      actions: "flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6 w-full",
      confirmButton: "px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer shadow-sm",
      cancelButton: "px-6 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer",
      validationMessage: "bg-transparent text-red-500 text-xs font-bold pt-2 text-left shadow-none p-0"
    },
    inputValidator: (value) => {
      if (!value) {
        return "Email tidak boleh kosong!";
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Format email tidak valid!";
      }
      return null;
    },
  });

  if (result.isConfirmed) {
    setFormData((prev) => ({
      ...prev,
      email: result.value,
    }));

    setUser((prev) => ({
      ...prev,
      email: result.value,
    }));

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Email berhasil diperbarui.",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-3xl font-sans p-6 border border-gray-100 shadow-2xl bg-white",
        title: "text-lg font-bold text-gray-900",
        confirmButton: "px-8 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer mt-4"
      }
    });
  }
};


export const handleNoHp = async (formData, setFormData, setUser) => {
  const result = await Swal.fire({
    title: formData.nohp ? "EDIT PHONE NUMBER" : "ADD PHONE NUMBER",
    input: "tel",
    inputValue: formData.nohp || "",
    inputPlaceholder: "081234567890",
    showCancelButton: true,
    confirmButtonText: "Simpan",
    cancelButtonText: "Batal",
    buttonsStyling: false, 
    customClass: {
      popup: "rounded-3xl font-sans p-6 md:p-8 border border-gray-100 shadow-2xl bg-white",
      title: "text-base font-extrabold tracking-wider uppercase text-left border-b border-gray-100 pb-4 mb-4 text-gray-900",
      input: "w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 transition-all focus:bg-white focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 shadow-xs",
      actions: "flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6 w-full",
      confirmButton: "px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer shadow-sm",
      cancelButton: "px-6 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer",
      validationMessage: "bg-transparent text-red-500 text-xs font-bold pt-2 text-left shadow-none p-0"
    },
    inputValidator: (value) => {
      if (!value) {
        return "No. HP tidak boleh kosong!";
      }
      const phoneRegex = /^08\d{8,11}$/;
      if (!phoneRegex.test(value)) {
        return "Format No. HP tidak valid!";
      }
      return null;
    },
  });

  if (result.isConfirmed) {
    setFormData((prev) => ({
      ...prev,
      nohp: result.value,
    }));

    setUser((prev) => ({
      ...prev,
      nohp: result.value,
    }));

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "No. HP berhasil diperbarui.",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-3xl font-sans p-6 border border-gray-100 shadow-2xl bg-white",
        title: "text-lg font-bold text-gray-900",
        confirmButton: "px-8 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer mt-4"
      }
    });
  }
};