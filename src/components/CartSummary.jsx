import { Link } from "react-router-dom"

export default function CartSummary({ subtotal, serviceFee, total }) {
  return (
    <aside className="bg-white border border-gray-200 rounded-2xl p-6 h-fit sticky top-28 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Resumen</h2>

      <div className="space-y-4 text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold mt-8 hover:bg-blue-800 transition">
        Confirmar reserva
      </button>

      <Link to="/buscar" className="block text-center text-blue-700 font-semibold mt-4 hover:underline">
        Seguir buscando
      </Link>
    </aside>
  )
}