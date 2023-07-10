import { useLayoutEffect, useState } from 'react'
import { type User } from '../types/types'

export default function useUserLoggedin () {
  const [loggedIn, setLoggedIn] = useState(false)

  useLayoutEffect(() => {
    const storagedUser = window.localStorage.getItem('user')

    if (storagedUser != null) {
      const user = JSON.parse(storagedUser) as User

      if (user.id != null && typeof user.id === 'number')
        setLoggedIn(true)
    }
  }, [])

  return loggedIn
}
