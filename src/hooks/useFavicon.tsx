import { useEffect } from 'react'

export default function useFavicon (src: string) {
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement

    if (link == null) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.getElementsByTagName('head')[0].appendChild(link)
    }

    link.href = src
  }, [src])
}
