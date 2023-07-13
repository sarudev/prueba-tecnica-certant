import { memo, useMemo } from 'react'
import PokemonSearchItem from './PokemonSearchItem'
import { type PokemonSearchListProps } from '../types/componentProps'

function PokemonSearchList ({ search, setSearch, allPokemones, selectPokemon }: PokemonSearchListProps) {
  const list = useMemo(() => {
    return allPokemones.filter(p => p.name.startsWith(search)).map((p, i) => i < 5 ? <PokemonSearchItem selectPokemon={selectPokemon} setSearch={setSearch} key={p.id} text={p.name}/> : null).filter(p => p != null)
  }, [search, allPokemones])

  return list.length < 1
    ? 'No results'
    : search.length < 1
      ? 'Type to search pokemons'
      : list
}

export default memo(PokemonSearchList)
