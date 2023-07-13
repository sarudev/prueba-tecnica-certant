import { useEffect, useRef, useState } from 'react'
import type { PokemonResponse, SimplePokemonResponse } from '../types/types'
const { VITE_POKEAPI_URL } = import.meta.env as Record<string, string>

export default function usePokemones (get: number, startingPokemones: PokemonResponse[]) {
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
      // abortar operación en caso de
      // que el componente se
      // des-renderice
      abortController.abort()
    }
  }, [])

  const fetchMore = async (abortController?: AbortController) => {
    const response = await fetch(`${VITE_POKEAPI_URL}/pokemon?limit=${get}&offset=${offset.current}`, { signal: abortController?.signal })
    offset.current += get
    const data = await response.json() as SimplePokemonResponse
    setPokemones(prevPokemones => [...prevPokemones, ...startingPokemones])

    for (const url of data.results) {
      const response = await fetch(url.url)
      const data = await response.json() as PokemonResponse
      // pokemones insertados de 1 en 1 al array
      // para que la animación sea fluida pero
      //  de manera totalmente orgánica
      setPokemones(prev => prev.some(p => p.id === data.id) ? prev : [...prev, data])
    }
  }

  return { pokemones, fetchMore }
}
