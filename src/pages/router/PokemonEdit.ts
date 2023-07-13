import { redirect, type ActionFunctionArgs } from 'react-router-dom'
import { createCustom, editPokemon } from '../../utils/pokemon'
import { type CustomPokemon } from '../../types/types'

export async function action ({ request, params }: ActionFunctionArgs) {
  const form = await request.formData()

  const pokemon = await createCustom(form)
  console.log(pokemon)
  editPokemon(pokemon as CustomPokemon)

  return redirect(`/pokedex/${params.id!}`)
}
