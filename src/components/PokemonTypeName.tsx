import { firstUpper } from '../utils/text'

export function PokemonTypeText ({ types }: { types: string[] }) {
  return (
    <div className="type-name">
      {types.map(t => <span key={t} className='text' style={{ background: `var(--${t})` }}>{t.length > 0 ? firstUpper(t) : ''}</span>)}
    </div>
  )
}
