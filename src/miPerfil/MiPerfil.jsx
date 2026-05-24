import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import ProfileSidebar from "./ProfileSidebar.jsx"
import ProfileInfo from "./ProfileInfo.jsx"
import SecurityCard from "./SecurityCard.jsx"
import NotificationsCard from "./NotificationsCard.jsx"
import UserPanel from "./UserPanel.jsx"
import SellerPanel from "./SellerPanel.jsx"
import AdminPanel from "./AdminPanel.jsx"

export default function MiPerfil({ setUser }) {
  const navigate = useNavigate()

  const [user, setProfileUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setProfileUser({
      firstname: "tiziana",
      lastname: "cocaro",
      email: "tizi@gmail.com",
      role: "SELLER",
    })

    setLoading(false)
  }, [])

  function handleLogout() {
    localStorage.removeItem("token")
    setUser(null)
    navigate("/")
  }

  if (loading) {
    return <h1 className="p-10 text-2xl font-bold">Cargando perfil...</h1>
  }

  return (
    <main className="min-h-screen bg-gray-50 px-8 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-[260px_1fr] gap-8">
        <ProfileSidebar user={user} onLogout={handleLogout} />

        <section className="space-y-8">
          <ProfileInfo user={user} />

          <div className="grid grid-cols-2 gap-8">
            <SecurityCard />
            <NotificationsCard />
          </div>
            {user.role === "USER" && <UserPanel />}
            {user.role === "SELLER" && <SellerPanel />}
            {user.role === "ADMIN" && <AdminPanel />}
        </section>
      </div>
    </main>
  )
}