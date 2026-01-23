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
}: FeaturedGridCardProps) {
  return (
    <div className="flex flex-col">
      {/* Image Section with Overlay */}
      <Link href={renderLink(slug, category)} className="block aspect-square overflow-hidden bg-gray-100 relative group">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 grayscale">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
          </div>
        )}
        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <span className="font-serif italic text-3xl md:text-4xl drop-shadow-lg">{title}</span>
            <span className="text-red-500 ml-2 text-xl">&gt;&gt;&gt;</span>
          </div>
        </div>
      </Link>

      {/* Title Section */}
      <div className="border border-gray-200 border-t-0 p-4 bg-white">
        <Link href={slug}>
          <h3 className="text-sm font-medium text-center uppercase tracking-wide hover:opacity-70 transition-opacity">
            {title}
          </h3>
        </Link>
      </div>
    </div>
  );
}
