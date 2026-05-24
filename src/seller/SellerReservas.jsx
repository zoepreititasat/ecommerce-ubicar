import { useEffect, useState } from "react"

import Volver from "../components/Volver.jsx"

const API = "http://localhost:4002/bookings/seller"

export default function SellerReservas() {

  const [reservas, setReservas] = useState([])

  useEffect(() => {

    const token = localStorage.getItem("token")

    fetch(API, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      .then((res) => res.json())
      .then((data) => setReservas(data))
      .catch(() => alert("No se pudieron cargar las reservas."))

  }, [])

  return (
   <main className="relative min-h-screen flex items-center justify-center">

        <div className="absolute top-8 left-8">
          <Volver />
        </div>
      <h1 className="text-3xl font-bold mb-6">
        Reservas recibidas
      </h1>

      <div className="grid gap-4">

        {reservas.map((reserva) => (

          <article
            key={reserva.id}
            className="bg-white border rounded-2xl p-5"
          >

            <h2 className="font-bold">
              {reserva.garageTitle}
            </h2>

            <p>
              Cliente: {reserva.userEmail}
            </p>

            <p>
              {reserva.startDate} - {reserva.endDate}
            </p>

          </article>

        ))}

      </div>

    </main>
  )
}