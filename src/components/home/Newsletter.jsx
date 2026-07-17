export default function Newsletter() {
  function handleSubmit(e) {
    e.preventDefault();
    // Integrasi backend/email service dapat ditambahkan tim lain di sini.
  }

  return (
    <section className="border-t border-black bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-8">
        <span className="eyebrow text-white/60">Jangan Ketinggalan</span>
        <h2 className="heading-display max-w-xl text-4xl text-white sm:text-5xl">
          Info Drop Terbaru, Langsung ke Inbox-mu.
        </h2>
        <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 pt-2 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Alamat email
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="Alamat email kamu"
            className="w-full border border-white bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          <button
            type="submit"
            className="whitespace-nowrap border border-white bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-black hover:text-white"
          >
            Berlangganan
          </button>
        </form>
      </div>
    </section>
  );
}
