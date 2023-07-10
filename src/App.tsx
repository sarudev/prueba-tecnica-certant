import './App.scss'
import './styles/login.scss'
import useUserLoggedin from './hooks/useUserLoggedin'
import Login from './components/Login'

function App () {
  const loggedIn = useUserLoggedin()

  if (!loggedIn) return <Login />

  return (
    <div className="App">
    </div>
  )
}

export default App
