import usePokemones from '../hooks/usePokemones'
import PokemonItem from './PokemonItem'
import '../styles/pokemones.scss'
import { useEffect, useRef, useState } from 'react'

export default function Pokemones () {
  const { pokemones, fetchMore } = usePokemones(10)

  const getMore = () => {
    void fetchMore()
  }

  return (
    <ul className='pokemones' >
      {pokemones.map((pokemon) => <PokemonItem key={pokemon.id} pokemon={pokemon} />)}
    </ul>
  )
}
