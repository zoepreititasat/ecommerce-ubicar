import { useEffect, useState } from "react"

import CartItem from "./CartItem.jsx"
import CartSummary from "./CartSummary.jsx"
import CartTimer from "./CartTimer.jsx"

import Volver from "../components/Volver.jsx"

const API = "http://localhost:4002/cart"

export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(15 * 60)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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
          throw new Error("Error")
        }

        return res.json()
      })
      .then((data) => {
        setCartItems(data)
      })
      .catch(() => {
        setCartItems([
          {
            id: 1,
            title: "Cochera cubierta en Palermo",
            description: "Cochera techada con seguridad 24hs.",
            price: 12000,
            address: "Av. Santa Fe 3200",
            zone: "Palermo",
            active: true,
            discountPercentage: 10,
            discountActive: true,
            vehicleType: "AUTO",
          },
          {
            id: 2,
            title: "Cochera privada en Belgrano",
            description: "Espacio amplio ideal para camionetas.",
            price: 9500,
            address: "Juramento 1800",
            zone: "Belgrano",
            active: true,
            discountPercentage: 0,
            discountActive: false,
            vehicleType: "CAMIONETA",
          },
        ])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  function handleRemove(id) {
    const token = localStorage.getItem("token")

    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al eliminar del carrito")
        }

        setCartItems((prev) =>
          prev.filter((item) => item.id !== id)
        )
      })
      .catch(() => {
        alert("No se pudo eliminar la cochera del carrito.")
      })
  }

  function getFinalPrice(item) {
    if (item.discountActive) {
      return item.price - (item.price * item.discountPercentage) / 100
    }

    return item.price
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const subtotal = cartItems.reduce((total, item) => {
    return total + getFinalPrice(item)
  }, 0)

  const serviceFee = subtotal * 0.1
  const total = subtotal + serviceFee

  if (loading) {
    return (
      <main className="p-10">
        <h1 className="text-3xl font-bold">
          Cargando carrito...
        </h1>
      </main>
    )
  }

  return (
            <main className="max-w-7xl mx-auto px-8 py-8">
            <div className="mb-6">
                <Volver />
            </div>

            <div className="flex items-center justify-between mb-10">
                <h1 className="text-4xl font-bold text-gray-900">
                Tu carrito
                </h1>

                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                {cartItems.length} cocheras
                </span>
            </div>

      <CartTimer minutes={minutes} seconds={seconds} />

      <div className="grid grid-cols-[1fr_380px] gap-10">
        <section className="space-y-6">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              finalPrice={getFinalPrice(item)}
              onRemove={handleRemove}
            />
          ))}
        </section>

        <CartSummary
          subtotal={subtotal}
          serviceFee={serviceFee}
          total={total}
        />
      </div>
    </main>
  )
}