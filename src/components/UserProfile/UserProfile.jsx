import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import SideNavbarUser from './SideNavbarUser';
import { handleEmail } from "../../utils/UserProfile/Profile";
import { handleNoHp } from "../../utils/UserProfile/Profile";
import useAlamat from "../../hooks/UserProfile/useAlamat"; 
import { handleTambahAlamat } from "../../utils/UserProfile/Alamat"; 
import { handleFotoProfilChange } from "../../utils/UserProfile/fotoprofile";

const UserProfile = ({ user, setUser }) => {
  const [formData, setFormData] = useState(user);
  const { alamat, setAlamat } = useAlamat();

  useEffect(() => {
    if (user && !formData?.username) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(formData);
    Swal.fire({
      title: "Berhasil!",
      text: "Data profil Anda telah berhasil disimpan.",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#111827",
    });
  };

  return (
    <div className="flex min-h-screen bg-cloud flex-row p-12 font-body antialiased text-ink justify-center">
      <div className="w-64 shrink-0 pt-2">
        <SideNavbarUser user={user} />
      </div>

      <main className="grow max-w-3xl ml-4 space-y-10">
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-black tracking-wider uppercase text-ink">Contact & Account</h3>
            <button 
              type="button" 
              onClick={handleSave} 
              className="text-xs font-bold border border-ash/50 bg-cloud px-4 py-1.5 hover:bg-ash transition cursor-pointer"
            >
              Save Changes
            </button>
          </div>
          
          <div className="bg-white border border-ash/40 p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-steel uppercase tracking-wider block mb-1">Username</label>
                <input type="text" name="username" value={formData.username || ''} onChange={handleChange} className="w-full text-sm font-medium text-ink bg-transparent border-b border-ash/60 py-1 focus:outline-none focus:border-ink transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-steel uppercase tracking-wider block mb-1">Full Name</label>
                <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full text-sm font-medium text-ink bg-transparent border-b border-ash/60 py-1 focus:outline-none focus:border-ink transition-all" />
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-ash/40 py-2">
              <div>
                <span className="text-[10px] font-bold text-steel uppercase tracking-wider block">Email Address</span>
                <span className="text-sm font-medium text-ink">{formData.email || 'Belum diatur'}</span>
              </div>
              <button type="button" onClick={() => handleEmail(formData, setFormData, setUser)} className="text-xs font-bold underline text-steel hover:text-ink cursor-pointer">
                {formData.email ? 'Edit' : 'Add'}
              </button>
            </div>

            <div className="flex items-center justify-between py-1">
              <div>
                <span className="text-[10px] font-bold text-steel uppercase tracking-wider block">Phone Number</span>
                <span className="text-sm font-medium text-ink">{formData.nohp || 'Belum diatur'}</span>
              </div>
              <button type="button" onClick={() => handleNoHp(formData, setFormData, setUser)} className="text-xs font-bold underline text-steel hover:text-ink cursor-pointer">
                {formData.nohp ? 'Edit' : 'Add'}
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-black tracking-wider uppercase text-ink">Addresses</h3>
            <button 
              type="button"
              onClick={() => handleTambahAlamat(alamat, setAlamat, alamat[0] || null)}
              className="text-xs font-bold border border-ash/50 bg-cloud px-4 py-1.5 hover:bg-ash transition cursor-pointer"
            >
              {alamat.length === 0 ? 'Add' : 'Edit'}
            </button>
          </div>

          {alamat.length === 0 ? (
            <div className="bg-white border border-ash/40 p-6 flex items-center gap-4">
              <div className="w-10 h-10 bg-cloud flex items-center justify-center border border-ash/30 shrink-0">
                <img src="https://res.cloudinary.com/dwearrvmp/image/upload/v1783670931/location_vuthyp.png" alt="Location Icon" className="w-5 h-5 text-steel" />
              </div>
              <span className="text-sm text-steel font-medium tracking-wide">No addresses added</span>
            </div>
          ) : (
            <div className="bg-white border border-ash/40 p-6 flex gap-4 items-start">
              <div className="w-10 h-10 bg-cloud flex items-center justify-center shrink-0 mt-0.5">
               <img src="https://res.cloudinary.com/dwearrvmp/image/upload/v1783670931/location_vuthyp.png" alt="Location Icon" className="w-5 h-5 text-steel" />
              </div>
              <div className="text-sm space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-ink">{alamat[0].name}</span>
                </div>
                <p className="text-steel font-medium text-xs">{alamat[0].phone || alamat[0].nohp}</p>
                <p className="text-smoke leading-relaxed pt-1 text-xs">
                  {alamat[0].detail}, {alamat[0].wilayah} ({alamat[0].country})
                </p>
              </div>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-black tracking-wider uppercase text-ink mb-3">Personal Details</h3>
          <div className="bg-white border border-ash/40 p-6 space-y-6">
            
            <div className="grid grid-cols-2 gap-6 items-center">
              <div>
                <label className="text-[10px] font-bold text-steel uppercase tracking-wider block mb-2">Gender</label>
                <div className="flex gap-4 text-xs font-bold text-ink">
                  {['Laki-laki', 'Perempuan'].map((jk) => (
                    <label key={jk} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="jenisKelamin" value={jk} checked={formData.jenisKelamin === jk} onChange={handleChange} className="w-3.5 h-3.5 accent-ink" />
                      <span>{jk}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-steel uppercase tracking-wider block mb-1">Birth Date</label>
                <input type="date" name="tanggalLahir" value={formData.tanggalLahir || ''} onChange={handleChange} className="text-xs font-bold text-ink bg-cloud border border-ash/30 px-3 py-1.5 focus:outline-none cursor-pointer" />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-ash/40 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cloud rounded-full border border-ash/30 overflow-hidden flex items-center justify-center">
                  {formData.fotoProfil ? (
                    <img src={formData.fotoProfil} alt="Profil" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-ash text-xl">👤</span>
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-steel uppercase tracking-wider block">Profile Photo</span>
                  <span className="text-xs text-steel font-medium">PNG or JPEG up to 1MB</span>
                </div>
              </div>
              
              <input 
                type="file" 
                id="uploadFoto" 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => handleFotoProfilChange(e, setFormData)} 
              />
              <label htmlFor="uploadFoto" className="text-xs font-bold border border-ash/50 bg-cloud px-4 py-1.5 hover:bg-ash transition cursor-pointer">
                Change Photo
              </label>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default UserProfile;