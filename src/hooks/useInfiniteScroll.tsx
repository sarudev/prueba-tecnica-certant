import { useRef, useState } from 'react'

export default function useInfiniteScroll (fetchMore: (abortController?: AbortController | undefined) => Promise<void>) {
  const [isLoading, setIsLoading] = useState(false)

  const pokeListRef = useRef<HTMLUListElement>(null)

  const getMore = async () => {
    setIsLoading(true)
    await fetchMore()
    setIsLoading(false)
  }

  const handleScroll: React.UIEventHandler<HTMLUListElement> = (e) => {
    if (pokeListRef.current == null) return

    if (pokeListRef.current.clientHeight + pokeListRef.current.scrollTop < pokeListRef.current.scrollHeight - 20 || isLoading) {
      return
    }

    void getMore()
  }

  return { pokeListRef, handleScroll }
}
