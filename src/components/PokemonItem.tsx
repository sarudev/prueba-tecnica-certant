import { firstUpper } from '../utils/text'
import { type PokemonResponse } from '../types/types'
import '../styles/pokemonItem.scss'
import { useMemo } from 'react'
import useHoverTypeText from './useHoverTypeText'
import { generateBackgroundColor } from '../utils/colors'

export default function PokemonItem ({ pokemon }: { pokemon: PokemonResponse }) {
  const types = useMemo(() => pokemon.types.map(t => t.type.name), [])

  const textTypesRef = useHoverTypeText(types)

  return (
    <li className="pokeitem">
      <div className="type" ref={textTypesRef}>
        <div className="type-name">
          {types.map(t => <span key={t} className='text' style={{ background: `var(--${t})` }}>{firstUpper(t)}</span>)}
        </div>
        <div className="color" style={{ background: generateBackgroundColor(types) }} />
      </div>
      <div className="name">{firstUpper(pokemon.name)}</div>
      <div className="lvl">{pokemon.base_experience}</div>
    </li>
  )
}
