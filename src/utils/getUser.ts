import userList from '../assets/users'

// Esta es una forma de implementar lo que realmente
// debería ser una request al backend para iniciar sesión
export default function getUser (username: string, password: string) {
  // Debido a que no es necesario mantener segura la contraseña
  // la comparación la hago directamente con ===
  const user = userList.find(user => user.username === username && user.password === password)
  return user != null ? { username: user.username, id: user.id } : null
}
