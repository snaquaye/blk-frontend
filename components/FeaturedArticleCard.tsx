import Link from "next/link";
import TextLink from "@/components/TextLink";

interface FeaturedArticleCardProps {
  title: string;
  excerpt: string;
  imageUrl?: string;
  slug?: string;
}

export default function FeaturedArticleCard({ 
  title, 
  excerpt, 
  imageUrl, 
  slug = "#" 
}: FeaturedArticleCardProps) {
  return (
    <div className="flex flex-col md:flex-row border border-gray-200 bg-white">
      {/* Image Section */}
      <Link href={slug} className="block md:w-[280px] flex-shrink-0 aspect-[4/3] md:aspect-auto overflow-hidden bg-gray-100">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover grayscale"
          />
        ) : (
          <div className="w-full h-full min-h-[180px] flex items-center justify-center bg-gray-800 text-white">
            <div className="text-center p-4">
              <span className="font-serif italic text-2xl">Sitcoms</span>
              <span className="text-red-500 ml-2">&gt;&gt;&gt;</span>
            </div>
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <Link href={slug}>
            <h3 className="text-lg font-bold uppercase tracking-wide mb-3 hover:opacity-70 transition-opacity">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 leading-relaxed">
            {excerpt}
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <TextLink href={slug} variant="button">
            Read More
          </TextLink>
        </div>
      </div>
    </div>
  );
}
