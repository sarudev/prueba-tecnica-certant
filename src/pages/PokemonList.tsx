import usePokemones from '../hooks/usePokemones'
import PokemonItem from '../components/PokemonItem'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import { PokemonItemWithoutTypeText } from '../components/PokemonItemWithoutTypeText'
import { Link } from 'react-router-dom'
import '../styles/pokemonList.scss'
import BottomPanel from '../components/BottomPanel'

export default function PokemonList () {
  const { pokemones, fetchMore } = usePokemones(10)
  const { pokeListRef, handleScroll } = useInfiniteScroll(fetchMore)

  return (
    <div className='pokemon-list-container'>
      <ul className='pokemon-list' ref={pokeListRef} onScroll={handleScroll}>
        {pokemones.map((pokemon) => <Link to={`/pokedex/${pokemon.id}`} key={pokemon.id}><PokemonItem pokemon={pokemon} /></Link>)}
        <PokemonItemWithoutTypeText types={['unknown']} name='Loading...' baseExperience='N/A' />
      </ul>
      <BottomPanel>
        <Link to='/logout'>Logout</Link>
        <Link to='/pokedex/new'>New</Link>
      </BottomPanel>
    </div>
  )
}
