import { Form, useLoaderData, useParams } from 'react-router-dom'
import { type PokemonLoaderData } from '../types/componentProps'
import Status from './Status'
import BottomPanel from '../components/BottomPanel'
import PokemonItemEdit from '../components/PokemonItemEdit'
import PokemonItemSearch from '../components/PokemonItemSearch'
import '../styles/pokemonEdit.scss'
import MemoLink from '../components/MemoLink'
import useCreateOrEditPokemon from '../hooks/useCreateOrEditPokemon'

export default function EditPokemon () {
  const { pokemon, evolutions } = useLoaderData() as PokemonLoaderData
  const params = useParams()

  if (pokemon == null) return <Status code={404} goto='/' gotoMessage='Return to the Pokedex' statusMessage='Not Found' />

  const createOrEdit = useCreateOrEditPokemon({
    initialEvolution: evolutions[0],
    initialAbilities: pokemon.abilities.map((a, i) => ({ id: i, name: a.ability.name })),
    initialSprite: pokemon.sprites.other['official-artwork'].front_default
  })

  return (
    <Form method='POST' className="poke-pokemon-container">
      <input name='pokemon-id' defaultValue={pokemon.id} hidden />
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
            <img src={createOrEdit.imageLink} alt={`Front sprite of ${pokemon.name}`} className="front" />
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
      <BottomPanel>
        <MemoLink to={`/pokedex/${params.id!}`} title={'Discard'} />
        <button type='submit'>Save</button>
      </BottomPanel>
    </Form>
  )
}
