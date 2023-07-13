import type { PokemonSpecie, PokemonResponse, PokemonEvolution, PokemonEvolutionResponse, PokemonTypes, SimplePokemonResponse } from '../types/types'

const { VITE_POKEAPI_URL } = import.meta.env as Record<string, string>

export async function getAll () {
  const res = await fetch(`${VITE_POKEAPI_URL}/pokemon?limit=10000`)
  try {
    const data = await res.json() as SimplePokemonResponse
    return data.results.map(p => p.name)
  } catch (e) {
    return null
  }
}

export async function getPokemon (id: number) {
  const res = await fetch(`${VITE_POKEAPI_URL}/pokemon/${id}`)
  try {
    return await res.json() as PokemonResponse
  } catch (e) {
    return null
  }
}

export async function getPokemonByName (name: string) {
  const res = await fetch(`${VITE_POKEAPI_URL}/pokemon/${name}`)
  try {
    return await res.json() as PokemonResponse
  } catch (e) {
    return null
  }
}

export async function getSpecie (id: number) {
  const res = await fetch(`${VITE_POKEAPI_URL}/pokemon-species/${id}`)
  try {
    return await res.json() as PokemonSpecie
  } catch (e) {
    return null
  }
}

export async function getEvoChain (id: number) {
  const specie = await getSpecie(id)

  if (specie == null) return null

  const res = await fetch(specie.evolution_chain.url)
  try {
    const data = await res.json() as PokemonEvolutionResponse
    return data.chain
  } catch (e) {
    return null
  }
}

export async function evolutionToPokemon (evos: PokemonEvolution[]) {
  const evolutions: PokemonResponse[] = []

  for (const evo of evos) {
    const evolutionRes = await fetch(`${VITE_POKEAPI_URL}/pokemon/${evo.species.name}`)
    const evolutionData = await evolutionRes.json() as PokemonResponse

    evolutions.push(evolutionData)
  }

  return evolutions
}

export async function nextEvolution (id: number) {
  const pokemon = await getPokemon(id)
  const evoChain = await getEvoChain(id)

  if (pokemon == null || evoChain == null) throw new Error('Pokemon not found')

  return await getEvolutions(evoChain, pokemon.name)
}

async function getEvolutions (evoChain: PokemonEvolution, pokemonName: string) {
  const evoChainStack = [evoChain]

  while (evoChainStack.length > 0) {
    const evo = evoChainStack.pop()!

    if (evo.species.name === pokemonName) return await evolutionToPokemon(evo.evolves_to)

    evoChainStack.push(...evo.evolves_to)
  }

  return null
}

/*
  EJEMPLO UTILIZANDO RECURSIVIDAD
  DESCARTADO POR EL ALTO TIEMPO DE EJECUCIÓN

  async function getEvolutions (evoChain: PokemonEvolution, pokemonName: string) {
    if (evoChain.species.name === pokemonName) return await evolutionToPokemon(evoChain.evolves_to)

    for (const evo of evoChain.evolves_to) {
      const result = await getEvolutions(evo, pokemonName)
      if (result != null) return result
    }
  }
*/

interface CustomPokemon {
  pokeName: string
  pokeLvl: string
  pokeImg: string
  pokeTypes: string[]
  pokeAbi: string[]
  pokeEvo: string
}

export function savePokemon (pokemon: CustomPokemon) {
  let customPokemonString = window.localStorage.getItem('custom-pokemon')

  if (customPokemonString == null) {
    window.localStorage.setItem('custom-pokemon', JSON.stringify([]))
    customPokemonString = '[]'
  }

  const customPokemon = JSON.parse(customPokemonString) as CustomPokemon[]

  const pokeIdx = customPokemon.findIndex(p => p.pokeName === pokemon.pokeName)

  if (pokeIdx > -1) {
    customPokemon.splice(pokeIdx, 1)
  }
  customPokemon.push(pokemon)

  window.localStorage.setItem('custom-pokemon', JSON.stringify(customPokemon))
}

export const availibleTypes: PokemonTypes[] = [
  'normal', 'fighting', 'flying', 'poison', 'ground',
  'rock', 'bug', 'ghost', 'steel', 'fire', 'water',
  'grass', 'electric', 'psychic', 'ice', 'dragon',
  'dark', 'fairy', 'shadow'
]
