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
      <Link href={url} className="block aspect-[4/3] overflow-hidden bg-gray-100 relative group">
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
      </Link>

      {/* Title Section */}
      <div className="border border-gray-200 border-t-0 p-4 bg-white">
        <Link href={url}>
          <h3 className="text-sm font-medium text-center uppercase tracking-wide hover:opacity-70 transition-opacity">
            {title}
          </h3>
        </Link>
      </div>
    </div>
  );
}
