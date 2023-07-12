import usePokemones from '../hooks/usePokemones'
import PokemonItem from '../components/PokemonItem'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import { PokemonItemWithoutTypeText } from '../components/PokemonItemWithoutTypeText'
import '../styles/pokemonList.scss'

export default function PokemonList () {
  const { pokemones, fetchMore } = usePokemones(10)
  const { pokeListRef, handleScroll } = useInfiniteScroll(fetchMore)

  return (
    <ul className='pokemon-list' ref={pokeListRef} onScroll={handleScroll}>
      {pokemones.map((pokemon) => <a href={`/pokedex/${pokemon.id}`} key={pokemon.id}><PokemonItem pokemon={pokemon} /></a>)}
      <PokemonItemWithoutTypeText types={['unknown']} name='Loading...' baseExperience='N/A' />
    </ul>
  )
}
