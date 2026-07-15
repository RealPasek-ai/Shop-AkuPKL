import React from "react";
import SideNavbarUser from "./SideNavbarUser";
import {
  handleLogout,
  handleHapusAkun,
} from "../../utils/UserProfile/handleLogOut";
import { handleGantiPassword } from "../../utils/UserProfile/RubahPw";

const UbahPassword = ({ user, setUser }) => {
  return (
    <div className="flex min-h-screen bg-[#FBF8F3] flex-row p-8 font-sans antialiased text-gray-900">
      <div className="w-64 shrink-0">
        <SideNavbarUser user={user} />
      </div>

      <main className="grow ml-8">
        <div className="p-10 rounded-3xl shadow-sm bg-[#F7F3EB] w-full max-w-4xl border border-gray-200/40">
          
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Pengaturan Privasi
          </h1>
          <hr className="border-gray-300/40 my-6" />

         
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleGantiPassword(user, setUser)}
                className="bg-[#FBF8F3] hover:bg-[#F5F0E6] border border-gray-300/50 text-gray-900 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                Ganti Password
              </button>

              <button
                onClick={() => handleHapusAkun(setUser)}
                className="border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Hapus Akun
              </button>

              <button
                onClick={() => handleLogout(setUser)}
                className="text-gray-400 hover:text-gray-900 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ml-4"
              >
                Keluar (Logout)
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default UbahPassword;