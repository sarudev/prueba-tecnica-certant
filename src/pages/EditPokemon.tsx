import { Form, useLoaderData, useParams } from 'react-router-dom'
import { type PokemonLoaderData } from '../types/componentProps'
import Status from './Status'
import BottomPanel from '../components/BottomPanel'
import MemoLink from '../components/MemoLink'
import useCreateOrEditPokemon from '../hooks/useCreateOrEditPokemon'
import PokemonContainerInputs from '../components/PokemonContainerInputs'
import '../styles/pokemonEdit.scss'

export default function EditPokemon () {
  const { pokemon, evolutions } = useLoaderData() as PokemonLoaderData
  const params = useParams()

  if (pokemon == null) return <Status code={404} goto='/' gotoMessage='Return to the Pokedex' statusMessage='Not Found' />

  const createOrEdit = useCreateOrEditPokemon({
    pokemonName: pokemon.name,
    initialEvolution: evolutions[0],
    initialAbilities: pokemon.abilities.map((a, i) => ({ id: i, name: a.ability.name })),
    initialSprite: pokemon.sprites.other['official-artwork'].front_default
  })

  return (
    <Form method='POST' className="poke-pokemon-container">
      <input name='pokemon-id' defaultValue={pokemon.id} hidden />
      <PokemonContainerInputs createOrEdit={createOrEdit} pokemon={pokemon} />
      <BottomPanel>
        <MemoLink to={`/pokedex/${params.id!}`} title={'Discard'} />
        <button type='submit'>Save</button>
      </BottomPanel>
    </Form>
  )
}
