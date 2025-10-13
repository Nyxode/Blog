import Container from "@/app/_components/container";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";

export default function Index() {
  const allPosts = getAllPosts();

  return (
    <main>
      <Container>
        <section className="py-10">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Toruche Blog
          </h1>

          <div className="space-y-10">
            {allPosts.map((post) => (
              <article key={post.slug} className="border-b pb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="hover:underline text-blue-600 dark:text-blue-400"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {new Date(post.date).toLocaleDateString()}
                </p>

                <p className="text-gray-800 dark:text-gray-300">
                  {post.excerpt}
                </p>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
