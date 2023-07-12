import usePokemones from '../hooks/usePokemones'
import PokemonItem from './PokemonItem'
import '../styles/pokemones.scss'
import { useEffect, useRef, useState } from 'react'

export default function Pokemones () {
  const { pokemones, fetchMore } = usePokemones(10)
  const [isLoading, setIsLoading] = useState(false)

  const pokeListRef = useRef<HTMLUListElement>(null)

  const getMore = async () => {
    setIsLoading(true)
    await fetchMore()
    setIsLoading(false)
  }

  const handleScroll: React.UIEventHandler<HTMLUListElement> = (e) => {
    if (pokeListRef.current == null) return
    console.log({
      clientHeight: pokeListRef.current.clientHeight,
      scrollHeight: pokeListRef.current.scrollHeight,
      offsetHeight: pokeListRef.current.offsetHeight,
      scrollTop: pokeListRef.current.scrollTop,
      clientTop: pokeListRef.current.clientTop,
      minus: pokeListRef.current.clientHeight + pokeListRef.current.scrollTop
    })
    if (pokeListRef.current.clientHeight + pokeListRef.current.scrollTop !== pokeListRef.current.scrollHeight || isLoading) {
      return
    }
    void getMore()
  }

  return (
    <ul className='pokemones' ref={pokeListRef} onScroll={handleScroll}>
      {pokemones.map((pokemon) => <PokemonItem key={pokemon.id} pokemon={pokemon} />)}
    </ul>
  )
}
