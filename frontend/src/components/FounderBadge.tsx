
export default function FounderBadge() {
  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full border border-amber-400/30 bg-[#06152f]/90 p-1.5 pr-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105">

      <img
        src="/leadership/ravi.jpg"
        alt="GRK Groups Founder"
        className="h-10 w-10 rounded-full border-2 border-amber-400 object-cover"
      />

      <div>
        <p className="text-[11px] font-bold text-white">
          Ganta Ravi Kumar
        </p>

        <p className="text-[10px] font-medium text-amber-300">
          Founder
        </p>
      </div>

    </div>
  );
}
