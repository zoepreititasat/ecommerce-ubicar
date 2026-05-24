import { FaTrash } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"

export default function CartItem({ item, finalPrice, onRemove }) {
  return (
    <article className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>

      <p className="text-gray-600 mt-2">{item.description}</p>

      <p className="text-gray-500 mt-2">
        {item.address} - {item.zone}
      </p>

      <div className="mt-4 inline-flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
        <div>
          <p className="text-xs font-bold text-blue-700 uppercase">
            Fecha
          </p>

          <p className="text-sm text-gray-700">
            {item.startDate} - {item.endDate}
          </p>
        </div>

      </div>

      <p className="text-sm text-gray-500 mt-4">
        Vehículo: {item.vehicleType}
      </p>

      <div className="mt-8 flex justify-between items-end">
        <div>
          {item.discountActive && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              {item.discountPercentage}% de descuento
            </span>
          )}
        </div>

      <div className="flex flex-col items-end gap-3">

        {/* ACCIONES */}
        <div className="flex items-center gap-4">

            <button
            type="button"
            className="text-blue-700 hover:text-blue-900 transition"
            >
            <FiEdit2 size={20} />
            </button>

            <button
            onClick={() => onRemove(item.id)}
            className="text-red-600 hover:text-red-800 transition"
            >
            <FaTrash size={20} />
            </button>

        </div>

        {/* PRECIO */}
        <p className="text-2xl font-bold text-blue-700">
            ${finalPrice}
        </p>

        </div>
      </div>
    </article>
  )
}