import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPokemonDetail } from "../api/pokemon";
import { PokemonDetail as Detail } from "../types/pokemon";

// Componente para la visualizacion de estadisticas
const StatsList = ({ stats }: { stats: any[] }) => (
  <ul className="list-disc list-inside ml-4 space-y-2">
    {stats.map((s, i) => (
      <li key={i} className="text-sm text-gray-700">
        <span className="font-semibold capitalize">{s.stat.name}: </span>
        {s.base_stat}
      </li>
    ))}
  </ul>
);

// Componente para la visualizacion de habilidades
const AbilitiesList = ({ abilities }: { abilities: any[] }) => (
  <p className="text-sm text-gray-700">
    <strong>Habilidades:</strong> {abilities.map(a => a.ability.name).join(", ")}
  </p>
);

const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPokemonDetail(name || "");
        setPokemon(data);
      } catch (err) {
        setError("Error cargando detalle. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [name]);

  if (loading) return <div className="flex justify-center mt-10">Cargando...</div>;
  if (error) return <div className="flex justify-center mt-10 text-red-500">{error}</div>;
  if (!pokemon) return <div className="flex justify-center mt-10">Pokémon no encontrado.</div>;

  // Colores de los tipos pokemon
  const typeColors: { [key: string]: string } = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10 border border-gray-200">
        <div className="flex items-center space-x-6">
          {/* Imagen del Pokemon */}
          <div className="flex-none w-48 h-48">
            <img
              src={pokemon.sprites.front_default}
              alt={`Imagen de ${pokemon.name}`}
              className="w-full h-full rounded-full shadow-lg"
            />
          </div>

          {/* Detalles  */}
          <div className="flex-grow space-y-4">
            <h1 className="text-4xl font-bold capitalize text-gray-800 mb-2">{pokemon.name}</h1>

            {/* Tipos */}
            <div className="flex space-x-2 mb-4">
              {pokemon.types.map((t, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-full text-white ${typeColors[t.type.name] || 'bg-gray-500'}`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            {/* card de info*/}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                  <p className="font-semibold text-gray-700">ID:</p>
                  <p className="text-lg text-gray-800">{pokemon.id}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                  <p className="font-semibold text-gray-700">Altura:</p>
                  <p className="text-lg text-gray-800">{pokemon.height}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                  <p className="font-semibold text-gray-700">Peso:</p>
                  <p className="text-lg text-gray-800">{pokemon.weight}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                  <p className="font-semibold text-gray-700">Experiencia Base:</p>
                  <p className="text-lg text-gray-800">{pokemon.base_experience}</p>
                </div>
              </div>

             
              <AbilitiesList abilities={pokemon.abilities} />

              
              <div>
                <p><strong>Estadísticas:</strong></p>
                <StatsList stats={pokemon.stats} />
              </div>
            </div>

           
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate(-1)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out shadow-md"
              >
                ← Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;