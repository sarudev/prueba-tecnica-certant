import useUserLoggedin from './hooks/useUserLoggedin'
import Login from './components/Login'
import Pokemones from './components/Pokemones'
import Pokedex from './components/Pokedex'
import PokemonesBottomPanel from './components/PokemonesBottomPanel'

function App () {
  const loggedIn = useUserLoggedin()

  return (
    <Pokedex bottomPanel={loggedIn ? <PokemonesBottomPanel /> : undefined}>
      {loggedIn ? <Pokemones /> : <Login />}
    </Pokedex>
  )
}

export default App
