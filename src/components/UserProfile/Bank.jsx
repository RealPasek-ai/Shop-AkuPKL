import SideNavbarUser from "./SideNavbarUser";
import { useBank } from "../../hooks/UserProfile/useBank";
import { handleTambahKartu, DAFTAR_BANK } from "../../utils/UserProfile/Bank";
import KartuList from "./KartuList";

const Bank = ({ user }) => {
  const { kartu, setKartu } = useBank();

  return (
    <div className="flex min-h-screen bg-cloud flex-row p-12 font-body antialiased text-ink justify-center">
      {/* Sidebar */}
      <div className="w-64 shrink-0 pt-2">
        <SideNavbarUser user={user} />
      </div>

      {/* Main Content */}
      <main className="grow max-w-3xl ml-4 space-y-10">
        {DAFTAR_BANK.map((bank) => (
          <div key={bank.key}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-black tracking-wider uppercase text-ink">{bank.title}</h3>
              <button
                onClick={() => handleTambahKartu(bank.key, setKartu)}
                className="text-xs font-bold border border-ash/50 bg-cloud px-4 py-1.5 uppercase tracking-wider hover:bg-ash transition cursor-pointer"
              >
                + Tambah
              </button>
            </div>

            <div className="bg-white border border-ash/40 p-6">
              <KartuList kartu={kartu} jenis={bank.key} setKartu={setKartu} />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Bank;
