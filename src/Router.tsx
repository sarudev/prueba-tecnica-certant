import { createBrowserRouter } from 'react-router-dom'
import PokemonList from './pages/PokemonList'
import Login from './pages/Login'
import Pokedex from './pages/Pokedex'
import Index from './pages/Index'
import { loader as loginLoader, action as loginAction } from './pages/router/Login'
import { loader as pokemonListLoader } from './pages/router/PokemonList'
import { loader as pokemonLoader } from './pages/router/Pokemon'
import { loader as logoutLoader } from './pages/router/Logout'
import Pokemon from './pages/Pokemon'
import Status from './pages/Status'
import EditPokemon from './pages/EditPokemon'
import { availibleTypes, savePokemon } from './utils/pokemon'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />
  },
  {
    path: '/login',
    element: <Pokedex title='Login' element={<Login />} />,
    loader: loginLoader,
    action: loginAction
  },
  {
    path: '/logout',
    loader: logoutLoader
  },
  {
    path: '/pokedex',
    element: <Pokedex title='List' element={<PokemonList />} />,
    loader: pokemonListLoader
  },
  {
    path: '/pokedex/:id',
    element: <Pokedex title='Pokemon' element={<Pokemon />} />,
    loader: pokemonLoader
  },
  {
    path: '/pokedex/:id/edit',
    element: <Pokedex title='Edit Pokemon' element={<EditPokemon />} />,
    loader: pokemonLoader,
    action: async ({ request }) => {
      const form = await request.formData()
      const pokeName = form.get('pokemon-name') as string
      const pokeLvl = form.get('pokemon-lvl') as string
      const pokeImg = form.get('pokemon-image') as string
      const pokeAbi = form.getAll('ability') as string[]
      const pokeEvo = form.get('pokemon-evolution') as string

      const pokeTypes: string[] = []
      for (const type of availibleTypes) {
        const data = form.get(`type-${type}`)
        if (data != null) {
          pokeTypes.push(type)
        }
      }

      const pokemon = { pokeName, pokeLvl, pokeImg, pokeTypes, pokeAbi, pokeEvo }
      console.log(pokemon)
      savePokemon(pokemon)
      return null
    }
  },
  {
    path: '*',
    element: <Status code={404} goto='/pokedex' gotoMessage='Return to the Pokedex' statusMessage='Not Found' />
  }
])

export default router
