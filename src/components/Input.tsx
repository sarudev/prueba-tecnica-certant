import { useState } from 'react'

export default function Input (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  const [stateValue, setValue] = useState(props.value)

  return <input {...props} value={stateValue} onChange={e => setValue(e.target.value)} />
}
