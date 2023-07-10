import useError from '../hooks/useError'
import getUser from '../utils/getUser'

export default function Login () {
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
        <input type="text" placeholder='username' name='username' required/>
        <input type="password" placeholder='password' name='password' required/>
        {error !== '' && <div className='error'>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
