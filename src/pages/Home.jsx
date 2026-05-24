import SearchBar from "../components/SearchBar.jsx"

export default function Home() {
  function handleSearch(filters) {
    console.log("Filtros de búsqueda:", filters)
  }

  return (
    <main>
      <SearchBar onSearch={handleSearch} />
    </main>
  )
}