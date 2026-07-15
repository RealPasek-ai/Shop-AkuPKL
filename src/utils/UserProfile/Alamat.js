import Swal from "sweetalert2";


export const handleTambahAlamat = async (alamat, setAlamat, dataEdit = null) => {
  const result = await Swal.fire({
    title: dataEdit ? "EDIT ADDRESS" : "ADD ADDRESS",
    width: "32rem",
    buttonsStyling: false,
    html: `
      <div class="flex flex-col gap-5 text-left font-sans mt-2">
        
        
        <div>
          <label class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Country / Region</label>
          <select id="swal-country" class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 transition-all focus:bg-white focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 cursor-pointer">
            <option value="Indonesia" ${dataEdit?.country === "Indonesia" ? "selected" : ""}>Indonesia</option>
            <option value="Malaysia" ${dataEdit?.country === "Malaysia" ? "selected" : ""}>Malaysia</option>
            <option value="Singapore" ${dataEdit?.country === "Singapore" ? "selected" : ""}>Singapore</option>
          </select>
        </div>

        
        <div>
          <label class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Full Name</label>
          <input id="swal-name" value="${dataEdit?.name || ""}" placeholder="Masukkan nama lengkap Anda" class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 transition-all placeholder-gray-400 focus:bg-white focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900">
        </div>

        
        <div>
          <label class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Phone Number</label>
          <input id="swal-phone" value="${dataEdit?.phone || dataEdit?.nohp || ""}" placeholder="Contoh: 08123456789" class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 transition-all placeholder-gray-400 focus:bg-white focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900">
        </div>

       
        <div>
          <label class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Region / City</label>
          <input id="swal-wilayah" value="${dataEdit?.wilayah || ""}" placeholder="Provinsi, Kabupaten/Kota, Kecamatan" class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 transition-all placeholder-gray-400 focus:bg-white focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900">
        </div>

        
        <div>
          <label class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Address Detail</label>
          <textarea id="swal-detail" rows="3" placeholder="Nama jalan, nomor rumah, RT/RW, cluster, dll." class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 transition-all placeholder-gray-400 resize-none focus:bg-white focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900">${dataEdit?.detail || ""}</textarea>
        </div>

      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Simpan",
    cancelButtonText: "Batal",
    customClass: {
      popup: "rounded-3xl font-sans p-6 md:p-8 border border-gray-100 shadow-2xl bg-white",
      title: "text-base font-extrabold tracking-wider uppercase text-left border-b border-gray-100 pb-4 mb-2 text-gray-900",
      actions: "flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6 w-full",
      confirmButton: "px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer shadow-sm",
      cancelButton: "px-6 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer"
    },
    preConfirm: () => {
      const name = document.getElementById("swal-name").value.trim();
      const phone = document.getElementById("swal-phone").value.trim();
      const country = document.getElementById("swal-country").value;
      const wilayah = document.getElementById("swal-wilayah").value.trim();
      const detail = document.getElementById("swal-detail").value.trim();

      if (!name || !phone || !wilayah || !detail) {
        Swal.showValidationMessage("Semua data wajib diisi!");
        return false;
      }
      return { name, phone, country, wilayah, detail };
    }
  });

  if (result.isConfirmed) {
    const data = result.value;
    
    const newAddressItem = {
      id: dataEdit ? dataEdit.id : Date.now() + Math.random(),
      name: data.name,
      nohp: data.phone,
      phone: data.phone,
      country: data.country,
      wilayah: data.wilayah,
      detail: data.detail,
    };

   
    setAlamat([newAddressItem]);

    
    Swal.fire({ 
      title: "Berhasil", 
      text: "Alamat berhasil disimpan", 
      icon: "success", 
      buttonsStyling: false,
      customClass: {
        popup: "rounded-3xl font-sans p-6 border border-gray-100 shadow-2xl bg-white",
        title: "text-lg font-bold text-gray-900",
        confirmButton: "px-8 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer mt-4"
      }
    });
  }
};