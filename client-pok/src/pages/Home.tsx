import { useEffect, useState } from "react";
import { getPokemons } from "../api/pokemon";
import { Pokemon, PokemonResponse } from "../types/pokemon";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/pagination";

const Home = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  //precarga pokemons
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  //useState paginado
  const [totalPages, setTotalPages] = useState(0);
  //useState busqueda esperando string
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data: PokemonResponse = await getPokemons(page, search);
        setPokemons(data.results);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (error) {
        console.error("Error fetching pokemons", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search]);

  //
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-6 mb-4">
        <h1 className="text-3xl font-bold text-center text-indigo-600">Pokedex App</h1>
        <p className="text-center text-gray-500">El sitio de los Pokémon </p>

        {/* caja de texto búsqueda */}
        <div className="mt-4 text-center">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar Pokémon..."
            className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"

          />
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <p className="text-center mt-10">Cargando...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">

              {pokemons.map((poke, index) => (
                <PokemonCard key={poke.name || index} pokemon={poke} />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </>
        )}
      </main>
      <footer className="text-center py-6 text-gray-400">
        Kevin Guamán @2025
      </footer>
    </div>
  );
};
export default Home;