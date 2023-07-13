import { type LoaderFunctionArgs, redirect } from 'react-router-dom'
import { type PokemonLoaderData } from '../../types/componentProps'
import { getPokemon, getPokemonByName, getSavedPokemon, nextEvolution } from '../../utils/pokemon'
import { userLoggedIn } from '../../utils/user'
import { type PokemonResponse } from '../../types/types'

export async function loader ({ params }: LoaderFunctionArgs) {
  const isLoggedIn = userLoggedIn()
  const pokeId = params.id
  const notFound = { pokemon: null, evolutions: [] }

  if (isLoggedIn) {
    const id = Number(pokeId!)
    if (isNaN(id)) return notFound

    const pokemones = getSavedPokemon()

    const poke = pokemones.find(p => p.pokemon.id === id)
    const pokemon = poke?.pokemon ?? await getPokemon(id)

    if (pokemon == null) return notFound

    let evolutions: PokemonResponse[] | null = []
    try {
      if (poke != null) {
        if (poke.evolution !== '') {
          const local = getSavedPokemon().find(p => p.pokemon.name === poke.evolution)?.pokemon ?? await getPokemonByName(poke.evolution)
          evolutions = local != null ? [local] : []
        }
      } else if (id > -1)
        evolutions = await nextEvolution(id)
    } catch (e) {
      console.error(e)
      return notFound
    }
    console.log({ pokemon, evolutions, evoName: poke?.evolution })
    return { pokemon, evolutions } as PokemonLoaderData
  } else
    return redirect('/login')
}
