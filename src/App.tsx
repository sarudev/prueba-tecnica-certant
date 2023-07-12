import useUserLoggedin from './hooks/useUserLoggedin'
import Login from './components/Login'
import Pokemones from './components/Pokemones'
import Pokedex from './components/Pokedex'

function App () {
  const loggedIn = useUserLoggedin()

  return (
    <Pokedex>
      {loggedIn ? <Pokemones /> : <Login />}
    </Pokedex>
  )
}

export default App
