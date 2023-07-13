import { type PokemonResponse } from '../types/types'
import { useMemo, useState } from 'react'
import { PokemonTypeText } from './PokemonTypeName'
import { generateBackgroundColor } from '../utils/colors'
import '../styles/pokemonItemSearch.scss'
import { firstUpper } from '../utils/text'

export default function PokemonItemSearch ({ pokemon, allPokemones, selectPokemon }: { pokemon: PokemonResponse | null, allPokemones: string[], selectPokemon: React.Dispatch<React.SetStateAction<string>> }) {
  const types = useMemo(() => pokemon?.types.map(t => t.type.name), [pokemon])

  const [searchFocused, setFocused] = useState(false)
  const [search, setSearch] = useState(pokemon?.name ?? '')

  return (
    <div className="pokeitem search">
      <div className="type">
        {types != null && <PokemonTypeText types={types} />}
        <div className="color" style={{ background: generateBackgroundColor(types ?? ['']) }} />
      </div>
      <input
        className='search-evolution'
        type="search"
        name='pokemon-evolution'
        placeholder='Search evolution'
        value={search}
        onChange={e => setSearch(e.target.value)}
        onFocus={e => setFocused(true) }
        onBlur={e => setFocused(false)}
      />
      {searchFocused && (
        <ul className="search-list">
          <PokemonSearchList allPokemones={allPokemones} search={search} setSearch={setSearch} selectPokemon={selectPokemon} />
        </ul>
      )}
      {
        pokemon != null
          ? <img className='sprite' src={pokemon.sprites.other['official-artwork'].front_default} alt={`Artwork of ${pokemon.name}`} />
          : <img />
      }
      <div className="lvl">{pokemon != null ? pokemon.base_experience : 0}</div>
    </div>
  )
}

function PokemonSearchList ({ search, setSearch, allPokemones, selectPokemon }: { search: string, setSearch: React.Dispatch<React.SetStateAction<string>>, allPokemones: string[], selectPokemon: React.Dispatch<React.SetStateAction<string>> }) {
  const list = useMemo(() => {
    return allPokemones.filter(p => p.startsWith(search)).map((p, i) => i < 5 ? <PokemonSearchItem selectPokemon={selectPokemon} setSearch={setSearch} key={p} text={p}/> : null).filter(p => p != null)
  }, [search, allPokemones])

  return list.length < 1
    ? 'No results'
    : list
}

function PokemonSearchItem ({ text, setSearch, selectPokemon }: { text: string, setSearch: React.Dispatch<React.SetStateAction<string>>, selectPokemon: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <li className='search-item' onMouseDown={() => { selectPokemon(text); setSearch(text) }}>
      {firstUpper(text)}
    </li>
  )
}
