export default function RolePanel({ role }) {
  if (role === "SELLER") {
    return (
      <Panel
        title="Panel vendedor"
        text="Gestioná tus cocheras publicadas, reservas recibidas e ingresos."
      />
    )
  }

  if (role === "ADMIN") {
    return (
      <Panel
        title="Panel administrador"
        text="Administrá usuarios, cocheras, pagos y reportes de la plataforma."
      />
    )
  }

  return (
    <Panel
      title="Panel usuario"
      text="Consultá tus reservas, tu carrito y tus próximas cocheras alquiladas."
    />
  )
}

function Panel({ title, text }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-500 mt-2">{text}</p>
    </div>
  )
}