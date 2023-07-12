export interface User {
  id: number
  username: string
  password: string
}

// Interfez creadas con ayuda de GPT
// para evitar hacerlo manualmente
export interface SimplePokemonResponse {
  count: number
  next: null
  previous: null
  results: NamedAPIResource[]
}

export interface PokemonResponse {
  id: number
  name: string
  base_experience: number
  // height: number
  // is_default: boolean
  // order: number
  // weight: number
  abilities: PokemonAbility[]
  // forms: NamedAPIResource[]
  // game_indices: VersionGameIndex[]
  // held_items: PokemonHeldItem[]
  // location_area_encounters: string
  // moves: PokemonMove[]
  // past_types: PokemonTypePast[]
  sprites: PokemonSprites
  // species: NamedAPIResource[]
  stats: PokemonStat[]
  types: PokemonType[]
}

export interface PokemonAbility {
  is_hidden: boolean
  slot: number
  ability: NamedAPIResource
}

export interface NamedAPIResource {
  name: string
  url: string
}

// export interface VersionGameIndex {
//   game_index: number
//   version: NamedAPIResource
// }

// export interface PokemonHeldItem {
//   item: NamedAPIResource
//   version_details: PokemonHeldItemVersion[]
// }

// export interface PokemonHeldItemVersion {
//   rarity: number
//   version: NamedAPIResource
// }

// export interface PokemonMove {
//   move: NamedAPIResource
//   version_group_details: PokemonMoveVersion[]
// }

// export interface PokemonMoveVersion {
//   move_learn_method: NamedAPIResource
//   version_group: NamedAPIResource
//   level_learned_at: number
// }

// export interface PokemonTypePast {
//   types: PokemonType[]
//   generation: NamedAPIResource
// }

export interface PokemonType {
  slot: number
  type: NamedAPIResource
}

export interface PokemonSprites {
  other: {
    'official-artwork': {
      front_default: string
    }
  }
}

// export interface PokemonStat {
//   stat: NamedAPIResource
//   effort: number
//   base_stat: number
// }

// Tipos creados a mano

export interface PokemonEvolutionResponse {
  id: number
  chain: PokemonEvolution
}

export interface PokemonEvolution {
  species: NamedAPIResource
  evolves_to: PokemonEvolution[]
}

export interface PokemonSpecie {
  id: number
  name: string
  evolves_from_species: NamedAPIResource
  evolution_chain: {
    url: string
  }
}
