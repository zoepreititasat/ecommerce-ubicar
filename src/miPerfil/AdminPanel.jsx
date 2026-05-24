import { Link } from "react-router-dom"
import Volver from "../components/Volver.jsx"

export default function AdminPanel() {
  return (
    <main className="relative min-h-screen flex items-center justify-center">

        <div className="absolute top-8 left-8">
          <Volver />
        </div>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <h2 className="text-xl font-bold">Panel administrador</h2>
      <p className="text-gray-500 mt-2">
        Gestioná usuarios, cocheras, pagos e informes.
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <Link to="/admin/usuarios" className="border rounded-xl p-4 hover:bg-gray-50">
          <p className="font-bold">Usuarios</p>
          <p className="text-sm text-gray-500">Ver usuarios registrados.</p>
        </Link>

        <Link to="/admin/cocheras" className="border rounded-xl p-4 hover:bg-gray-50">
          <p className="font-bold">Cocheras</p>
          <p className="text-sm text-gray-500">Supervisar publicaciones.</p>
        </Link>

      </div>
    </div>
    </main>
  )
}