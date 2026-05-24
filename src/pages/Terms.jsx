import { Link } from "react-router-dom"
import Volver from "../components/Volver.jsx"

export default function Terms() {
  return (
    <main className="relative min-h-screen flex items-center justify-center">
    
            <div className="absolute top-8 left-8">
              <Volver />
            </div>

      <div className="grid grid-cols-[1fr_320px] gap-20">
        <section>
          <p className="text-sm font-semibold text-gray-500 mb-2">
            Términos legales
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Términos de servicio
          </h1>

          <div className="border border-gray-300 rounded-xl p-5 mb-12 text-gray-700 leading-relaxed">
            UbiCar conecta personas que necesitan estacionar con personas
            que ofrecen cocheras disponibles. Al usar la plataforma, aceptás
            estos términos de servicio.
          </div>

          <h2 className="text-2xl font-bold mb-5">
            Términos de Servicio para Usuarios
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8">
            Como usuario, podés buscar y reservar cocheras disponibles.
            Es tu responsabilidad ingresar datos reales y respetar las
            condiciones de cada reserva.
          </p>

          <h2 className="text-2xl font-bold mb-5">
            Términos para Vendedores
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8">
            Como vendedor, podés publicar cocheras, definir disponibilidad,
            precio y condiciones de uso. Sos responsable de que la información
            publicada sea clara, real y actualizada.
          </p>

          <h3 className="text-xl font-bold mb-3">
            Reservas
          </h3>

          <p className="text-gray-700 leading-relaxed mb-8">
            Las reservas se confirman según disponibilidad. UbiCar podrá
            intervenir como intermediario ante conflictos entre usuarios y
            vendedores.
          </p>

          <h3 className="text-xl font-bold mb-3">
            Uso responsable
          </h3>

          <p className="text-gray-700 leading-relaxed">
            No se permite publicar información falsa, usar cuentas de terceros
            ni realizar acciones que perjudiquen a otros usuarios o a la
            plataforma.
          </p>
        </section>

        <aside className="border border-gray-300 rounded-xl p-6 h-fit">
          <p className="text-lg font-medium mb-5">
            Recibí ayuda con reservas, cuenta y otros asuntos.
          </p>

          <Link
            to="/login"
            className="block text-center bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Iniciá sesión o registrate
          </Link>
        </aside>
      </div>
    </main>
  )
}