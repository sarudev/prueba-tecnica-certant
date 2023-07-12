import type { PokemonSpecie, PokemonResponse, PokemonEvolution, PokemonEvolutionResponse } from '../types/types'

const { VITE_POKEAPI_URL } = import.meta.env as Record<string, string>

export async function getPokemon (id: number) {
  const res = await fetch(`${VITE_POKEAPI_URL}/pokemon/${id}`)
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
