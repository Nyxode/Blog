import Container from "@/app/_components/container";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS_PER_PAGE } from "@/lib/constants";

export async function generateStaticParams() {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  return Array.from({ length: totalPages }).map((_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default function PagedIndex({ params }: { params: { page: string } }) {
  const pageNumber = parseInt(params.page, 10);
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  if (pageNumber < 1 || pageNumber > totalPages) {
    return notFound();
  }

  const start = (pageNumber - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const pagePosts = allPosts.slice(start, end);

  return (
    <main className="min-h-screen py-12">
      <Container>
        <section className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center tracking-tight text-gray-900 dark:text-gray-100">
            FUKAGAWA.dev
          </h1>

          {/* ページ番号を本文中に表示 */}
          {pageNumber > 1 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mb-10 text-sm">
              {pageNumber}ページ目
            </p>
          )}

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

          {/* ページネーション */}
          <div className="flex justify-center mt-12 space-x-4">
            {pageNumber > 1 && (
              <Link
                href={pageNumber === 2 ? "/" : `/page/${pageNumber - 1}`}
                className="inline-flex items-center gap-2 px-5 py-2 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-lg shadow-sm hover:bg-gray-300 dark:hover:bg-slate-600 hover:shadow-md transition-all duration-200"
              >
                ← 前のページ
              </Link>
            )}
            {pageNumber < totalPages && (
              <Link
                href={`/page/${pageNumber + 1}`}
                className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200"
              >
                次のページ →
              </Link>
            )}
          </div>
        </section>
      </Container>
    </main>
  );
}
