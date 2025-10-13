import Container from "@/app/_components/container";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";

export default function Index() {
  const allPosts = getAllPosts();

  return (
    <main className="bg-gray-50 dark:bg-slate-900 min-h-screen py-12">
      <Container>
        <section className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-10 text-center tracking-tight text-gray-900 dark:text-gray-100">
            Toruche Blog
          </h1>

          <div className="space-y-6">
            {allPosts.map((post) => (
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
        </section>
      </Container>
    </main>
  );
}
