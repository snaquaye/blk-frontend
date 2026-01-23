import FilmTVReviewHero from "./FilmTVReviewHero";
import { AvailableOn } from "@/lib/types";

interface RecommentationItemProps {
  number: number;
  title: string;
  rating?: string;
  genre?: string;
  imageUrl?: string;
  trailerLink?: string;
  availableOn?: AvailableOn[];
  content?: string;
}

export default function FilmRecommendationItem({
  number,
  title,
  rating,
  genre,
  trailerLink,
  imageUrl,
  availableOn = [],
  content
}: RecommentationItemProps) {
  return (
    <div className="py-8 border-b border-gray-200">
      <div className="gap-4 flex flex-col">
        {/* Number and Show Image */}
        <div className="flex gap-4">
          <span className="text-2xl font-bold text-black">{number}. {title}</span>
        </div>
        <p>{content}</p>

        {/* Show Details */}
        <FilmTVReviewHero 
          availableOn={availableOn}
          genre={genre}
          imageAlt={title}
          imageUrl={imageUrl}
          key={number}
          rating={rating?.toString()}
          trailerLink={trailerLink} />
      </div>
    </div>
  );
}
