import Link from "next/link";
import Image from "next/image";
import { AvailableOn } from "@/lib/types";

interface ReviewHeroProps {
  imageUrl?: string;
  imageAlt?: string;
  rating?: string;
  genre?: string;
  availableOn: AvailableOn[];
  trailerLink?: string;
  reviewType?: "Book" | "Film  + TV";
}

export default function FilmTVReviewHero({
  imageUrl,
  imageAlt = "Review image",
  rating,
  genre,
  availableOn,
  trailerLink,
}: ReviewHeroProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
      {/* Image */}
      <div className="w-full md:w-1/2 lg:w-2/5">
        <div className="aspect-4/3 bg-gray-200 overflow-hidden relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white text-black">
              No image
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="flex-1">
        <ul className="space-y-2 text-sm">
          {/* Rating */}
          {rating && (
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span className="font-bold">{rating}</span>
            </li>
          )}

          {/* Genre */}
          {genre && (
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span className="uppercase tracking-wide">{genre}</span>
            </li>
          )}

          {/* Watch/Buy On */}
          {availableOn?.length > 0 && (
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <div>
                <span className="font-bold">{"WATCH ON:"}</span>
                <br />
                <div className="flex flex-wrap gap-x-2 text-gray-600">
                  {availableOn.map((link, i) => (
                    <span key={i}>
                      <Link
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-black transition-colors"
                      >
                        {link.plateform?.name}
                      </Link>
                      {i < availableOn.length - 1 && <span className="mx-1">|</span>}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          )}
        </ul>

        {/* Trailer Button */}
        {trailerLink && (
          <div className="mt-6">
            <Link
              href={trailerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-black px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              Trailer
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
