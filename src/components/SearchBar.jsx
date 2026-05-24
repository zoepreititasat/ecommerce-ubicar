import { useState } from "react";



const SearchBar = ({ onSearch }) => {    //Recibe una funcion del componente padre llamada onSearch. 

  const [location, setLocation] = useState("");  // location -> guarda la ubicación escrita
  const [date, setDate] = useState("");   // date -> guarda la fecha seleccionada
  const [vehicleType, setVehicleType] = useState("");   // vehicleType -> guarda el tipo de vehículo seleccionado (auto, moto, camioneta)

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch({   //Le manda al componente padre los datos de búsqueda.
      location,
      date,
      vehicleType,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-4xl items-center rounded-full bg-white p-2 shadow-xl"
    >
      <div className="flex-1 border-r px-6">
        <label className="block text-xs font-bold uppercase text-gray-500">
          Ubicación
        </label>
        <input
          type="text"
          placeholder="¿Dónde querés estacionar?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}   //Cada vez que escribís algo, React actualiza el estado.
          className="w-full border-none bg-transparent text-sm outline-none"
        />
      </div>

      <div className="flex-1 border-r px-6">
        <label className="block text-xs font-bold uppercase text-gray-500">
          Fecha
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border-none bg-transparent text-sm outline-none"
        />
      </div>

      <div className="flex-1 px-6">
        <label className="block text-xs font-bold uppercase text-gray-500">
          Vehículo
        </label>
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="w-full border-none bg-transparent text-sm outline-none"
        >
          <option value="">Todos</option>
          <option value="AUTO">Auto</option>
          <option value="MOTO">Moto</option>
          <option value="CAMIONETA">Camioneta</option>
        </select>
      </div>

      <button
        type="submit"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-800"
      >
        🔍
      </button>
    </form>
  );
};

export default SearchBar;