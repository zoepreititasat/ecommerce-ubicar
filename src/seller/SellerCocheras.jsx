import { useEffect, useState } from "react"
import { FaEdit, FaTrash, FaMapMarkerAlt, FaPlus } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

import Volver from "../components/Volver.jsx"

const API = "http://localhost:4002/products/active"

export default function SellerCocheras() {
  const [cocheras, setCocheras] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")

    fetch(API, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }

        return res.json()
      })
      .then((data) => {
        setCocheras(data)
      })
      .catch(() => {
        alert("No se pudieron cargar las cocheras.")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <h1 className="p-10 text-3xl">Cargando cocheras...</h1>
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center">

        <div className="absolute top-8 left-8">
          <Volver />
        </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-bold text-blue-900">
              Mis cocheras
            </h1>

            <p className="text-gray-500 mt-2">
              Administrá y monitoreá tus espacios publicados.
            </p>
          </div>

          <button
            onClick={() => navigate("/publicar")}
            className="bg-blue-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-900 transition"
            >
            <FaPlus />
            Agregar cochera
            </button>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cocheras.map((cochera) => (
            <article
              key={cochera.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center relative">
                <span className="text-gray-400 text-5xl"> imagen </span>

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
          ))}
        </section>
      </div>
    </main>
  )
}