export default function AuthHero() {
  return (
    <section className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-blue-950 via-sky-900 to-blue-700 text-white p-16 items-center">
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl"></div>

      <div className="relative z-10 max-w-lg">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-200 mb-4">
          UbiCar
        </p>

        <h1 className="text-6xl font-bold leading-tight">
          Asegurá tu espacio,
          <br />
          en cualquier lugar.
        </h1>

        <p className="mt-8 text-lg leading-8 text-blue-100">
          Reservá y publicá cocheras de forma moderna, rápida y segura.
        </p>

        <div className="grid grid-cols-2 gap-5 mt-12">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-5">
            <p className="text-3xl">🛡️</p>
            <p className="font-bold text-xl mt-3">100% seguro</p>
            <p className="text-blue-100 text-sm mt-1">Espacios verificados</p>
          </div>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-5">
            <p className="text-3xl">⚡</p>
            <p className="font-bold text-xl mt-3">Reservas rápidas</p>
            <p className="text-blue-100 text-sm mt-1">Todo en segundos</p>
          </div>
        </div>
      </div>
    </section>
  )
}