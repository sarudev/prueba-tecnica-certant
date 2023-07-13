import { createBrowserRouter } from 'react-router-dom'
import PokemonList from './pages/PokemonList'
import Login from './pages/Login'
import Pokedex from './pages/Pokedex'
import Index from './pages/Index'
import { loader as loginLoader, action as loginAction } from './pages/router/Login'
import { loader as pokemonListLoader } from './pages/router/PokemonList'
import { loader as pokemonLoader } from './pages/router/Pokemon'
import { loader as logoutLoader } from './pages/router/Logout'
import { action as pokemonEditAction } from './pages/router/PokemonEdit'
import { action as pokemonNewAction } from './pages/router/PokemonNew'
import Pokemon from './pages/Pokemon'
import Status from './pages/Status'
import EditPokemon from './pages/EditPokemon'
import NewPokemon from './pages/NewPokemon'

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
    action: pokemonEditAction
  },
  {
    path: '/pokedex/new',
    element: <Pokedex title='Edit Pokemon' element={<NewPokemon />} />,
    action: pokemonNewAction
  },
  {
    path: '*',
    element: <Status code={404} goto='/pokedex' gotoMessage='Return to the Pokedex' statusMessage='Not Found' />
  }
])

export default router
