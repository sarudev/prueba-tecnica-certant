import { redirect, type ActionFunctionArgs } from 'react-router-dom'
import getUser from '../../utils/getUser'
import userLoggedIn from '../../utils/userLoggedIn'

export async function action ({ request }: ActionFunctionArgs) {
  const formFata = await request.formData()

  const username = formFata.get('username')?.toString()
  const password = formFata.get('password')?.toString()

  if (username == null || password == null)
    return 'Invalid username or password'

  const user = getUser(username, password)

  if (user == null)
    return 'Invalid username or password'

  // setteando manualmente el usuario en el localStorage
  // para que se pueda volver a iniciar sesión
  // si la petición se hiciese a un backend, la cookie
  // de autenticación se settearía automáticamente y esto
  // no sería necesario
  window.localStorage.setItem('user', JSON.stringify(user))

  return redirect('/pokedex')
}

export async function loader () {
  const isLoggedIn = userLoggedIn()

  return isLoggedIn ? redirect('/pokedex') : null
}
