import Link from "next/link";
import { Article } from "@/lib/types";
import { getStrapiImageUrl } from "@/lib/strapi";

interface BookReviewContentProps {
  article: Article;
}

export default function BookReviewContent({ article }: BookReviewContentProps) {
  const review = article.review;
  
  if (!review) {
    return <p className="text-center text-gray-500">No review content available.</p>;
  }

  const coverImage = article.coverImage?.[0]?.url
    ? getStrapiImageUrl(article.coverImage[0])
    : undefined;

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

      {/* Book Info Card */}
      <div className="border border-gray-200 p-6 mb-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Book Cover */}
          <div className="w-full md:w-48 flex-shrink-0">
            {coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverImage} alt={review.title} className="w-full h-auto" />
            ) : (
              <div className="w-full aspect-[2/3] bg-gradient-to-b from-teal-600 to-teal-800 flex flex-col justify-between p-4 text-white">
                <div>
                  <p className="text-xs uppercase tracking-wider">{article.author?.name || "Author"}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold leading-tight">{review.title}</p>
                </div>
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">{review.title}</h2>
            <ul className="text-sm text-gray-700 mb-4 space-y-1">
              {review.rating && <li>· {review.rating}/5</li>}
              {review.genre && <li>· {review.genre}</li>}
            </ul>

            {/* Buttons */}
            <div className="flex gap-3 mb-6">
              {review.amazoneLink && (
                <Link
                  href={review.amazoneLink}
                  target="_blank"
                  className="px-6 py-2 border border-black text-xs font-medium hover:bg-black hover:text-white transition-colors"
                >
                  AMAZON
                </Link>
              )}
              {review.waterstoneLink && (
                <Link
                  href={review.waterstoneLink}
                  target="_blank"
                  className="px-6 py-2 bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors"
                >
                  WATERSTONE
                </Link>
              )}
            </div>

            {/* Blurb */}
            {review.blurb && (
              <div>
                <h3 className="text-sm font-bold mb-2">Blurb:</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{review.blurb}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Literary Tropes */}
      {review.literaryTropes && review.literaryTropes.length > 0 && (
        <div className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4">LITERARY TROPES</h3>
          <div className="flex flex-wrap gap-6 text-xs text-gray-500 uppercase tracking-wider border-t border-b border-gray-200 py-3">
            {review.literaryTropes.map((trope) => (
              <span key={trope.id} className="hover:text-black cursor-pointer">{trope.title}</span>
            ))}
          </div>
        </div>
      )}

      {/* Initial Reaction */}
      {review.initialReaction && (
        <div className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4">INITIAL REACTION :</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{review.initialReaction}</p>
        </div>
      )}

      {/* Final Review */}
      {review.finalReview && (
        <div className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4">FINAL REVIEW</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{review.finalReview}</p>
        </div>
      )}
    </div>
  );
}
