import { useLayoutEffect, useRef } from 'react'
import { firstUpper } from '../utils/text'

export default function useHoverTypeText (types: string[]) {
  const textTypesRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (textTypesRef.current == null) return
    textTypesRef.current.style.setProperty('--types', '"' + types.map(t => firstUpper(t)).join(', ') + '"')
  }, [types])

  return textTypesRef
}
