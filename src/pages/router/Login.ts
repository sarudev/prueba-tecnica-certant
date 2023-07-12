import { redirect, type ActionFunctionArgs } from 'react-router-dom'
import { getUser, login, userLoggedIn } from '../../utils/user'

export async function action ({ request }: ActionFunctionArgs) {
  const formFata = await request.formData()

  const username = formFata.get('username')?.toString()
  const password = formFata.get('password')?.toString()

  if (username == null || password == null)
    return 'Invalid username or password'

  const user = getUser(username, password)

  if (user == null)
    return 'Invalid username or password'

  login({ ...user, password })

  return redirect('/pokedex')
}

export async function loader () {
  const isLoggedIn = userLoggedIn()

  return isLoggedIn ? redirect('/pokedex') : null
}
