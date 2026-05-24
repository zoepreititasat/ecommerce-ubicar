export default function NotificationsCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <h2 className="text-xl font-bold mb-5">Notificaciones</h2>

      <div className="space-y-4">
        <Option title="Alertas de reservas" desc="Recibir cambios de estado." checked />
        <Option title="Promociones" desc="Recibir ofertas cercanas." />
      </div>
    </div>
  )
}

function Option({ title, desc, checked }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>

      <input type="checkbox" defaultChecked={checked} />
    </div>
  )
}