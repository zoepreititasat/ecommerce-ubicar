import Volver from "./Volver.jsx"
import AuthHero from "./AuthHero.jsx"

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-8 left-8 z-20">
        <Volver />
      </div>

      <AuthHero />

      <section className="flex items-center justify-center px-8 py-12">
        {children}
      </section>
    </main>
  )
}