import { Article } from "@/lib/types";
import BookListingItem from "./BookListingItem";
import { getStrapiImageUrl } from "@/lib/strapi";

interface BookRecommendationContentProps {
  article: Article;
}

export default function BookRecommendationContent({ article }: BookRecommendationContentProps) {
  const recommendations = article.recommendationList;

  if (!recommendations || recommendations.length === 0) {
    return <p className="text-center text-gray-500">No recommendations available.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Genre Tags */}
      <div className="py-6">
        <div className="flex gap-2">
          {article.tags?.map((tag, i) => (
            <span key={tag.id} className="text-sm text-gray-600">
              {tag.name}{i < (article.tags?.length ?? 0) - 1 ? "," : ""}
            </span>
          ))}
        </div>
      </div>

      {/* Book Listings */}
      {recommendations.map((rec, index) => {
        const imageUrl = rec.image ? getStrapiImageUrl(rec.image) : undefined;
        
        return (
          <BookListingItem
            key={rec.id}
            number={index + 1}
            title={rec.title}
            author=""
            rating={parseFloat(rec.rating) || 0}
            genre={rec.genre || ""}
            blurb={rec.blurb || ""}
            thoughts={rec.myThoughts || ""}
            thoughtsTitle="MY THOUGHTS"
            imageUrl={imageUrl}
          />
        );
      })}
    </div>
  );
}
