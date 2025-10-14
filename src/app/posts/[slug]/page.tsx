import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";

type Params = {
  params: { slug: string };
};

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) return notFound();

  const content = await markdownToHtml(post.content || "");

  return (
    <main className="bg-gray-50 dark:bg-slate-900 min-h-screen py-12">
      <Container>
        <Header />

        {/* タイトル・日付を独立表示 */}
        <section className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            {post.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </section>

        {/* 記事本文 */}
        <article className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8 max-w-3xl mx-auto">
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const title = `${post.title} | Blog`;

  return {
    title,
    openGraph: {
      title,
      ...(post.ogImage?.url && { images: [post.ogImage.url] }),
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
