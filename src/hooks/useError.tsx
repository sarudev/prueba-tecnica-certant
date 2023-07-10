import { useEffect, useState } from 'react'

export default function useError () {
  const [error, setError] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError('')
    }, 3000)

    return () => {
      // este clear solo funciona cuando
      // se está modificando un componente,
      // puesto que al re-renderizarlo, el estado
      // se actualiza, lo que ocasiona que
      // este timeout se vuelva loco
      clearTimeout(timeoutId)
    }
  }, [error])

  return { error, setError }
}
