export default function Background() {
  return (
    <div className="fixed inset-0 h-screen w-full">
      <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[4px]"></div> {/* 👈 black overlay */}
      <p className="absolute inset-0 top-[calc(100dvh-1rem)] lg:top-[calc(100dvh-2rem)] left-2 text-white/90 font-light text-xs lg:text-base select-none italic">Credit @aenamiart</p>
    </div>
  )
}
