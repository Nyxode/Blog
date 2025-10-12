'use client'

import { useEffect } from 'react'

export function ZennEmbedInit() {
  useEffect(() => {
    // すでにスクリプトがある場合は何もしない
    if (document.querySelector('script[data-zenn-embed]')) return

    // CDN経由でzenn-embed-elementsを読み込む
    const script = document.createElement('script')
    script.src = 'https://embed.zenn.studio/js/listen-embed-event.js'
    script.dataset.zennEmbed = 'true'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return null
}
