import { redirect } from 'react-router-dom'
import { userLoggedIn } from '../../utils/user'
import { getSavedPokemon } from '../../utils/pokemon'

export async function loader () {
  const isLoggedIn = userLoggedIn()

  const pokemones = getSavedPokemon().map(poke => poke.pokemon)

  return isLoggedIn ? pokemones : redirect('/login')
}
