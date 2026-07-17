import React from 'react';
// Pastikan path import ini sudah benar menuju file Bank.js/ts tempat getCardTheme berada
import { getCardTheme, maskNumber } from '../../utils/UserProfile/Bank';

const KartuList = ({ kartu, jenis, setKartu }) => {
  
  
  const filteredKartu = kartu.filter((item) => item.jenis === jenis);

  const handleHapus = (id) => {
    setKartu((prev) => prev.filter((item) => item.id !== id));
  };

  if (filteredKartu.length === 0) {
    return (
      <div className="text-center text-gray-400/80 text-sm py-10 bg-[#FBF8F3]/40 rounded-2xl border border-dashed border-gray-300/60 font-medium">
        Belum ada {jenis.toLowerCase()} yang ditambahkan.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredKartu.map((item) => (
        <div key={item.id} className="flex flex-col">
          
        
          <div 
            className={`w-full aspect-[1.58] bg-linear-to-br ${getCardTheme(item.namaBank || item.jenis)} rounded-2xl p-6 shadow-sm hover:shadow-md relative overflow-hidden flex flex-col justify-between transition-all duration-300`}
          >
            
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-white opacity-10 pointer-events-none"></div>
            <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white opacity-5 pointer-events-none"></div>
            
            
            <div className="flex justify-between items-start z-10">
              <span className="font-extrabold text-lg italic tracking-wider drop-shadow-sm">
                {item.namaBank || (item.jenis === "OCTO Cash by CIMB Niaga" ? "CIMB NIAGA" : "CREDIT CARD")}
              </span>
              <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider backdrop-blur-sm">
                {item.namaBank ? "DEBIT" : "DIGITAL"}
              </span>
            </div>

            
            <div className="z-10">
             
              <div className="w-10 h-7 bg-amber-400 rounded-md mb-2 border border-amber-600/30 opacity-95 relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 border border-amber-500/20 opacity-40"></div>
              </div>
              
              
              <div className="font-mono text-xl tracking-[0.12em] drop-shadow-sm">
                {maskNumber(item.nomor)}
              </div>
            </div>

            <div className="flex justify-between items-end z-10 opacity-90 text-xs">
              <div className="truncate w-3/4 pr-2">
                <div className="text-[8px] tracking-widest uppercase opacity-60 mb-0.5">Card Holder</div>
                <div className="font-bold tracking-wide uppercase truncate">
                  {item.nama || "MEMBER"}
                </div>
              </div>
              
              
              {(item.tgl || item.expired) && (
                <div className="shrink-0 text-right">
                  <div className="text-[8px] tracking-widest uppercase opacity-60 mb-0.5">Valid Thru</div>
                  <div className="font-mono font-bold">
                    {item.tgl || item.expired}
                  </div>
                </div>
              )}
            </div>
          </div>

          
          <div className="flex justify-end mt-2 px-1">
            <button 
              onClick={() => handleHapus(item.id)}
              className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 opacity-80 hover:opacity-100 cursor-pointer"
            >
              ✕ HAPUS KARTU
            </button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default KartuList;