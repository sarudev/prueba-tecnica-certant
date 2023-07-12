import useHeadTitle from '../hooks/useHeadTitle'
import { type PokedexProps } from '../types/componentProps'
import '../styles/pokedex.scss'

export default function Pokedex ({ title, element, bottomPanel }: PokedexProps) {
  useHeadTitle(`Pokedex - ${title}`)

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
