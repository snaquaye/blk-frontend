import { CategoryType, renderLink } from "@/lib/utils";
import Link from "next/link";

interface FeaturedGridCardProps {
  title: string;
  imageUrl?: string;
  slug?: string;
  overlayText?: string;
  category?: string;
}

export default function FeaturedGridCard({
  title,
  imageUrl,
  category = "Books",
  slug = "#",
  overlayText,
}: FeaturedGridCardProps) {
  const displayOverlay = overlayText || title;

  return (
    <div className="relative mb-8">
      {/* Image Section with Overlay */}
      <Link href={renderLink(slug, category)} className="block aspect-square bg-gray-300 relative group overflow-hidden border border-gray-200">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
          </div>
        )}
        
        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-white text-center">
            <span className="font-serif italic text-3xl md:text-4xl drop-shadow-lg">
              {displayOverlay}
            </span>
            <span className="text-red-500 ml-2 text-xl">{'>'}{'>'}{'>'}</span>
          </div>
        </div>
      </Link>

      {/* Title Box - Overlapping bottom of image */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 bg-white border border-gray-200 px-4 py-3 z-10">
        <h3 className="text-xs font-bold text-center uppercase tracking-wide">
          {title}
        </h3>
      </div>
    </div>
  );
}