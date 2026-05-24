import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Volver from "../components/Volver.jsx"

const API = "http://localhost:4002/api/v1/auth/authenticate"

const inputClass = `w-full border border-outline rounded-lg px-3 py-2.5
  text-sm bg-surface text-on-surface outline-none
  focus:border-primary-btn focus:bg-white transition-colors`

export default function Login({ setUser }) {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError("")

    if (!form.email || !form.password) {
      setError("Completá todos los campos.")
      return
    }

    setLoading(true)

    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al iniciar sesión")
        }

        return res.json()
      })
      .then((data) => {
        localStorage.setItem("token", data.access_token)

        setUser({
          firstname: "Usuario",
          role: "USER",
        })

        navigate("/")
      })
      .catch(() => {
        setError("Email o contraseña incorrectos.")
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
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-outline rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-xl font-bold text-on-surface mb-1">
          Iniciar sesión
        </h1>

        <p className="text-sm text-muted mb-6">
          Ingresá con tus datos
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-red-700 mb-4">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label className="text-[11px] font-bold text-on-surface-variant tracking-wider block mb-1.5">
            EMAIL
          </label>

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Ingresá tu email"
            className={inputClass}
          />
        </div>

        <div className="mb-5">
          <label className="text-[11px] font-bold text-on-surface-variant tracking-wider block mb-1.5">
            CONTRASEÑA
          </label>

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Ingresá tu contraseña"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-btn hover:bg-blue-900 text-white font-bold rounded-lg py-2.5 text-sm transition-colors disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Entrar"}
        </button>

        <p className="text-center text-sm text-muted mt-4">
          ¿No tenés cuenta?{" "}
          <Link
            to="/registro"
            className="text-primary-btn font-semibold hover:underline"
          >
            Registrate
          </Link>
        </p>
      </form>
    </main>
  )
}