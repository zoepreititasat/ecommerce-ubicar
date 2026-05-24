import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/UbiCar.svg"

const LINKS = {
  publico: [
    { label: "Inicio", path: "/" },
    { label: "Buscar cochera", path: "/buscar" },
    { label: "Ayuda", path: "/ayuda" },
    { label: "Carrito", path: "/carrito" },
    { label: "Mi Perfil", path: "/mi-perfil" },
  ],
  USER: [
    { label: "Buscar cochera", path: "/buscar" },
    { label: "Mis reservas", path: "/mis-reservas" },
    { label: "Carrito", path: "/carrito" },
  ],
  SELLER: [
    { label: "Dashboard", path: "/seller/dashboard" },
    { label: "Mis cocheras", path: "/seller/cocheras" },
    { label: "Reservas", path: "/seller/reservas" },
    { label: "Ingresos", path: "/seller/ingresos" },
  ],
  ADMIN: [
    { label: "Usuarios", path: "/admin/usuarios" },
    { label: "Cocheras", path: "/admin/cocheras" },
    { label: "Pagos", path: "/admin/pagos" },
    { label: "Reportes", path: "/admin/reportes" },
  ],
}

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate()
  const links = LINKS[user?.role ?? "publico"]

  function handleLogout() {
    setUser(null)
    navigate("/")
  }

  if (user) {
    return (
      <header className="bg-white border-b border-gray-200 px-6 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo UbiCar" className="w-20 h-20 object-contain" />
          <h1 className="text-lg font-bold text-gray-800">UbiCar</h1>
        </Link>

        <nav className="flex items-center gap-2">
          {links.map((link) => (
            <Link key={link.path} to={link.path} className="text-sm font-medium text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-800">
            Hola, {user.firstname}
          </span>

          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
            Cerrar sesión
          </button>

          <Link to="/mi-perfil">
            Mi perfil
          </Link>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 h-24 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="Logo UbiCar" className="w-20 h-20 object-contain" />
        <h1 className="text-lg font-bold text-gray-800">UbiCar</h1>
      </Link>

      <nav className="flex items-center gap-2">
        {links.map((link) => (
          <Link key={link.path} to={link.path} className="text-sm font-medium text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition">
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link to="/login" className="text-sm font-medium text-blue-700 px-4 py-2 rounded-md hover:bg-blue-50 transition">
          Iniciar sesión
        </Link>

        <Link to="/registro" className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition">
          Registrarse
        </Link>
      </div>
    </header>
  )
}