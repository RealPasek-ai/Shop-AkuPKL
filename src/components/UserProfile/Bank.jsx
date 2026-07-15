import SideNavbarUser from "./SideNavbarUser";
import { useBank } from "../../hooks/UserProfile/useBank";
import { handleTambahKartu, DAFTAR_BANK } from "../../utils/UserProfile/Bank";
import KartuList from "./KartuList"; 

const Bank = ({ user }) => {
  const { kartu, setKartu } = useBank();

  return (
    <div className="flex min-h-screen bg-[#FBF8F3] p-8 font-sans text-gray-900">
      {/* Sidebar */}
      <div className="w-64 shrink-0">
        <SideNavbarUser user={user} />
      </div>

      {/* Main Content */}
      <main className="grow ml-8 space-y-8">
        {DAFTAR_BANK.map((bank) => (
          <div key={bank.key} className="p-10 rounded-3xl shadow-sm bg-[#F7F3EB] border border-gray-200/40">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold">{bank.title}</h1>
              <button
                onClick={() => handleTambahKartu(bank.key, setKartu)}
                className="bg-[#FBF8F3] hover:bg-[#F5F0E6] border border-gray-300/50 text-gray-900 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                + Tambah
              </button>
            </div>
            
            <hr className="border-gray-300/40 my-6" />
            
            {/* List Kartu berdasarkan Kategori */}
            <KartuList kartu={kartu} jenis={bank.key} setKartu={setKartu} />
          </div>
        ))}
      </main>
    </div>
  );
};

export default Bank;