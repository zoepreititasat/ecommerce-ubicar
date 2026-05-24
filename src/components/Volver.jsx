import { useNavigate } from "react-router-dom"
import { IoArrowBack } from "react-icons/io5"

export default function Volver() {

  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-black-500 hover:text-blue-700 transition"
    >
      <IoArrowBack className="text-2xl" />

      <span className="font-medium">
        Volver
      </span>
    </button>
  )
}