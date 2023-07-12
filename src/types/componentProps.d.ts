import 'vite/client'
import type { PokemonResponse } from './types.d.ts'

export interface PokemonItemWithoutTypeTextProps {
  children?: JSX.Element // me gustaría que solo permite aceptar PokemonTypeName, pero no pude lograrlo
  textTypesRef?: React.RefObject<HTMLDivElement>
  types: string[]
  name: string
  baseExperience: number | string
  sprite?: string
}

export interface PokedexProps {
  title: string
  element: JSX.Element
  bottomPanel?: JSX.Element
}

export interface PokemonLoaderData {
  pokemon: PokemonResponse | null
  evolutions: PokemonResponse[]
}
