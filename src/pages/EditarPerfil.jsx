import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Volver from "../components/Volver.jsx"

const API = "localhost:4002/users/user/obtener"

export default function EditarPerfil() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
  })

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

        setForm({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
        })

      })

      .catch(() => {
        alert("No se pudo cargar el perfil.")
      })

  }, [])

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

  }

  function handleSubmit(e) {

    e.preventDefault()

    const token = localStorage.getItem("token")

    fetch(API, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(form),
    })

      .then((res) => {

        if (!res.ok) {
          throw new Error()
        }

        return res.json()

      })

      .then(() => {

        alert("Perfil actualizado.")

        navigate("/mi-perfil")

      })

      .catch(() => {
        alert("No se pudo actualizar el perfil.")
      })

  }

  return (
   <main className="relative min-h-screen flex items-center justify-center">

        <div className="absolute top-8 left-8">
          <Volver />
        </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-3xl p-10 w-full max-w-2xl"
      >

        <h1 className="text-4xl font-bold mb-8">
          Editar perfil
        </h1>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-semibold">
              Nombre
            </label>

            <input
              type="text"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Apellido
            </label>

            <input
              type="text"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

        </div>

        <div className="mt-6">
          <label className="block mb-2 font-semibold">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition"
        >
          Guardar cambios
        </button>

      </form>

    </main>
  )
}