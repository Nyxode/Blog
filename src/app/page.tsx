import Container from "@/app/_components/container";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import { POSTS_PER_PAGE } from "@/lib/constants";

export default function Index() {
  const allPosts = getAllPosts();
  const pagePosts = allPosts.slice(0, POSTS_PER_PAGE);
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  return (
    <main className="min-h-screen py-12">
      <Container>
        <section className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-10 text-center tracking-tight text-gray-900 dark:text-gray-100">
            FUKAGAWA.dev
          </h1>

          <div className="space-y-6">
            {pagePosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
              >
                <Link href={`/posts/${post.slug}`} className="block group">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {new Date(post.date).toLocaleDateString("ja-JP")}
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
          {/* ページネーションリンク */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <Link
                href="/page/2"
                className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200"
              >
                次のページ
                <span className="text-base">→</span>
              </Link>
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
