import { useEffect, useState } from 'react'

export default function usePokemones () {
  const [pokemones, setPokemones] = useState([])

  useEffect(() => {
    const fetching = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon')
      const data = await response.json()
      setPokemones(data.results)
    }
  }, [])
}
