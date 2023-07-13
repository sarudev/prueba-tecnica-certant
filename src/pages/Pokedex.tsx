import useHeadTitle from '../hooks/useHeadTitle'
import { type PokemonLoaderData, type PokedexProps } from '../types/componentProps'
import '../styles/pokedex.scss'
import { useLoaderData } from 'react-router-dom'
import { firstUpper } from '../utils/text'

export default function Pokedex ({ title, element, bottomPanel }: PokedexProps) {
  const data = useLoaderData() as PokemonLoaderData

  useHeadTitle(`Pokedex - ${firstUpper(data?.pokemon?.name ?? title)}`)

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
