import { useEffect, useRef, useState } from 'react'
import type { PokemonResponse, SimplePokemonResponse } from '../types/types'

export default function usePokemones (get: number) {
  const [pokemones, setPokemones] = useState<PokemonResponse[]>([])
  const offset = useRef(0)

  useEffect(() => {
    // condición para prevenir nuevas request
    // cuando se re-renderiza un componente
    // mediante el guardado de un archivo
    if (offset.current !== 0) return

    const abortController = new AbortController()

    void fetchMore(abortController)

    return () => {
      abortController.abort()
    }
  }, [])

  const fetchMore = async (abortController?: AbortController) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${get}&offset=${offset.current}`, { signal: abortController?.signal })
    offset.current += get
    const data = await response.json() as SimplePokemonResponse

    const pokes = [] as PokemonResponse[]

    for (const url of data.results) {
      const response = await fetch(url.url)
      const data = await response.json() as PokemonResponse
      // pokes.push(data)
      // console.log(data)
      setPokemones(prevPokemones => [...prevPokemones, data])
    }
  }

  return { pokemones, fetchMore }
}
