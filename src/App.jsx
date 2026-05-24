import { useState } from "react"

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"

import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import SearchBar from "./components/SearchBar.jsx"
import Cart from "./components/Cart.jsx"

import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"

import Privacy from "./pages/Privacy.jsx"
import Terms from "./pages/Terms.jsx"
import Company from "./pages/Company.jsx"

import MiPerfil from "./miPerfil/MiPerfil.jsx"
import AdminUsuarios from "./admin/AdminUsuarios.jsx"
import AdminCocheras from "./admin/AdminCocheras.jsx"

import MisReservas from "./user/MisReservas.jsx"

import SellerCocheras from "./seller/SellerCocheras.jsx"
import SellerReservas from "./seller/SellerReservas.jsx"
import PublicarCochera from "./seller/PublicarCochera.jsx"

import EditarPerfil from "./pages/EditarPerfil.jsx"

function Layout() {
  const [user, setUser] = useState({
  firstname: "Tiziana",
  lastname: "Cocaro",
  email: "tizi@gmail.com",
  role: "SELLER",
})
  const location = useLocation()

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/registro"

  function handleSearch(data) {
    console.log("Búsqueda:", data)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && (
        <Navbar user={user} setUser={setUser} />
      )}

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <div className="p-10">
                <h1 className="text-3xl mb-8">Inicio</h1>
                <SearchBar onSearch={handleSearch} />
              </div>
            }
          />

          <Route
            path="/buscar"
            element={
              <div className="p-10">
                <h1 className="text-3xl mb-8">Buscar cochera</h1>
                <SearchBar onSearch={handleSearch} />
              </div>
            }
          />

          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/registro" element={<Register />} />

          <Route
            path="/ayuda"
            element={<h1 className="p-10 text-3xl">Ayuda</h1>}
          />

          {/* FOOTER */}
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/terminos" element={<Terms />} />
          <Route path="/empresa" element={<Company />} />

          {/* CARRITO */}
          <Route path="/carrito" element={<Cart />} />

          <Route path="/mi-perfil" element={<MiPerfil setUser={setUser} />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          <Route path="/admin/cocheras" element={<AdminCocheras />} />

          <Route path="/mis-reservas" element={<MisReservas />} />
          
          <Route path="/seller/cocheras" element={<SellerCocheras />} />
          <Route path="/seller/reservas" element={<SellerReservas />} />
          <Route path="/publicar" element={<PublicarCochera />} />

          <Route path="/editar-perfil" element={<EditarPerfil />} />

        </Routes>
      </main>

      {!hideNavbar && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}