import usePokemones from '../hooks/usePokemones'
import PokemonItem from './PokemonItem'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import '../styles/pokemones.scss'
import { PokemonItemWithoutTypeText } from './PokemonItemWithoutTypeText'

export default function Pokemones () {
  const { pokemones, fetchMore } = usePokemones(10)
  const { pokeListRef, handleScroll } = useInfiniteScroll(fetchMore)

  return (
    <ul className='pokemones' ref={pokeListRef} onScroll={handleScroll}>
      {pokemones.map((pokemon) => <PokemonItem key={pokemon.id} pokemon={pokemon} />)}
      <PokemonItemWithoutTypeText types={['unknown']} name='Loading...' baseExperience='N/A' />
    </ul>
  )
}
