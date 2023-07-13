import { type PokemonTypes, type PokemonResponse } from '../types/types'
import '../styles/pokemonItemEdit.scss'
import { useState } from 'react'
import { generateBackgroundColor } from '../utils/colors'
import TypeCheckbox from './TypeCheckbox'
import { availibleTypes } from '../utils/pokemon'
import Input from './Input'

export default function PokemonItemEdit ({ pokemon, sprite }: { pokemon: PokemonResponse | null, sprite: string }) {
  const [lvl, setLvl] = useState(pokemon?.base_experience ?? 0)
  const [types, setTypes] = useState<PokemonTypes[]>([...(pokemon?.types.map(t => t.type.name) ?? [])])
  const [typesListVisible, toggle] = useState(false)

  return (
    <div className="pokeitem edit">
      <div className="type">
        <div onClick={() => toggle(p => !p)} className="color" style={{ background: generateBackgroundColor(types) }} />
        <div className='types-list' style={{ opacity: typesListVisible ? 1 : 0, pointerEvents: typesListVisible ? 'auto' : 'none' }}>
          {availibleTypes.map(t => <TypeCheckbox key={t} type={t} types={types} setTypes={setTypes} />)}
        </div>
      </div>
      <Input name='pokemon-name' className="name" placeholder='Pokemon name' value={pokemon?.name ?? ''} required />
      {sprite != null && <img className='sprite' src={sprite} alt={`Artwork of ${pokemon?.name ?? ''}`} />}
      <input name='pokemon-lvl' className="lvl" value={lvl} onChange={e => setLvl(Math.max(1, Math.min(999, Number(e.target.value))))} type='number' placeholder='lvl' max={999} min={0} />
    </div>
  )
}
