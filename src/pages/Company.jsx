import Volver from "../components/Volver.jsx"

export default function Company() {
  return (
    <main className="relative min-h-screen bg-gray-50 px-8 py-16">
      <div className="absolute top-8 left-8">
        <Volver />
      </div>

      <section className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-sm ring-1 ring-gray-200">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
          Información legal
        </p>

        <h1 className="mt-4 text-4xl font-bold text-gray-900">
          Detalles de la empresa
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-700">
          UbiCar es una plataforma digital que conecta personas que necesitan
          alquilar una cochera con propietarios que desean ofrecer espacios de
          estacionamiento disponibles.
        </p>

        <div className="mt-10 space-y-6 text-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Nombre de la empresa
            </h2>
            <p className="mt-2">UbiCar Technologies Inc.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Ubicación
            </h2>
            <p className="mt-2">Buenos Aires, Argentina.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Contacto
            </h2>
            <p className="mt-2">soporte@ubicar.com</p>
          </div>
        </div>
      </section>
    </main>
  )
}