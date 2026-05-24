export default function SecurityCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <h2 className="text-xl font-bold mb-5">Seguridad</h2>

      <button className="w-full text-left border border-gray-200 rounded-xl p-4 hover:bg-gray-50">
        <p className="font-semibold">Cambiar contraseña</p>
        <p className="text-sm text-gray-500 mt-1">
          Actualizá tu contraseña para mantener tu cuenta segura.
        </p>
      </button>
    </div>
  )
}