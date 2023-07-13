import { memo } from 'react'
import '../styles/bottomPanel.scss'

function BottomPanel ({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <div className="bottom-panel">
      {children}
    </div>
  )
}

export default memo(BottomPanel)
