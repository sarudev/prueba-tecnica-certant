import { memo } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

function MemoLink (props: LinkProps & { title: string }) {
  return <Link {...props}>{props.title}</Link>
}

export default memo(MemoLink)
