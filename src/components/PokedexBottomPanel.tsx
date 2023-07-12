import { Link, useParams } from 'react-router-dom'
import { type BottomPanelData } from '../types/componentProps'

export default function PokedexBottomPanel ({ data }: { data: BottomPanelData[] }) {
  const params = useParams()

  return data.map((data, i) => {
    if (data.type === 'button') return <button key={i} onClick={data.onClick}>{data.text}</button>
    else if (data.type === 'anchor') return <Link key={i} to={data.goto(params)}>{data.text}</Link>
    else return null
  })
}
