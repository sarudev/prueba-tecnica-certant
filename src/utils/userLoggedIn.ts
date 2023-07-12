import { type User } from '../types/types'

export default function userLoggedIn () {
  const storagedUser = window.localStorage.getItem('user')

  if (storagedUser != null) {
    const user = JSON.parse(storagedUser) as User

    if (user.id != null && typeof user.id === 'number')
      return true
  }

  return false
}
