import { Form, Link } from 'react-router-dom'
import BottomPanel from '../components/BottomPanel'
import { useEffect, useState } from 'react'
import PokemonItemEdit from '../components/PokemonItemEdit'
import Input from '../components/Input'
import PokemonItemSearch from '../components/PokemonItemSearch'
import { getAll, getPokemonByName } from '../utils/pokemon'
import { type PokemonResponse } from '../types/types'
import '../styles/pokemonEdit.scss'

export default function NewPokemon () {
  const [allPokemones, setAllPokemones] = useState<string[]>([])

  const [imageLink, setImageLink] = useState('')
  const [abilities, setAbilities] = useState<Array<{ id: number, name: string }>>([])
  const [selectedPokemon, selectPokemon] = useState('')
  const [evolution, setEvolution] = useState<PokemonResponse | null>(null)

  useEffect(() => {
    void getAll().then(res => setAllPokemones(res!))
    return () => {
      setAllPokemones([])
    }
  }, [])

  useEffect(() => {
    if (selectedPokemon === '') return
    void getPokemonByName(selectedPokemon).then(res => setEvolution(res))
    return () => {
      setEvolution(null)
    }
  }, [selectedPokemon])

  const newAbilityField = () => setAbilities(prev => [...prev, { name: '', id: (prev.at(-1)?.id ?? 0) + 1 }])
  const deleteAbilityField = (id: number) => setAbilities(prev => prev.filter(a => a.id !== id))

  return (
    <Form method='POST' className="poke-pokemon-container">
      <div className="pokemon-container">
        <div className="poke-container">
          <span className="text">
            <h1>Information</h1>
          </span>
          <PokemonItemEdit pokemon={null} sprite={imageLink} />
        </div>

        <div className="sprites-container">
          <span className="text">
            <h1>Image</h1>
          </span>
          <div className="sprites">
            <img src={imageLink} alt='Front sprite' className="front" />
            <input name='pokemon-image' type="text" value={imageLink} onChange={e => setImageLink(e.target.value)} placeholder='image link' required />
          </div>
        </div>

        <div className="abilities-container">
          <span className="text">
            <h1>Abilities</h1>
          </span>
          <div className="abilities">
            {abilities.map((ability) => (
              <div key={ability.id} className='ability-container'>
                <Input name='ability' className="ability-name" placeholder='Ability name' value={ability.name} required />
                <button onClick={() => deleteAbilityField(ability.id)}>X</button>
              </div>
            ))}
            <button onClick={newAbilityField}>Add ability field</button>
          </div>
        </div>

        <div className="evolutions-container">
          <span className="text">
            <h1>Evolutions</h1>
          </span>
          <div className="evolutions">
            <PokemonItemSearch selectPokemon={selectPokemon} allPokemones={allPokemones} pokemon={evolution} />
          </div>
        </div>
      </div>
      <BottomPanel>
        <Link to='/pokedex'>Discard</Link>
        <button type='submit'>Create</button>
      </BottomPanel>
    </Form>
  )
}
