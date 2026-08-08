import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-lg">
        {/* Giant 404 */}
        <h1 className="font-archivo text-[8rem] sm:text-[10rem] md:text-[12rem] font-black leading-none tracking-tighter text-white/10 select-none">
          404
        </h1>

        {/* Message */}
        <p className="font-archivo text-xl sm:text-2xl md:text-3xl font-bold text-mono-300 -mt-12">
          Looks like you wandered too far
        </p>

        <p className="font-sans text-sm text-mono-500 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="mt-4 px-8 py-3 border border-mono-500 rounded-full font-sans text-sm font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
