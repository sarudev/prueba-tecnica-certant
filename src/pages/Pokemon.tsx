import { Link, useLoaderData, useParams } from 'react-router-dom'
import PokemonItem from '../components/PokemonItem'
import '../styles/pokemon.scss'
import { firstUpper } from '../utils/text'
import { type PokemonLoaderData } from '../types/componentProps'
import Status from './Status'
import BottomPanel from '../components/BottomPanel'

export default function Pokemon () {
  const { pokemon, evolutions } = useLoaderData() as PokemonLoaderData
  const params = useParams()

  if (pokemon == null) return <Status code={404} goto='/' gotoMessage='Return to the Pokedex' statusMessage='Not Found' />

  return (
    <div className="poke-pokemon-container">
      <div className="pokemon-container">
        <div className="poke-container">
          <span className="text">
            <h1>Information</h1>
          </span>
          <PokemonItem pokemon={pokemon} />
        </div>

        <div className="sprites-container">
          <span className="text">
            <h1>Image</h1>
          </span>
          <div className="sprites">
            <img src={pokemon.sprites.other['official-artwork'].front_default} alt={`Front sprite of ${pokemon.name}`} className="front" />
          </div>
        </div>

        <div className="abilities-container">
          <span className="text">
            <h1>Abilities</h1>
          </span>
          <div className="abilities">
            {
              pokemon.abilities.length > 0
                ? pokemon.abilities.map((ability) => <span key={ability.ability.name}>{firstUpper(ability.ability.name)}</span>)
                : <span className='no-abilities'>This pokemon has no abilities</span>
            }
          </div>
        </div>

        <div className="evolutions-container">
          <span className="text">
            <h1>Evolutions</h1>
          </span>
          <div className="evolutions">
            {
              evolutions.length > 0
                ? evolutions.map((poke) => <Link key={poke.id} to={`/pokedex/${poke.id}`}><PokemonItem pokemon={poke} /></Link>)
                : <span className='no-evolution'>This pokemon has no evolutions</span>
            }
          </div>
        </div>
      </div>
      <BottomPanel>
        <Link to='/pokedex'>Return to the Pokedex</Link>
        <Link to={`/pokedex/${params.id!}/edit`}>Edit</Link>
      </BottomPanel>
    </div>
  )
}
