import { Link } from "react-router-dom"
import Volver from "../components/Volver.jsx"

export default function UserPanel() {
  return (
    <main className="relative min-h-screen flex items-center justify-center">

        <div className="absolute top-8 left-8">
          <Volver />
        </div>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <h2 className="text-xl font-bold">Panel de usuario</h2>
      <p className="text-gray-500 mt-2">
        Gestioná tus reservas y tu carrito.
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <Link to="/mis-reservas" className="border rounded-xl p-4 hover:bg-gray-50">
          <p className="font-bold">Mis reservas</p>
          <p className="text-sm text-gray-500">Ver reservas realizadas.</p>
        </Link>

        <Link to="/carrito" className="border rounded-xl p-4 hover:bg-gray-50">
          <p className="font-bold">Carrito</p>
          <p className="text-sm text-gray-500">Continuar con tus reservas.</p>
        </Link>
      </div>
    </div>
    </main>
  )
}