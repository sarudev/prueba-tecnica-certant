import { redirect } from 'react-router-dom'
import { userLoggedIn } from '../../utils/user'

export async function loader () {
  const isLoggedIn = userLoggedIn()

  return isLoggedIn ? null : redirect('/login')
}
