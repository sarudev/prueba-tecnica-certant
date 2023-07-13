import { redirect } from 'react-router-dom'
import { userLoggedIn } from '../../utils/user'
import { getSavedPokemon } from '../../utils/pokemon'
import { type PokemonTypes } from '../../types/types'

export async function loader () {
  const isLoggedIn = userLoggedIn()

  const pokemones = getSavedPokemon().map(poke => ({
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
  }))

  return isLoggedIn ? pokemones : redirect('/login')
}
