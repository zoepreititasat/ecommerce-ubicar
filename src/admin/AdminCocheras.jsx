import { useEffect, useState } from "react"

const API = "http://localhost:4002/products"

export default function AdminCocheras() {
  const [cocheras, setCocheras] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")

    fetch(API, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data) => setCocheras(data))
      .catch(() => alert("No se pudieron cargar las cocheras."))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <h1 className="p-10 text-2xl">Cargando cocheras...</h1>

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Cocheras</h1>

      <div className="grid gap-4">
        {cocheras.map((cochera) => (
          <article key={cochera.id} className="bg-white border rounded-2xl p-5">
            <h2 className="text-xl font-bold">{cochera.title}</h2>
            <p className="text-gray-600">{cochera.description}</p>
            <p className="text-gray-500">{cochera.address} - {cochera.zone}</p>
            <p className="font-bold text-blue-700 mt-2">${cochera.price}</p>
          </article>
        ))}
      </div>
    </main>
  )
}