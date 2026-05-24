export default function ProfileInfo({ user }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Información personal</h1>
          <p className="text-gray-500 mt-1">
            Gestioná tus datos de identidad y contacto.
          </p>
        </div>

        <button className="bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-800">
          Editar perfil
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Info label="Nombre completo" value={`${user.firstname} ${user.lastname}`} />
        <Info label="Email" value={user.email} />
        <Info label="Rol" value={user.role} />
        <Info label="Estado" value="Cuenta activa" />
      </div>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div>
      <label className="text-xs font-bold text-gray-500 uppercase">
        {label}
      </label>

      <div className="mt-2 border border-gray-300 rounded-xl px-4 py-3 bg-gray-50">
        {value}
      </div>
    </div>
  )
}