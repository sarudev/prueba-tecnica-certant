import { redirect, type ActionFunctionArgs } from 'react-router-dom'
import { availibleTypes, editPokemon } from '../../utils/pokemon'

export async function action ({ request, params }: ActionFunctionArgs) {
  const form = await request.formData()

  const pokeId = form.get('pokemon-id') as string
  const pokeName = form.get('pokemon-name') as string
  const pokeLvl = form.get('pokemon-lvl') as string
  const pokeImg = form.get('pokemon-image') as string
  const pokeAbi = form.getAll('ability') as string[]
  const pokeEvo = form.get('pokemon-evolution') as string

  const pokeTypes: string[] = []
  for (const type of availibleTypes) {
    const data = form.get(`type-${type}`)
    if (data != null) {
      pokeTypes.push(type)
    }
  }

  const pokemon = { pokeName, pokeLvl: Number(pokeLvl), pokeImg, pokeTypes, pokeAbi, pokeEvo, pokeId: Number(pokeId) }
  editPokemon(pokemon)

  return redirect(`/pokedex/${params.id!}`)
}
