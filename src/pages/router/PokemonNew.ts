import { redirect, type ActionFunctionArgs } from 'react-router-dom'
import { createCustom, createPokemon } from '../../utils/pokemon'

export async function action ({ request }: ActionFunctionArgs) {
  const form = await request.formData()

  const pokemon = await createCustom(form)
  createPokemon(pokemon)

  return redirect('/pokedex')
}
