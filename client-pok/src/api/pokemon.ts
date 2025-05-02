import axios from "axios";
import { PokemonResponse } from "../types/pokemon";


//Conexion con el backend
const API_BASE_URL = "http://localhost:8000/api";

export const getPokemonDetail = async (name: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) throw new Error("Error al obtener el detalle del Pokémon");
  return response.json();
};

//parametros para busqueda y paginado
export const getPokemons = async (
  page: number,
  search: string = ""
  
): Promise<PokemonResponse> => {
  //obtener pokemons
  const response = await axios.get(`${API_BASE_URL}/pokemons/`, {
    params: {
      page,
      page_size: 10,
      search, 
    },
  });

  return response.data;
};