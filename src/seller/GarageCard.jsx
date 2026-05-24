import { FaEdit, FaTrash, FaMapMarkerAlt } from "react-icons/fa"

export default function GarageCard({ cochera }) {
  return (
    <article className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="h-48 bg-gray-100 flex items-center justify-center relative">
        <span className="text-gray-400 text-5xl">FOTO</span>

        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
            cochera.active
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {cochera.active ? "ACTIVA" : "INACTIVA"}
        </span>
      </div>

      <div className="p-6">
        <div className="flex justify-between gap-4">
          <h2 className="text-2xl font-bold text-blue-900">
            {cochera.title}
          </h2>

          <p className="text-sm font-bold text-gray-500 whitespace-nowrap">
            ${cochera.price}
          </p>
        </div>

        <p className="text-gray-600 mt-3">
          {cochera.description}
        </p>

        <p className="flex items-center gap-2 text-gray-500 mt-4">
          <FaMapMarkerAlt />
          {cochera.address}
        </p>

        <div className="border-t mt-6 pt-5 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {cochera.active ? "Disponible" : "No disponible"}
          </span>

          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-blue-700 transition">
              <FaEdit />
            </button>

            <button className="text-gray-500 hover:text-red-600 transition">
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}