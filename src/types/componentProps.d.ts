import 'vite/client'

export interface PokemonItemWithoutTypeTextProps {
  children?: JSX.Element // me gustaría que solo permite aceptar PokemonTypeName, pero no pude lograrlo
  textTypesRef?: React.RefObject<HTMLDivElement>
  types: string[]
  name: string
  baseExperience: number | string
}
