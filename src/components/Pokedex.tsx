import '../styles/pokedex.scss'

export default function Pokedex ({ children }: { children: JSX.Element }) {
  return (
    <div className='pokedex-container'>
      <h1 className='pokedex'>Pokedex - Lite</h1>
      <div className="children">
        {children}
      </div>
    </div>
  )
}
