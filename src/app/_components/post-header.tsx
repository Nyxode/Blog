import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import Avatar from "@/app/_components/avatar";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author?: Author; // ✅ optional に変更
};

export function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <>
      {/* 記事タイトル */}
      <PostTitle>{title}</PostTitle>

      {/* 著者情報（PC表示用） */}
      {author && (
        <div className="hidden md:block md:mb-12">
          <Avatar name={author.name} picture={author.picture} />
        </div>
      )}

      {/* カバー画像 */}
      {coverImage && (
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={title} src={coverImage} />
        </div>
      )}

      {/* 日付・著者情報 */}
      <div className="max-w-2xl mx-auto">
        {author && (
          <div className="block md:hidden mb-6">
            <Avatar name={author.name} picture={author.picture} />
          </div>
        )}
        <div className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
