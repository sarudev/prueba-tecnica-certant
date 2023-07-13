import { Form, Link, useLoaderData, useParams } from 'react-router-dom'
import { type PokemonLoaderData } from '../types/componentProps'
import Status from './Status'
import BottomPanel from '../components/BottomPanel'
import { useEffect, useState } from 'react'
import PokemonItemEdit from '../components/PokemonItemEdit'
import Input from '../components/Input'
import PokemonItemSearch from '../components/PokemonItemSearch'
import { getAll, getPokemonByName } from '../utils/pokemon'
import '../styles/pokemonEdit.scss'

// cualquier state que se usa en un input (ejemplo: imageLink)
// solo existe para mostrar la información del pokemon
// de manera que sea más user friendly le edición de datos
// estos estados no tienen sentido para un nuevo pokemon
// por eso no se uttilizan ahí
export default function EditPokemon () {
  const { pokemon, evolutions } = useLoaderData() as PokemonLoaderData
  const params = useParams()
  const [allPokemones, setAllPokemones] = useState<string[]>([])

  if (pokemon == null) return <Status code={404} goto='/' gotoMessage='Return to the Pokedex' statusMessage='Not Found' />

  const [imageLink, setImageLink] = useState(pokemon.sprites.other['official-artwork'].front_default)
  const [abilities, setAbilities] = useState<Array<{ id: number, name: string }>>(pokemon.abilities.map((a, i) => ({ id: i, name: a.ability.name })))
  const [selectedPokemon, selectPokemon] = useState(evolutions[0]?.name ?? '')
  const [evolution, setEvolution] = useState(evolutions[0])

  useEffect(() => {
    void getAll().then(res => setAllPokemones(res!))
    return () => {
      setAllPokemones([])
    }
  }, [])

  useEffect(() => {
    if (selectedPokemon === '') return
    void getPokemonByName(selectedPokemon).then(res => setEvolution(res!))
    return () => {
      setEvolution(evolutions[0])
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
          <PokemonItemEdit pokemon={pokemon} sprite={imageLink} />
        </div>

        <div className="sprites-container">
          <span className="text">
            <h1>Image</h1>
          </span>
          <div className="sprites">
            <img src={imageLink} alt={`Front sprite of ${pokemon.name}`} className="front" />
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
        <Link to={`/pokedex/${params.id!}`}>Discard</Link>
        <button type='submit'>Save</button>
      </BottomPanel>
    </Form>
  )
}
