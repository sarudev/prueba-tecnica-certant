import { firstUpper } from '../utils/text'

export default function PokemonSearchItem ({ text, setSearch, selectPokemon }: { text: string, setSearch: React.Dispatch<React.SetStateAction<string>>, selectPokemon: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <li className='search-item' onMouseDown={() => { selectPokemon(text); setSearch(text) }}>
      {firstUpper(text)}
    </li>
  )
}
