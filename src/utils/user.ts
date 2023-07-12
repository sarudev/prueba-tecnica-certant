import userList from '../assets/users'
import { type User } from '../types/types'

// Esta es una forma de implementar lo que realmente
// debería ser una request al backend para iniciar sesión
export function getUser (username: string, password: string) {
  // Debido a que no es necesario mantener segura la contraseña
  // la comparación la hago directamente con ===
  const user = userList.find(user => user.username === username && user.password === password)
  return user != null ? { username: user.username, id: user.id } : null
}

export function userLoggedIn () {
  const storagedUser = window.localStorage.getItem('user')

  if (storagedUser != null) {
    const user = JSON.parse(storagedUser) as User

    if (user.id != null && typeof user.id === 'number')
      return true
  }

  return false
}

export function login (user: User) {
  // setteando manualmente el usuario en el localStorage
  // para que se pueda volver a iniciar sesión
  // si la petición se hiciese a un backend, la cookie
  // de autenticación se settearía automáticamente y esto
  // no sería necesario
  window.localStorage.setItem('user', JSON.stringify(user))
}

export function logout () {
  window.localStorage.removeItem('user')
}
