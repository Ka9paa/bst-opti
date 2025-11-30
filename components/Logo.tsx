export function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
          <span className="font-bold text-white text-xl">A</span>
        </div>
      </div>
      <span className="font-bold text-xl text-white">Axira</span>
    </div>
  );
}
