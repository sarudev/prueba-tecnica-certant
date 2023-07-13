import '../styles/bottomPanel.scss'

export default function BottomPanel ({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <div className="bottom-panel">
      {children}
    </div>
  )
}
