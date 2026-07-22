import Swal from "sweetalert2";


export const handleTambahAlamat = async (alamat, setAlamat, dataEdit = null, profil = {}) => {
  const result = await Swal.fire({
    title: dataEdit ? "EDIT ADDRESS" : "ADD ADDRESS",
    width: "32rem",
    buttonsStyling: false,
    html: `
      <div class="flex flex-col gap-5 text-left font-sans mt-2">
        
        
        <div>
          <label class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Country / Region</label>
          <select id="swal-country" class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 transition-all focus:bg-white focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 cursor-pointer">
            ${["Indonesia","Malaysia","Singapura","Thailand","Vietnam","Filipina","Brunei","Kamboja","Laos","Myanmar","Timor-Leste"]
              .map((n) => `<option value="${n}" ${dataEdit?.country === n ? "selected" : ""}>${n}</option>`)
              .join("")}
          </select>
        </div>


        <div>
          <label class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Alamat</label>
          <input id="swal-address" value="${dataEdit?.address || ""}" placeholder="Nama jalan, nomor rumah, RT/RW" class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 transition-all placeholder-gray-400 focus:bg-white focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900">
        </div>


        <div>
          <label class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Address Detail (opsional)</label>
          <input id="swal-detail" value="${dataEdit?.detail || ""}" placeholder="Apartemen, unit, blok, dll." class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 transition-all placeholder-gray-400 focus:bg-white focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900">
        </div>


        <div>
          <label class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Kota</label>
          <input id="swal-city" value="${dataEdit?.city || dataEdit?.wilayah || ""}" placeholder="Kabupaten / Kota" class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 transition-all placeholder-gray-400 focus:bg-white focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900">
        </div>


        <div>
          <label class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Provinsi</label>
          <input id="swal-province" value="${dataEdit?.province || ""}" placeholder="Provinsi" class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 transition-all placeholder-gray-400 focus:bg-white focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900">
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
      const country = document.getElementById("swal-country").value;
      const address = document.getElementById("swal-address").value.trim();
      const detail = document.getElementById("swal-detail").value.trim();
      const city = document.getElementById("swal-city").value.trim();
      const province = document.getElementById("swal-province").value.trim();

      if (!address || !city || !province) {
        Swal.showValidationMessage("Alamat, Kota, dan Provinsi wajib diisi!");
        return false;
      }
      return { country, address, detail, city, province };
    }
  });

  if (result.isConfirmed) {
    const data = result.value;

    // Nama & telepon tidak ditanyakan di form alamat lagi — keduanya sudah punya
    // tempat khusus di profil (Contact & Account). Ambil dari profil di sini.
    const name = (profil.name || dataEdit?.name || "").trim();
    const phone = (profil.phone || dataEdit?.phone || dataEdit?.nohp || "").trim();

    const newAddressItem = {
      id: dataEdit ? dataEdit.id : Date.now() + Math.random(),
      name,
      nohp: phone,
      phone,
      country: data.country,
      address: data.address,
      detail: data.detail,
      city: data.city,
      province: data.province,
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