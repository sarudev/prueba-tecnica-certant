import { type PokemonTypes, type PokemonResponse, type Nullable } from '../types/types'
import { memo, useState } from 'react'
import { generateBackgroundColor } from '../utils/colors'
import TypeCheckbox from './TypeCheckbox'
import { availibleTypes } from '../utils/pokemon'
import '../styles/pokemonItemEdit.scss'

function PokemonItemEdit ({ pokemon, sprite }: { pokemon: PokemonResponse | Nullable, sprite: string }) {
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
      <input name='pokemon-name' className="name" placeholder='Pokemon name' defaultValue={pokemon?.name ?? ''} required />
      {sprite != null && <img className='sprite' src={sprite} alt={`Artwork of ${pokemon?.name ?? ''}`} />}
      <input name='pokemon-lvl' className="lvl" defaultValue={pokemon?.base_experience ?? 0} type='number' placeholder='lvl' max={999} min={0} />
    </div>
  )
}

export default memo(PokemonItemEdit)
