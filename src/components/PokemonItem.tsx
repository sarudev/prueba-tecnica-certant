import { type PokemonResponse } from '../types/types'
import { useMemo } from 'react'
import useHoverTypeText from './useHoverTypeText'
import { PokemonItemWithoutTypeText } from './PokemonItemWithoutTypeText'
import { PokemonTypeText } from './PokemonTypeName'
import '../styles/pokemonItem.scss'

export default function PokemonItem ({ pokemon }: { pokemon: PokemonResponse }) {
  const types = useMemo(() => pokemon.types.map(t => t.type.name), [])

  const textTypesRef = useHoverTypeText(types)

  return (
    <PokemonItemWithoutTypeText textTypesRef={textTypesRef} types={types} name={pokemon.name} baseExperience={pokemon.base_experience}>
      <PokemonTypeText types={types} />
    </PokemonItemWithoutTypeText>
  )
}
