import Link from "next/link";

interface ExploreCardProps {
  title: string;
  imageUrl?: string;
  url?: string;
}

export default function ExploreCard({ 
  title, 
  imageUrl, 
  url = "#"
}: ExploreCardProps) {
  return (
    <div className="flex flex-col">
      {/* Image Section */}
      <Link href={url} className="block aspect-[4/3] bg-gray-100 relative group">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-200 via-teal-100 to-green-200">
            <div className="text-center">
              <span className="font-serif italic text-xl text-gray-800">{title}</span>
            </div>
          </div>
        )}
        {/* Title Section - Overlapping */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border border-gray-200 border-l-0 border-r-0 border-b-0 p-2 transform translate-y-1/2">
          <h3 className="text-xs font-medium text-center uppercase tracking-wide hover:opacity-70 transition-opacity">
            {title}
          </h3>
        </div>
      </Link>
    </div>
  );
}
