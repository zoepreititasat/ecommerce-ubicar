import { useEffect, useState } from "react"

const API = "http://localhost:4002/reservations/user/1"

export default function MisReservas() {

  const [reservas, setReservas] = useState([])
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

        if (!res.ok) {
          throw new Error()
        }

        return res.json()

      })

      .then((data) => {
        setReservas(data)
      })

      .catch(() => {
        alert("No se pudieron cargar las reservas.")
      })

      .finally(() => {
        setLoading(false)
      })

  }, [])

  if (loading) {
    return <h1 className="p-10 text-3xl">Cargando reservas...</h1>
  }

  return (
    <main className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        Mis reservas
      </h1>

      <div className="grid gap-4">

        {reservas.map((reserva) => (

          <article
            key={reserva.id}
            className="bg-white border border-gray-200 rounded-2xl p-5"
          >

            <h2 className="text-xl font-bold">
              Reserva #{reserva.id}
            </h2>

            <p className="text-gray-600 mt-2">
              Producto: {reserva.productId}
            </p>

            <p className="mt-2">
              Inicio: {reserva.startDate}
            </p>

            <p>
              Fin: {reserva.endDate}
            </p>

          </article>

        ))}

      </div>

    </main>
  )
}