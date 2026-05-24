import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthLayout from "../components/AuthLayout.jsx"
import RoleSelector from "../components/RoleSelector.jsx"

const API = "http://localhost:4002/api/v1/auth/register"

const inputClass =
  "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-100"

const fields = [
  { name: "firstname", placeholder: "Nombre" },
  { name: "lastname", placeholder: "Apellido" },
  { name: "email", placeholder: "Correo electrónico", type: "email" },
  { name: "password", placeholder: "Contraseña", type: "password" },
]

export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError("")

    if (!form.firstname || !form.lastname || !form.email || !form.password || !form.role) {
      setError("Completá todos los campos.")
      return
    }

    setLoading(true)

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error()
        navigate("/login")
      })
      .catch(() => setError("No se pudo crear la cuenta."))
      .finally(() => setLoading(false))
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-3xl p-10 shadow-xl border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900">Crear cuenta</h1>
        <p className="text-gray-500 mt-3 mb-8">Empezá a usar UbiCar hoy mismo.</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          {fields.slice(0, 2).map((field) => (
            <input
              key={field.name}
              {...field}
              value={form[field.name]}
              onChange={handleChange}
              className={inputClass}
            />
          ))}
        </div>

        {fields.slice(2).map((field) => (
          <input
            key={field.name}
            {...field}
            value={form[field.name]}
            onChange={handleChange}
            className={`${inputClass} mb-4`}
          />
        ))}

        <p className="text-xs font-bold text-gray-500 tracking-wider mb-3">
          TIPO DE CUENTA
        </p>

        <RoleSelector
          selectedRole={form.role}
          onSelect={(role) => setForm({ ...form, role })}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
        >
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-blue-700 font-bold hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}