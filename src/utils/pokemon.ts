import type { PokemonSpecie, PokemonResponse, PokemonEvolution, PokemonEvolutionResponse, PokemonTypes, SimplePokemonResponse, CustomPokemon, Nullable } from '../types/types'

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
    const result = await res.json() as PokemonResponse
    return result
  } catch (e) {
    console.error('not found')
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

export function createPokemon (pokemon: Omit<CustomPokemon, 'pokeId'>) {
  const customPokemon = getSavedPokemon()

  let minId = 0
  for (const poke of customPokemon) {
    if (poke.pokemon.id < minId) minId = poke.pokemon.id
  }

  const newPoke: CustomPokemon = {
    ...pokemon,
    pokeId: minId - 1
  }

  customPokemon.push({ pokemon: convert(newPoke), evolution: pokemon.pokeEvo })
  window.localStorage.setItem('custom-pokemon', JSON.stringify(customPokemon))
}

export function editPokemon (pokemon: CustomPokemon) {
  const customPokemon = getSavedPokemon()

  const pokeIdx = customPokemon.findIndex(p => p.pokemon.id === pokemon.pokeId)

  if (pokeIdx > -1) {
    customPokemon.splice(pokeIdx, 1)
  }

  customPokemon.push({ pokemon: convert(pokemon), evolution: pokemon.pokeEvo })
  window.localStorage.setItem('custom-pokemon', JSON.stringify(customPokemon))
}

function convert (poke: CustomPokemon): PokemonResponse {
  return {
    abilities: poke.pokeAbi.map(a => ({ ability: { name: a, url: '' }, is_hidden: false, slot: 0 })),
    base_experience: poke.pokeLvl,
    id: poke.pokeId,
    name: poke.pokeName,
    sprites: {
      other: {
        'official-artwork': {
          front_default: poke.pokeImg
        }
      }
    },
    types: poke.pokeTypes.map(t => ({ slot: 1, type: { name: t as PokemonTypes, url: '' } }))
  }
}

export function getSavedPokemon () {
  let customPokemonString = window.localStorage.getItem('custom-pokemon')

  if (customPokemonString == null) {
    window.localStorage.setItem('custom-pokemon', JSON.stringify([]))
    customPokemonString = '[]'
  }

  return JSON.parse(customPokemonString) as Array<{ pokemon: PokemonResponse, evolution: string }>
}

export async function createCustom (form: FormData): Promise<Omit<CustomPokemon, 'pokeId'> & { pokeId: number | Nullable }> {
  const pokeId = form.get('pokemon-id') as string | Nullable
  const pokeName = form.get('pokemon-name') as string
  const pokeLvl = form.get('pokemon-lvl') as string
  const pokeImg = form.get('pokemon-image') as string
  const pokeAbi = form.getAll('ability') as string[]
  let pokeEvo = form.get('pokemon-evolution') as string

  const evo = await getPokemonByName(pokeEvo)
  console.log({ evo, pokeEvo })
  if (evo == null) {
    pokeEvo = ''
  }

  const pokeTypes: string[] = []
  for (const type of availibleTypes) {
    const data = form.get(`type-${type}`)
    if (data != null) {
      pokeTypes.push(type)
    }
  }

  return { pokeName, pokeLvl: Number(pokeLvl), pokeImg, pokeTypes, pokeAbi, pokeEvo, pokeId: pokeId != null ? Number(pokeId) : null }
}

export const availibleTypes: PokemonTypes[] = [
  'normal', 'fighting', 'flying', 'poison', 'ground',
  'rock', 'bug', 'ghost', 'steel', 'fire', 'water',
  'grass', 'electric', 'psychic', 'ice', 'dragon',
  'dark', 'fairy', 'shadow'
]
