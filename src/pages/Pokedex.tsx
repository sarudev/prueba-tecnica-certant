import useHeadTitle from '../hooks/useHeadTitle'
import { type PokemonLoaderData, type PokedexProps } from '../types/componentProps'
import '../styles/pokedex.scss'
import { useLoaderData } from 'react-router-dom'
import { firstUpper } from '../utils/text'
import useFavicon from '../hooks/useFavicon'

export default function Pokedex ({ title, element, bottomPanel }: PokedexProps) {
  const data = useLoaderData() as PokemonLoaderData

  useHeadTitle(`Pokedex - ${firstUpper(data?.pokemon?.name ?? title)}`)
  useFavicon(data?.pokemon?.sprites.other['official-artwork'].front_default ?? 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png')

  return (
    <div className='pokedex-container'>
      <h1 className='pokedex'>Pokedex - {title}</h1>
      <div className="children">
        {element}
      </div>
      {(bottomPanel != null) && (
        <div className="bottom-panel">
          {bottomPanel}
        </div>
      )}
    </div>
  )
}
