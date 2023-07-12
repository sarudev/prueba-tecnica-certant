import useError from '../hooks/useError'
import login from '../utils/login'
import '../styles/login.scss'

export default function Login () {
  const { error, setError } = useError()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const username = form.username.value
    const password = form.password.value

    const user = login(username, password)

    // en caso de que no exista el usuario
    if (user == null) {
      // muestro un error
      return setError('Invalid username or password')
    }

    // setteando manualmente el usuario en el localStorage
    // para que se pueda volver a iniciar sesión
    // si la petición se hiciese a un backend, la cookie
    // de autenticación se settearía automáticamente y esto
    // no sería necesario
    window.localStorage.setItem('user', JSON.stringify(user))

    // recargo la página, ya que al no haber rutas
    // no hay redireccionamiento
    window.location.reload()
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='username' name='username' required/>
        <input type="password" placeholder='password' name='password' required/>
        {error !== '' && <div className='error'>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
