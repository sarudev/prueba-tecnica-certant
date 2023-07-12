import { useEffect, useRef } from 'react'
import { generateBackgroundColor } from '../utils/colors'
import { firstUpper } from '../utils/text'
import { type PokemonResponse } from '../types/types'
import '../styles/pokemonItem.scss'

export default function PokemonItem ({ pokemon }: { pokemon: PokemonResponse }) {
  const typesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typesRef.current == null) return

    const pokeTypes = pokemon.types.map(t => t.type.name)

    typesRef.current.style.background = generateBackgroundColor(pokeTypes)
  }, [])

  return (
    <li className="pokeitem">
      <div className="type">
        <div className="color" ref={typesRef} />
      </div>
      <div className="name">{firstUpper(pokemon.name)}</div>
      <div className="lvl">{pokemon.base_experience}</div>
    </li>
  )
}
