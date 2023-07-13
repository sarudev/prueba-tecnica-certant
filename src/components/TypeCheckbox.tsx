import { memo, useRef } from 'react'
import { type PokemonTypes } from '../types/types'

function TypeCheckbox ({ type, types, setTypes }: { type: PokemonTypes, types: PokemonTypes[], setTypes: React.Dispatch<React.SetStateAction<PokemonTypes[]>> }) {
  const checkRef = useRef<HTMLInputElement>(null)

  const handleChange = () => {
    const ts = [...types]

    const thatIdx = ts.findIndex(t => t === type)

    thatIdx < 0
      ? ts.push(type)
      : ts.splice(thatIdx, 1)

    setTypes(ts)
  }

  const mark = () => {
    if (checkRef.current == null) return

    checkRef.current.checked = !checkRef.current.checked
    handleChange()
  }

  return (
    <div onClick={mark} className='checkbox'>
      <span>{type}</span>
      <input name={`type-${type}`} ref={checkRef} key={type} type='checkbox' checked={types.some(t => t === type)} onChange={handleChange} />
    </div>
  )
}

export default memo(TypeCheckbox)
