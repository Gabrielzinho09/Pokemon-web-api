//propiedades del objeto
export interface Pokemon {
  name: string;
  sprite: string;
  abilities_count: number;
  detail_url: string;
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    [key: string]: any;
  };
  abilities: {
    ability: { name: string };
  }[];
  types: {
    type: { name: string };
  }[];
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
}