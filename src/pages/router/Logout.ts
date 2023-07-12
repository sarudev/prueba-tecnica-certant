import { redirect } from 'react-router-dom'
import { logout } from '../../utils/user'

export function loader () {
  logout()

  return redirect('/pokedex')
}
