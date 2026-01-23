import Link from "next/link";

interface RecentArticleCardProps {
  title: string;
  imageUrl?: string;
  slug?: string;
}

export default function RecentArticleCard({ 
  title, 
  imageUrl, 
  slug = "#" 
}: RecentArticleCardProps) {
  return (
    <div className="flex flex-col border border-gray-200 bg-white">
      {/* Image Section */}
      <Link href={slug} className="block aspect-[4/3] overflow-hidden bg-gray-100">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white text-black">
              No image
          </div>
        )}
      </Link>

      {/* Title Section */}
      <div className="p-4 border-t border-gray-200">
        <Link href={slug}>
          <h3 className="text-sm font-medium text-center uppercase tracking-wide hover:opacity-70 transition-opacity">
            {title}
          </h3>
        </Link>
      </div>
    </div>
  );
}
