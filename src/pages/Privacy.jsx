import { Link } from "react-router-dom"
import Volver from "../components/Volver.jsx"

function Privacy() {
  return (
    <main className="relative min-h-screen bg-gray-50 px-8 py-16">
      <div className="absolute top-8 left-8">
        <Volver />
      </div>

      <div className="mx-auto max-w-6xl">
        <section className="mt-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-200 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
            Términos legales
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Privacidad en UbiCar
          </h1>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-gray-700">
            Nuestra Política de Privacidad explica qué datos personales
            recopilamos, cómo se utilizan, cómo se comparten y cuáles son
            tus derechos como usuario de UbiCar.
          </p>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <article className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-200 lg:col-span-2">
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                Política de Privacidad
              </h2>

              <p className="mt-4 leading-8 text-gray-700">
                Al utilizar UbiCar, podemos recopilar información necesaria
                para ofrecer el servicio, como datos de cuenta, reservas,
                publicaciones de cocheras, ubicación aproximada y datos de
                contacto.
              </p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900">
                Datos que recopilamos
              </h2>

              <ul className="mt-4 space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-700"></span>
                  <span>Nombre, apellido y correo electrónico.</span>
                </li>

                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-700"></span>
                  <span>Tipo de cuenta: usuario o vendedor.</span>
                </li>

                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-700"></span>
                  <span>Información sobre reservas realizadas.</span>
                </li>

                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-700"></span>
                  <span>Información sobre cocheras publicadas.</span>
                </li>

                <li className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-700"></span>
                  <span>
                    Datos necesarios para mejorar la seguridad de la plataforma.
                  </span>
                </li>
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900">
                Uso de la información
              </h2>

              <p className="mt-4 leading-8 text-gray-700">
                Utilizamos esta información para gestionar cuentas, facilitar
                reservas, permitir publicaciones, mejorar la experiencia del
                usuario y mantener la seguridad de la plataforma.
              </p>
            </section>
          </article>

          <aside className="h-fit rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
              🔒
            </div>

            <p className="mt-5 text-lg font-semibold leading-7 text-gray-900">
              Recibí ayuda con reservas, cuenta y otros asuntos.
            </p>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Si tenés dudas sobre privacidad, datos personales o el uso de la
              plataforma, podés comunicarte con el equipo de UbiCar.
            </p>

            <Link
              to="/login"
              className="mt-6 block rounded-xl bg-blue-700 px-5 py-3 text-center font-bold text-white shadow-lg transition hover:bg-blue-800 active:scale-95"
            >
              Iniciá sesión o registrate
            </Link>
          </aside>
        </section>
      </div>
    </main>
  )
}

export default Privacy