import Link from "next/link";
import NoContent from "./NoContent";
import NoImage from "./NoImage";

interface MainArticleCardProps {
  title: string;
  imageUrl?: string;
  slug?: string;
  overlayText?: string;
}

export default function MainArticleCard({ 
  title, 
  imageUrl, 
  slug = "#",
}: MainArticleCardProps) {
  return (
    <div className="flex flex-col">
      {/* Image Section with Overlay */}
      <Link href={`/film-tv/${slug}`} className="block aspect-[4/3] overflow-hidden bg-gray-100 relative group">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <NoImage message={title} />
        )}
        {/* Torn paper effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent"></div>
      </Link>

      {/* Title Section */}
      <div className="border border-gray-200 border-t-0 p-3 bg-white">
        <Link href={slug}>
          <h3 className="text-xs font-bold text-center uppercase tracking-wide hover:opacity-70 transition-opacity leading-tight">
            {title}
          </h3>
        </Link>
      </div>
    </div>
  );
}
