import Link from "next/link";

interface RecommentationItemProps {
  number: number;
  title: string;
  year?: string;
  rating?: number;
  genre?: string;
  blurb: string;
  thoughts?: string;
  thoughtsTitle?: string;
  imageUrl?: string;
  watchUrl?: string;
}

export default function FilmRecommendationItem({
  number,
  title,
  year,
  rating,
  genre,
  blurb,
  thoughts,
  thoughtsTitle = "MY THOUGHTS",
  imageUrl,
  watchUrl = "#",
}: RecommentationItemProps) {
  return (
    <div className="py-8 border-b border-gray-200">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Number and Show Image */}
        <div className="flex gap-4">
          <span className="text-2xl font-bold text-black">{number}.</span>
          <div className="w-40 flex-shrink-0">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-auto object-cover shadow-md" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-black bg-gray-200">
                No image
              </div>
            )}
          </div>
        </div>

        {/* Show Details */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-black uppercase mb-2">{title}</h3>
          {year && (
            <p className="text-sm text-gray-600 mb-1">{year}</p>
          )}
          {rating && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">• {rating}/5</span>
            </div>
          )}
          {genre && (
            <p className="text-sm text-gray-600 uppercase tracking-wider mb-4">{genre}</p>
          )}

          {/* Watch Button */}
          <div className="flex gap-3 mb-6">
            <Link
              href={watchUrl}
              className="px-4 py-2 border border-black text-xs font-medium uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              Watch Now
            </Link>
          </div>

          {/* Blurb */}
          <div className="mb-4">
            <h4 className="text-sm font-bold text-black mb-2">Synopsis:</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{blurb}</p>
          </div>
        </div>
      </div>

      {/* Thoughts Section */}
      {thoughts && (
        <div className="mt-6">
          <h4 className="text-sm font-bold text-black uppercase mb-3">{thoughtsTitle}</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{thoughts}</p>
        </div>
      )}
    </div>
  );
}
