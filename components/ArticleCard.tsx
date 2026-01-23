import Link from "next/link";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  imageUrl?: string;
  slug?: string;
  date?: string;
}

export default function ArticleCard({ title, excerpt, category, imageUrl, slug = "#", date }: ArticleCardProps) {
  return (
    <div className="group flex flex-col h-full overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
      <Link href={slug} className="block relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </Link>
      <div className="flex-1 flex flex-col pt-4 pb-2">
        <div className="flex items-center space-x-2 mb-2">
           <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {category}
          </span>
          {date && (
            <>
              <span className="text-gray-300 dark:text-gray-700">&bull;</span>
              <span className="text-xs text-gray-500">{date}</span>
            </>
          )}
        </div>
        <Link href={slug}>
          <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 flex-1">
          {excerpt}
        </p>
      </div>
    </div>
  );
}
