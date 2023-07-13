import { type LoaderFunctionArgs, redirect } from 'react-router-dom'
import { type PokemonLoaderData } from '../../types/componentProps'
import { getPokemon, getPokemonByName, getSavedPokemon, nextEvolution } from '../../utils/pokemon'
import { userLoggedIn } from '../../utils/user'
import { type PokemonTypes, type PokemonResponse } from '../../types/types'

export async function loader ({ params }: LoaderFunctionArgs) {
  const isLoggedIn = userLoggedIn()
  const pokeId = params.id
  const notFound = { pokemon: null, evolutions: [] }

  if (isLoggedIn) {
    const id = Number(pokeId!)
    if (isNaN(id)) return notFound

    const pokemones = getSavedPokemon()

    let pokemon: PokemonResponse | null
    const poke = pokemones.find(p => p.pokeId === id)
    if (poke != null) {
      pokemon = {
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
    } else {
      pokemon = await getPokemon(id)
    }

    if (pokemon == null) return notFound

    let evolutions: PokemonResponse[] | null = []
    try {
      if (poke != null && poke.pokeEvo !== '') {
        evolutions = [(await getPokemonByName(poke.pokeEvo))!]
      } else if (id > -1) {
        evolutions = await nextEvolution(id)
      }
    } catch (e) {
      console.error(e)
      return notFound
    }

    return { pokemon, evolutions } as PokemonLoaderData
  } else
    return redirect('/login')
}
