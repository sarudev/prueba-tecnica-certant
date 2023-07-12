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
import PokedexBottomPanel from './components/PokedexBottomPanel'
import Status from './pages/Status'
import { type BottomPanelData } from './types/componentProps'

const pokemonListBottomPanelData: BottomPanelData[] = [
  { type: 'anchor', text: 'Logout', goto: () => '/logout' },
  { type: 'anchor', text: 'New', goto: () => '/pokemon/new' }
]

const pokemonBottomPanelData: BottomPanelData[] = [
  { type: 'anchor', text: 'Back to Pokedex', goto: () => '/pokedex' },
  { type: 'anchor', text: 'Edit', goto: ({ id }) => `/pokemon/${id!}/edit` }
]

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
    element: <Pokedex title='List' element={<PokemonList />} bottomPanel={ <PokedexBottomPanel data={pokemonListBottomPanelData}/> } />,
    loader: pokemonListLoader
  },
  {
    path: '/pokedex/:id',
    element: <Pokedex title='Pokemon' element={<Pokemon />} bottomPanel={<PokedexBottomPanel data={pokemonBottomPanelData} />} />,
    loader: pokemonLoader
  },
  {
    path: '*',
    element: <Status code={404} goto='/pokedex' gotoMessage='Return to the Pokedex' statusMessage='Not Found' />
  }
])

export default router
