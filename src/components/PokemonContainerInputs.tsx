import { type PokemonContainerInputsProps } from '../types/componentProps'
import PokemonItemEdit from './PokemonItemEdit'
import PokemonItemSearch from './PokemonItemSearch'

export default function PokemonContainerInputs ({ pokemon, createOrEdit }: PokemonContainerInputsProps) {
  return (
    <div className="pokemon-container">
      <div className="poke-container">
        <span className="text">
          <h1>Information</h1>
        </span>
        <PokemonItemEdit pokemon={pokemon} sprite={createOrEdit.imageLink} />
      </div>

      <div className="sprites-container">
        <span className="text">
          <h1>Image</h1>
        </span>
        <div className="sprites">
          <img src={createOrEdit.imageLink} alt='Front sprite' className="front" />
          <input name='pokemon-image' type="text" value={createOrEdit.imageLink} onChange={e => createOrEdit.setImageLink(e.target.value)} placeholder='image link' required />
        </div>
      </div>

      <div className="abilities-container">
        <span className="text">
          <h1>Abilities</h1>
        </span>
        <div className="abilities">
          {createOrEdit.abilities.map((ability) => (
            <div key={ability.id} className='ability-container'>
              <input name='ability' className="ability-name" placeholder='Ability name' defaultValue={ability.name} required />
              <button onClick={() => createOrEdit.deleteAbilityField(ability.id)}>X</button>
            </div>
          ))}
          <button onClick={createOrEdit.newAbilityField}>Add ability field</button>
        </div>
      </div>

      <div className="evolutions-container">
        <span className="text">
          <h1>Evolutions</h1>
        </span>
        <div className="evolutions">
          <PokemonItemSearch selectPokemon={createOrEdit.selectPokemon} allPokemones={createOrEdit.allPokemones} pokemon={createOrEdit.evolution} />
        </div>
      </div>
    </div>
  )
}
