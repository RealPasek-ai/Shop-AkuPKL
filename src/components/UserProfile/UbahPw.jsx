import React from "react";
import SideNavbarUser from "./SideNavbarUser";
import {
  handleLogout,
  handleHapusAkun,
} from "../../utils/UserProfile/handleLogOut";
import { handleGantiPassword } from "../../utils/UserProfile/RubahPw";

const UbahPassword = ({ user, setUser }) => {
  return (
    <div className="flex min-h-screen bg-cloud flex-row p-12 font-body antialiased text-ink justify-center">
      <div className="w-64 shrink-0 pt-2">
        <SideNavbarUser user={user} />
      </div>

      <main className="grow max-w-3xl ml-4 space-y-10">
        <div>
          <h3 className="text-sm font-black tracking-wider uppercase text-ink mb-3">Pengaturan Privasi</h3>
          <div className="bg-white border border-ash/40 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleGantiPassword(user, setUser)}
                className="text-xs font-bold border border-ash/50 bg-cloud px-4 py-2 uppercase tracking-wider hover:bg-ash transition cursor-pointer"
              >
                Ganti Password
              </button>

              <button
                onClick={() => handleHapusAkun(setUser)}
                className="text-xs font-bold border border-red-200 bg-red-50 text-red-600 px-4 py-2 uppercase tracking-wider hover:bg-red-100 transition cursor-pointer"
              >
                Hapus Akun
              </button>

              <button
                onClick={() => handleLogout(setUser)}
                className="text-xs font-bold text-steel hover:text-ink uppercase tracking-wider transition cursor-pointer ml-auto"
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
