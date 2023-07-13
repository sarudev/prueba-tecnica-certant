import { memo, useMemo, useState } from 'react'
import { PokemonTypeText } from './PokemonTypeName'
import { generateBackgroundColor } from '../utils/colors'
import PokemonSearchList from './PokemonSearchList'
import '../styles/pokemonItemSearch.scss'
import { type PokemonItemSearchProps } from '../types/componentProps'

function PokemonItemSearch ({ pokemon, allPokemones, selectPokemon }: PokemonItemSearchProps) {
  const types = useMemo(() => pokemon?.types.map(t => t.type.name), [pokemon])

  const [searchFocused, setFocused] = useState(false)
  const [search, setSearch] = useState(pokemon?.name ?? '')

  const handleDeleteEvolution = () => {
    selectPokemon('')
    setSearch('')
  }

  return (
    <div className="pokeitem search">
      <div className="type">
        {types != null && <PokemonTypeText types={types} />}
        <div className="color" style={{ background: generateBackgroundColor(types) }} />
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
          : <img className='sprite' />
      }
      <div className="lvl">{pokemon != null ? pokemon.base_experience : 0}</div>
      <button type='button' className="delete" onClick={() => handleDeleteEvolution()}>X</button>
    </div>
  )
}

export default memo(PokemonItemSearch)
