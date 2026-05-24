export default function CartTimer({ minutes, seconds }) {
  return (
    <div className="mb-8 bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-center justify-between">
      <div>
        <p className="text-blue-900 font-semibold text-lg">
          Las fechas quedan reservadas por
        </p>

        <p className="text-sm text-blue-700 mt-1">
          Finalizá tu reserva antes de que expire el tiempo.
        </p>
      </div>

      <div className="text-4xl font-bold text-blue-700">
        {minutes}:{seconds.toString().padStart(2, "0")}
      </div>
    </div>
  )
}