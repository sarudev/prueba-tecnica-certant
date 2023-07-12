import { type PokemonItemWithoutTypeTextProps } from '../types/componentProps'
import { generateBackgroundColor } from '../utils/colors'
import { firstUpper } from '../utils/text'

export function PokemonItemWithoutTypeText ({ children, textTypesRef, types, name, baseExperience }: PokemonItemWithoutTypeTextProps) {
  return (
    <li className="pokeitem">
      <div className="type" ref={textTypesRef}>
        {children}
        <div className="color" style={{ background: generateBackgroundColor(types) }} />
      </div>
      <div className="name">{firstUpper(name)}</div>
      <div className="lvl">{baseExperience}</div>
    </li>
  )
}
