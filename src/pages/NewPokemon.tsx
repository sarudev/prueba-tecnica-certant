import { Form, Link } from 'react-router-dom'
import BottomPanel from '../components/BottomPanel'
import useCreateOrEditPokemon from '../hooks/useCreateOrEditPokemon'
import PokemonContainerInputs from '../components/PokemonContainerInputs'
import '../styles/pokemonEdit.scss'

export default function NewPokemon () {
  const createOrEdit = useCreateOrEditPokemon()

  return (
    <Form method='POST' className="poke-pokemon-container">
      <PokemonContainerInputs createOrEdit={createOrEdit} pokemon={null} />
      <BottomPanel>
        <Link to='/pokedex'>Discard</Link>
        <button type='submit'>Create</button>
      </BottomPanel>
    </Form>
  )
}
