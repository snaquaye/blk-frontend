import Link from "next/link";
import TextLink from "@/components/TextLink";

interface BookListingItemProps {
  number: number;
  title: string;
  author?: string;
  rating: number;
  genre: string;
  blurb: string;
  thoughts?: string;
  thoughtsTitle?: string;
  imageUrl?: string;
  amazonUrl?: string;
  waterstonesUrl?: string;
}

export default function BookListingItem({
  number,
  title,
  author,
  rating,
  genre,
  blurb,
  thoughts,
  thoughtsTitle = "MY THOUGHTS",
  imageUrl,
  amazonUrl = "#",
  waterstonesUrl = "#",
}: BookListingItemProps) {
  return (
    <div className="py-8 border-b border-gray-200">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Number and Book Cover */}
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
              <div className="w-full aspect-[2/3] bg-gradient-to-b from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-center p-4">
                {title}
              </div>
            )}
          </div>
        </div>

        {/* Book Details */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-black uppercase mb-2">{title}</h3>
          {author && (
            <p className="text-sm text-gray-600 mb-1">{author}</p>
          )}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">• {rating}/5</span>
          </div>
          <p className="text-sm text-gray-600 uppercase tracking-wider mb-4">{genre}</p>

          {/* Buy Buttons */}
          <div className="flex gap-3 mb-6">
            <Link
              href={amazonUrl}
              className="px-4 py-2 border border-black text-xs font-medium uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              Amazon
            </Link>
            <Link
              href={waterstonesUrl}
              className="px-4 py-2 border border-black text-xs font-medium uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              Waterstones
            </Link>
          </div>

          {/* Blurb */}
          <div className="mb-4">
            <h4 className="text-sm font-bold text-black mb-2">Blurb:</h4>
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
