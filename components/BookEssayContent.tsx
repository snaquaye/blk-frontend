import { Article } from "@/lib/types";
import BlockRendererClient from "./BlockRendererClient";

interface BookEssayContentProps {
  article: Article;
}

export default function BookEssayContent({ article }: BookEssayContentProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tags */}
      <div className="mb-8">
        {article.tags?.map((tag, i) => (
          <span key={tag.id} className="text-xs text-gray-600">
            {tag.name}{i < (article.tags?.length ?? 0) - 1 ? ", " : ""}
          </span>
        ))}
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        {article.content && (
          <BlockRendererClient content={article.content} />
        )}
      </div>
    </div>
  );
}
