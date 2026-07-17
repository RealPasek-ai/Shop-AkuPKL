import Swal from 'sweetalert2';

export const DAFTAR_BANK = [
  { title: "Kartu Kredit / Debit", key: "Kartu Kredit / Debit" },
  { title: "OCTO Cash by CIMB Niaga", key: "OCTO Cash by CIMB Niaga" },
  { title: "Rekening Bank Saya", key: "Rekening Bank Saya" },
];


export const getCardTheme = (bankName) => {
  if (!bankName) return 'from-gray-800 to-black text-white'; 
  const name = bankName.toLowerCase();
  if (name.includes('bca')) return 'from-[#00529C] to-[#002D5A] text-white';
  if (name.includes('mandiri')) return 'from-[#F2A900] to-[#C78500] text-gray-900';
  if (name.includes('bni')) return 'from-[#F05A28] to-[#B23812] text-white';
  if (name.includes('bri')) return 'from-[#005E9D] to-[#003960] text-white';
  if (name.includes('octo') || name.includes('cimb')) return 'from-[#E80018] to-[#9E0010] text-white';
  
  return 'from-gray-700 to-gray-900 text-white'; 
};

export const maskNumber = (nomor) => {
  if (!nomor) return "";
  const cleaned = nomor.toString().replace(/\s+/g, '');
  return `**** **** **** ${cleaned.slice(-4)}`;
};

export const handleTambahKartu = async (jenis, setKartu) => {
  let htmlContent = "";
  let titleText = "";

  const DIGIT_BANK = {
    BCA: 10,
    BNI: 10,
    Mandiri: 13,
    BRI: 15
  };

  switch (jenis) {
    case "OCTO Cash by CIMB Niaga":
      titleText = "OCTO Cash by CIMB Niaga";
      htmlContent = `
        <div class="w-full h-40 bg-linear-to-r ${getCardTheme('octo')} rounded-xl p-5 shadow-lg relative overflow-hidden mb-6 flex flex-col justify-between">
          <div class="flex justify-between items-start">
            <div class="font-bold italic text-lg tracking-wider">CIMB NIAGA</div>
            <div class="text-xs font-semibold bg-white/20 px-2 py-1 rounded">OCTO Cash</div>
          </div>
          <div>
            <div id="previewNomor" class="text-xl tracking-widest font-mono mb-1">•••• •••• •••• ••••</div>
            <div id="previewTgl" class="text-xs opacity-80">BB/TT</div>
          </div>
        </div>
        <div class="text-left space-y-4">
          <input type="text" id="nomor" maxlength="19" class="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-[#ee4d2d] transition-colors bg-white" placeholder="Nomor Kartu (16 Digit)">
          <input type="text" id="tgl" maxlength="5" class="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-[#ee4d2d] transition-colors bg-white" placeholder="Tanggal Kedaluwarsa (BB/TT)">
          <div class="text-sm mt-6">
            <p class="text-gray-600 mb-1">Nomor Handphone</p>
            <p class="font-bold text-gray-900">+62 8** *** **</p>
          </div>
        </div>
      `;
      break;

    case "Rekening Bank Saya":
      titleText = "Tambah Rekening Bank";
      htmlContent = `
        <div class="w-full h-40 bg-linear-to-br from-gray-600 to-gray-800 rounded-xl p-5 shadow-lg relative overflow-hidden mb-6 text-white flex flex-col justify-between transition-all duration-300" id="cardBg">
          <div class="font-bold text-xl tracking-wider" id="previewBank">Pilih Bank</div>
          <div>
            <div class="text-xs opacity-75 mb-1">No. Rekening</div>
            <div id="previewNomor" class="text-2xl tracking-widest font-mono">••••••••••</div>
          </div>
        </div>

        <div class="text-left space-y-4">
          <div class="flex items-center">
            <label class="w-1/3 text-sm text-gray-700">Nama Bank</label>
            <select id="namaBank" class="w-2/3 border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-[#ee4d2d] transition-colors bg-white">
              <option value="" disabled selected>Pilih Bank</option>
              <option value="BCA">BCA (10 Digit)</option>
              <option value="Mandiri">Mandiri (13 Digit)</option>
              <option value="BNI">BNI (10 Digit)</option>
              <option value="BRI">BRI (15 Digit)</option>
            </select>
          </div>
          <div class="flex items-center">
             <label class="w-1/3 text-sm text-gray-700">Account No.</label>
             <div class="w-2/3">
               <input type="text" id="nomor" disabled class="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-[#ee4d2d] transition-colors bg-gray-100 disabled:opacity-50" placeholder="Pilih bank terlebih dahulu">
               <p id="digitInfo" class="text-xs text-red-500 mt-1 hidden">Panjang digit belum sesuai</p>
             </div>
          </div>
        </div>
      `;
      break;

    default:
      titleText = "Tambahkan Kartu";
      htmlContent = `
        <div class="w-full h-40 bg-linear-to-tr ${getCardTheme('')} rounded-xl p-5 shadow-lg relative overflow-hidden mb-6 flex flex-col justify-between">
          <div class="flex justify-between items-center">
            <svg class="w-8 h-8 text-yellow-400 opacity-90" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm2 2v2h2V6H6zm0 4v2h2v-2H6zm0 4v2h2v-2H6zm4-8v2h4V6h-4zm0 8v2h4v-2h-4zm6-8v2h2V6h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2z"/></svg>
            <div class="text-sm font-semibold italic opacity-80">CREDIT CARD</div>
          </div>
          <div>
            <div id="previewNomor" class="text-xl tracking-widest font-mono mb-2">•••• •••• •••• ••••</div>
            <div class="flex justify-between items-end">
              <div id="previewNama" class="text-sm uppercase tracking-widest opacity-80 truncate w-3/4">NAMA PEMILIK</div>
              <div id="previewTgl" class="text-xs opacity-80">BB/TT</div>
            </div>
          </div>
        </div>
        <div class="text-left space-y-4">
          <input type="text" id="nomor" maxlength="19" class="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-[#ee4d2d] transition-colors" placeholder="Nomor Kartu (16 Digit)">
          <div class="flex gap-4">
            <input type="text" id="expired" maxlength="5" class="w-2/3 border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-[#ee4d2d] transition-colors" placeholder="Tanggal Kedaluwarsa (BB/TT)">
            <input type="password" id="cvv" maxlength="3" class="w-1/3 border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-[#ee4d2d] transition-colors" placeholder="CVV">
          </div>
          <input type="text" id="nama" class="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none focus:border-[#ee4d2d] transition-colors" placeholder="Nama di Kartu">
        </div>
      `;
  }

  const result = await Swal.fire({
    title: `<div class="text-left text-xl font-medium text-gray-800 pb-2">${titleText}</div>`,
    html: htmlContent,
    width: '500px', 
    showCancelButton: true,
    confirmButtonText: 'Kirim',
    cancelButtonText: 'Nanti Saja',
    buttonsStyling: false, 
    customClass: {
      popup: 'p-6 rounded-xl shadow-xl border border-gray-100', 
      actions: 'w-full flex justify-end gap-3 mt-6', 
      confirmButton: 'bg-black text-white px-8 py-2.5 rounded text-sm font-medium hover:bg-gray-800 cursor-pointer',
      cancelButton: 'bg-white border border-gray-300 text-gray-600 px-6 py-2.5 rounded text-sm font-medium hover:bg-gray-50 cursor-pointer'
    },
    didOpen: () => {
      const nomorInput = document.getElementById('nomor');
      const namaBankSelect = document.getElementById('namaBank');
      const previewNomor = document.getElementById('previewNomor');
      const digitInfo = document.getElementById('digitInfo');
      
      if (jenis === "Rekening Bank Saya" && namaBankSelect && nomorInput) {
        namaBankSelect.addEventListener('change', (e) => {
          const bank = e.target.value;
          const maxDigit = DIGIT_BANK[bank] || 15;
          
          document.getElementById('previewBank').innerText = bank;
          nomorInput.disabled = false;
          nomorInput.classList.remove('bg-gray-100');
          nomorInput.placeholder = `Masukkan ${maxDigit} digit no. rekening`;
          nomorInput.maxLength = maxDigit;
          nomorInput.value = '';
          previewNomor.innerText = '•'.repeat(maxDigit);
          digitInfo.classList.add('hidden');
          
          
          const cardBg = document.getElementById('cardBg');
          cardBg.className = `w-full h-40 bg-gradient-to-br ${getCardTheme(bank)} rounded-xl p-5 shadow-lg relative overflow-hidden mb-6 flex flex-col justify-between transition-all duration-300`;
        });

        nomorInput.addEventListener('input', (e) => {
           e.target.value = e.target.value.replace(/\D/g, '');
           previewNomor.innerText = e.target.value || '••••••••••';
           
           const bank = namaBankSelect.value;
           const maxDigit = DIGIT_BANK[bank];
           if(e.target.value.length > 0 && e.target.value.length < maxDigit) {
              digitInfo.innerText = `Wajib ${maxDigit} digit (Kurang ${maxDigit - e.target.value.length} digit)`;
              digitInfo.classList.remove('hidden');
           } else {
              digitInfo.classList.add('hidden');
           }
        });
      }

      
      if ((jenis === "Kartu Kredit / Debit" || jenis === "OCTO Cash by CIMB Niaga") && nomorInput) {
        nomorInput.addEventListener('input', (e) => {
          let val = e.target.value.replace(/\D/g, '').substring(0, 16);
          let formatted = val.match(/.{1,4}/g)?.join(' ') || '';
          e.target.value = formatted;
          if (previewNomor) previewNomor.innerText = formatted || '•••• •••• •••• ••••';
        });
      }

     
      const tglInput = document.getElementById('tgl') || document.getElementById('expired');
      if (tglInput) {
        tglInput.addEventListener('input', (e) => {
          let val = e.target.value.replace(/\D/g, '').substring(0, 4);
          if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2);
          e.target.value = val;
          const previewTgl = document.getElementById('previewTgl');
          if (previewTgl) previewTgl.innerText = val || 'BB/TT';
        });
      }

      
      const namaInput = document.getElementById('nama');
      if (namaInput) {
         namaInput.addEventListener('input', (e) => {
           const previewNama = document.getElementById('previewNama');
           if (previewNama) previewNama.innerText = e.target.value.toUpperCase() || 'NAMA PEMILIK';
         });
      }
    },
    preConfirm: () => {
      const data = {};
      const keys = ["nomor", "nama", "tgl", "namaBank", "expired", "cvv"];
      
      keys.forEach(key => {
        const el = document.getElementById(key);
        if (el) data[key] = el.value.trim();
      });

      if (jenis === "Rekening Bank Saya") {
        if (!data.namaBank) {
          Swal.showValidationMessage("Pilih bank terlebih dahulu!");
          return false;
        }
        const requiredLength = DIGIT_BANK[data.namaBank];
        if (!data.nomor || data.nomor.length !== requiredLength) {
          Swal.showValidationMessage(`Nomor rekening ${data.namaBank} wajib ${requiredLength} digit!`);
          return false;
        }
      } else {
        const nomorTanpaSpasi = data.nomor ? data.nomor.replace(/\s/g, '') : '';
        if (!nomorTanpaSpasi || nomorTanpaSpasi.length !== 16) {
          Swal.showValidationMessage("Nomor kartu wajib diisi 16 digit angka!");
          return false;
        }
      }

      if (data.nomor) data.nomor = data.nomor.replace(/\s/g, '');
      return data;
    }
  });

  if (result.isConfirmed && result.value) {
    setKartu((prev) => [
      ...prev,
      { id: Date.now(), jenis, ...result.value }
    ]);
  }
};