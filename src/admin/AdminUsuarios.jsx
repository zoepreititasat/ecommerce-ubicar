import { useEffect, useState } from "react"

const API = "http://localhost:4002/users"

export default function AdminUsuarios() {
  const [users, setUsers] = useState([])
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
      .then((data) => setUsers(data))
      .catch(() => alert("No se pudieron cargar los usuarios."))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <h1 className="p-10 text-2xl">Cargando usuarios...</h1>

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Usuarios</h1>

      <div className="bg-white border rounded-2xl overflow-hidden">
        {users.map((user) => (
          <div key={user.id} className="grid grid-cols-3 gap-4 p-4 border-b">
            <p>{user.firstname} {user.lastname}</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
          </div>
        ))}
      </div>
    </main>
  )
}