import { Pokemon } from "../types/pokemon";
import { Link } from "react-router-dom";

// interface Props {
//   pokemon: Pokemon;
// }
//componente pokemon card
const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:scale-105 hover:ring-2 ring-indigo-300 transition-all duration-200">
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        className="w-full h-26 object-contain bg-gray-50"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
        <p className="text-gray-500">Habilidades: {pokemon.abilities_count}</p>

        <Link
          to={`/pokemon/${pokemon.name}`}
          className="text-indigo-600 text-sm mt-2 inline-block hover:underline"
        >
          Ver más..
        </Link>
      </div>
    </div>
  );
};



export default PokemonCard;