import { createBrowserRouter, redirect } from 'react-router-dom'
import PokemonList from './pages/PokemonList'
import Login from './pages/Login'
import Pokedex from './pages/Pokedex'
import PokemonesBottomPanel from './components/PokemonesBottomPanel'
import Index from './pages/Index'
import { loader as loginLoader, action as loginAction } from './pages/router/Login'
import { loader as pokemonListLoader } from './pages/router/PokemonList'
import { loader as pokemonLoader } from './pages/router/Pokemon'
import Pokemon from './pages/Pokemon'

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
    // element: <Logout />
    loader: () => {
      return redirect('/pokedex')
    }
  },
  {
    path: '/pokedex',
    element: <Pokedex title='List' element={<PokemonList />} bottomPanel={<PokemonesBottomPanel />} />,
    loader: pokemonListLoader
  },
  {
    path: '/pokedex/:id',
    element: <Pokedex title='Pokemon' element={<Pokemon />} />,
    loader: pokemonLoader
  }
])

export default router
