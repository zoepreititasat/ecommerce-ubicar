const roleOptions = [
  { value: "USER", emoji: "🚗", label: "Usuario", desc: "Quiero reservar" },
  { value: "SELLER", emoji: "🏠", label: "Vendedor", desc: "Tengo una cochera" },
]

export default function RoleSelector({ selectedRole, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-7">
      {roleOptions.map((role) => (
        <button
          key={role.value}
          type="button"
          onClick={() => onSelect(role.value)}
          className={`rounded-2xl border p-4 transition-all ${
            selectedRole === role.value
              ? "border-blue-700 bg-blue-50"
              : "border-gray-200 hover:border-blue-700"
          }`}
        >
          <span className="text-2xl block mb-2">{role.emoji}</span>
          <p className="font-bold text-gray-900">{role.label}</p>
          <p className="text-sm text-gray-500 mt-1">{role.desc}</p>
        </button>
      ))}
    </div>
  )
}