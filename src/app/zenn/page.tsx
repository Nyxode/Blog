import '@/app/zenn-content.css'
import markdownToHtml from '@/lib/markdownToHtml'
import { ZennEmbedInit } from './zenn-embed-init'

// markdown本文
const markdown = `
# Zenn風記事タイトル

これは **Zenn風** のMarkdown記事です。

> 引用もできます。

\`\`\`js
console.log("Hello, Zenn!");
\`\`\`

@[tweet](https://twitter.com/zenn_dev/status/1691075999999970000)
`

// ★ サーバーコンポーネント
export default async function ZennPage() {
  const html = await markdownToHtml(markdown)

return (
  <main className="min-h-screen bg-gray-50 py-10">
    <div className="max-w-3xl mx-auto px-4">
      <ZennEmbedInit />
      <article className="znc prose prose-lg">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  </main>
)

}
