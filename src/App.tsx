import { useEffect, useLayoutEffect, useState } from 'react'
import userList from './assets/users'
import './App.scss'
import './styles/login.scss'
import { type User } from './types/types'

function App () {
  const loggedIn = userLogin()

  if (!loggedIn) return <Login />

  return (
    <div className="App">
    </div>
  )
}

function Login () {
  const { error, setError } = useError()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    const form = e.target as HTMLFormElement
    const username = form.username.value
    const password = form.password.value

    const user = getUser(username, password)

    // en caso de que no exista el usuario
    if (user == null) {
      // prevengo el refrezco de la página
      e.preventDefault()
      // para poder mostrar un error
      return setError('Invalid username or password')
    }

    window.localStorage.setItem('user', JSON.stringify(user))
  }

  return (
    <div className='container'>
      <h1>Pokedex - Lite</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='username' name='username'/>
        <input type="password" placeholder='password' name='password'/>
        {error !== '' && <div className='error'>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

function userLogin () {
  const [loggedIn, setLoggedIn] = useState(false)

  useLayoutEffect(() => {
    const storagedUser = window.localStorage.getItem('user')

    if (storagedUser != null) {
      const user = JSON.parse(storagedUser) as User

      if (user.id != null && typeof user.id === 'number')
        setLoggedIn(true)
    }
  }, [])

  return loggedIn
}

function useError () {
  const [error, setError] = useState('')

  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }, [error])

  return { error, setError }
}

function getUser (username: string, password: string) {
  // Debido a que no es necesario mantener segura la contraseña
  // la comparación la hago directamente con ===
  const user = userList.find(user => user.username === username && user.password === password)
  return user != null ? { username: user.username, id: user.id } : null
}

export default App
