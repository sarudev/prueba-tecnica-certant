import { redirect } from 'react-router-dom'
import userLoggedIn from '../../utils/userLoggedIn'

export async function loader () {
  const isLoggedIn = userLoggedIn()

  return isLoggedIn ? null : redirect('/login')
}
