export default function EntryPostcode() {
  return (
    <div className="mt-16 w-full max-w-xl rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
      <input
        placeholder="Enter your postcode"
        className="w-full rounded-2xl bg-transparent p-6 text-center text-xl text-white outline-none placeholder:text-white/50"
      />

      <button className="mt-4 w-full rounded-2xl bg-lime-400 py-5 text-lg font-semibold text-black transition hover:brightness-110">
        Check Availability →
      </button>
    </div>
  );
}