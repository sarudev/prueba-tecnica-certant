import { useEffect } from 'react'

export default function useHeadTitle (title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
