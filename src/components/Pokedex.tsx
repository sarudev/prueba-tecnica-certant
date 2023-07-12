import '../styles/pokedex.scss'

export default function Pokedex ({ children, bottomPanel }: { children: JSX.Element, bottomPanel?: JSX.Element }) {
  return (
    <div className='pokedex-container'>
      <h1 className='pokedex'>Pokedex - Lite</h1>
      <div className="children">
        {children}
      </div>
      {(bottomPanel != null) && (
        <div className="bottom-panel">
          {bottomPanel}
        </div>
      )}
    </div>
  )
}
