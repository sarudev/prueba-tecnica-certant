import { type LoaderFunctionArgs, redirect } from 'react-router-dom'
import { type PokemonLoaderData } from '../../types/componentProps'
import { getPokemon, nextEvolution } from '../../utils/pokemon'
import { userLoggedIn } from '../../utils/user'

export async function loader ({ params }: LoaderFunctionArgs) {
  const isLoggedIn = userLoggedIn()
  const pokeId = params.id
  const notFound = { pokemon: null, evolutions: [] }

  if (isLoggedIn) {
    const id = Number(pokeId!)
    if (isNaN(id)) return notFound

    const pokemon = await getPokemon(id)
    if (pokemon == null) return notFound

    let evolutions
    try {
      evolutions = await nextEvolution(id)
    } catch (e) {
      console.error(e)
      return notFound
    }

    return { pokemon, evolutions } as PokemonLoaderData
  } else
    return redirect('/login')
}
