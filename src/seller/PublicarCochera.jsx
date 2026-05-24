import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { FaCamera } from "react-icons/fa"
import Volver from "../components/Volver.jsx"

const API = "http://localhost:4002/products"

export default function PublicarCochera() {

  const navigate = useNavigate()

  const [imagePreview, setImagePreview] = useState(null)

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    zone: "",
    active: true,
    discountPercentage: 0,
    discountActive: false,
    vehicleType: "AUTO",
  })

  const [loading, setLoading] = useState(false)

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

  }

  function handleImageChange(e) {

    const file = e.target.files[0]

    if (!file) return

    setImagePreview(URL.createObjectURL(file))

  }

  function handleSubmit(e) {

    e.preventDefault()

    setLoading(true)

    const token = localStorage.getItem("token")

    fetch(API, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        discountPercentage: Number(form.discountPercentage),
      }),
    })

      .then((res) => {

        if (!res.ok) {
          throw new Error()
        }

        return res.json()

      })

      .then(() => {

        alert("Cochera publicada correctamente.")

        navigate("/seller/cocheras")

      })

      .catch(() => {
        alert("No se pudo publicar la cochera.")
      })

      .finally(() => {
        setLoading(false)
      })

  }

  return (
    <main className="relative min-h-screen flex items-center justify-center">

        <div className="absolute top-8 left-8">
          <Volver />
        </div>

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-5xl font-bold text-blue-900">
              Publicar cochera
            </h1>

            <p className="text-gray-500 mt-2">
              Creá una nueva publicación para tu espacio.
            </p>

          </div>

          <button className="bg-blue-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-900 transition">
            Guardar borrador
          </button>

        </div>

        <section className="grid grid-cols-[1fr_420px] gap-8">

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8"
          >

            <div className="space-y-6">

              {/* TITLE */}
              <div>

                <label className="block font-semibold text-gray-700 mb-2">
                  Nombre de la cochera
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Ej: Cochera techada en Palermo"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />

              </div>

              {/* ADDRESS */}
              <div>

                <label className="block font-semibold text-gray-700 mb-2">
                  Dirección
                </label>

                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Av. Santa Fe 3200"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />

              </div>

              {/* ZONE */}
              <div>

                <label className="block font-semibold text-gray-700 mb-2">
                  Zona
                </label>

                <input
                  type="text"
                  name="zone"
                  value={form.zone}
                  onChange={handleChange}
                  placeholder="Palermo"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />

              </div>

              {/* DESCRIPTION */}
              <div>

                <label className="block font-semibold text-gray-700 mb-2">
                  Descripción
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Contá detalles de la cochera..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 h-36"
                />

              </div>

              {/* PRICE + VEHICLE */}
              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="block font-semibold text-gray-700 mb-2">
                    Precio
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="$12000"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  />

                </div>

                <div>

                  <label className="block font-semibold text-gray-700 mb-2">
                    Vehículo
                  </label>

                  <select
                    name="vehicleType"
                    value={form.vehicleType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  >

                    <option value="AUTO">
                      Auto
                    </option>

                    <option value="MOTO">
                      Moto
                    </option>

                    <option value="CAMIONETA">
                      Camioneta
                    </option>

                  </select>

                </div>

              </div>

              {/* IMAGE */}
              <div>

                <label className="block font-semibold text-gray-700 mb-2">
                  Fotos
                </label>

                <label className="border-2 border-dashed border-gray-300 rounded-2xl h-52 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition overflow-hidden">

                  {imagePreview ? (

                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <>

                      <FaCamera className="text-5xl text-gray-400" />

                      <p className="mt-3 font-medium">
                        Subir imágenes
                      </p>

                    </>

                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </label>

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-800 text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition disabled:opacity-50"
              >

                {loading
                  ? "Publicando..."
                  : "Publicar cochera"}

              </button>

            </div>

          </form>

          {/* PREVIEW */}
          <aside className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden h-fit">

            <div className="h-64 bg-gray-100 flex items-center justify-center overflow-hidden">

              {imagePreview ? (

                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />

              ) : (

                <span className="text-7xl text-black">  
                  imagen
                </span>

              )}

            </div>

            <div className="p-8">

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                DISPONIBLE
              </span>

              <h2 className="text-3xl font-bold text-blue-900 mt-5">

                {form.title || "Cochera moderna en Palermo"}

              </h2>

              <p className="text-gray-500 mt-3">

                {form.address || "Av. Santa Fe 3200"}

              </p>

              <p className="text-gray-600 mt-5 leading-7">

                {form.description || "Cochera cubierta con seguridad 24hs y acceso inmediato."}

              </p>

              <div className="flex items-center justify-between mt-8">

                <div>

                  <p className="text-sm text-gray-500">
                    Precio mensual
                  </p>

                  <p className="text-4xl font-bold text-blue-800">

                    ${form.price || "12000"}

                  </p>

                </div>

              </div>

            </div>

          </aside>

        </section>

      </div>

    </main>
  )
}