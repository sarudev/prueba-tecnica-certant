import { memo, useMemo } from 'react'
import PokemonSearchItem from './PokemonSearchItem'

function PokemonSearchList ({ search, setSearch, allPokemones, selectPokemon }: { search: string, setSearch: React.Dispatch<React.SetStateAction<string>>, allPokemones: string[], selectPokemon: React.Dispatch<React.SetStateAction<string>> }) {
  const list = useMemo(() => {
    return allPokemones.filter(p => p.startsWith(search)).map((p, i) => i < 5 ? <PokemonSearchItem selectPokemon={selectPokemon} setSearch={setSearch} key={p} text={p}/> : null).filter(p => p != null)
  }, [search, allPokemones])

  return list.length < 1
    ? 'No results'
    : search.length < 1
      ? 'Type to search pokemons'
      : list
}

export default memo(PokemonSearchList)
