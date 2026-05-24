import { Link } from "react-router-dom"
import Volver from "../components/Volver.jsx"

export default function SellerPanel() {
  return (
    <main className="relative min-h-screen flex items-center justify-center">

        <div className="absolute top-8 left-8">
          <Volver />
        </div>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <h2 className="text-xl font-bold">Panel vendedor</h2>
      <p className="text-gray-500 mt-2">
        Administrá tus cocheras, reservas e ingresos.
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <Link to="/publicar" className="border rounded-xl p-4 hover:bg-gray-50">
          <p className="font-bold">Publicar cochera</p>
          <p className="text-sm text-gray-500">Crear una nueva publicación.</p>
        </Link>

        <Link to="/seller/cocheras" className="border rounded-xl p-4 hover:bg-gray-50">
          <p className="font-bold">Mis cocheras</p>
          <p className="text-sm text-gray-500">Editar tus espacios.</p>
        </Link>

        <Link to="/seller/reservas" className="border rounded-xl p-4 hover:bg-gray-50">
          <p className="font-bold">Reservas recibidas</p>
          <p className="text-sm text-gray-500">Ver próximas reservas.</p>
        </Link>

      </div>
    </div>
    </main>
  )
}