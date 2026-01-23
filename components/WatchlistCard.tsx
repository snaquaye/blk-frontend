import Link from "next/link";

interface WatchlistCardProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  slug?: string;
}

export default function WatchlistCard({ 
  title, 
  subtitle,
  imageUrl, 
  slug = "#"
}: WatchlistCardProps) {
  return (
    <div className="flex flex-col">
      {/* Image Section */}
      <Link href={slug} className="block aspect-square overflow-hidden bg-gray-100 relative group">
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
              <span className="font-serif italic text-2xl text-gray-800">Sisterhood</span>
              <span className="text-red-500 ml-1">&gt;&gt;&gt;</span>
            </div>
          </div>
        )}
      </Link>

      {/* Title Section - Light Blue Background */}
      <div className="bg-sky-300 text-black p-3 text-center">
        <Link href={slug}>
          <h3 className="text-xs font-bold uppercase tracking-wide">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs italic mt-1">{subtitle}</p>
          )}
        </Link>
      </div>
    </div>
  );
}
