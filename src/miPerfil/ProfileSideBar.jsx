import { Link } from "react-router-dom"

const MENU = {
  USER: [
    { label: "Mi perfil", path: "/mi-perfil" },
    { label: "Mis reservas", path: "/mis-reservas" },
    { label: "Carrito", path: "/carrito" },
  ],
  SELLER: [
    { label: "Mi perfil", path: "/mi-perfil" },
    { label: "Mis cocheras", path: "/seller/cocheras" },
    { label: "Publicar cochera", path: "/publicar" },
    { label: "Reservas", path: "/seller/reservas" },
  ],
  ADMIN: [
    { label: "Mi perfil", path: "/mi-perfil" },
    { label: "Usuarios", path: "/admin/usuarios" },
    { label: "Cocheras", path: "/admin/cocheras" },
    { label: "Reportes", path: "/admin/reportes" },
  ],
}

export default function ProfileSidebar({ user, onLogout }) {
  const menu = MENU[user.role] || MENU.USER

  return (
    <aside className="bg-white rounded-2xl border border-gray-200 p-6 h-fit shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-700">
          {user.firstname?.charAt(0)}
        </div>

        <h2 className="mt-4 text-xl font-bold">
          {user.firstname} {user.lastname}
        </h2>

        <p className="text-sm tracking-widest text-gray-500 uppercase">
          {user.role}
        </p>
      </div>

      <nav className="mt-8 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-100"
          >
            {item.label}
          </Link>
        ))}

        <button
          onClick={onLogout}
          className="w-full text-left text-red-600 px-4 py-3 rounded-xl hover:bg-red-50"
        >
          Cerrar sesión
        </button>
      </nav>
    </aside>
  )
}