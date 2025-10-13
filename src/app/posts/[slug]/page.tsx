import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

type Params = {
  params: {
    slug: string;
  };
};

// ===== 記事ページ本体 =====
export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

// ===== メタデータ生成（SEO・OGP対応） =====
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Blog`;

  return {
    title,
    openGraph: {
      title,
      images: [
        post.ogImage?.url ?? "/assets/blog/default-og.png",
      ],
    },
  };
}

// ===== 静的パス生成（SSG対応） =====
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}