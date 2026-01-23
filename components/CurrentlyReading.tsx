import Link from "next/link";

interface CurrentlyReadingProps {
  title: string;
  author: string;
  imageUrl?: string;
  slug?: string;
}

export default function CurrentlyReading({ 
  title, 
  author,
  imageUrl, 
  slug = "#"
}: CurrentlyReadingProps) {
  return (
    <div className="text-right">
      <h3 className="text-sm font-bold uppercase tracking-wider mb-4">
        CURRENTLY READING..
      </h3>
      
      <Link href={slug} className="block">
        {/* Book Cover */}
        <div className="inline-block w-32 aspect-[2/3] overflow-hidden shadow-lg mb-3">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-orange-200 to-orange-400 flex flex-col items-center justify-center p-2">
              <div className="text-xs text-gray-700 mb-1">Chimamanda</div>
              <div className="text-xs text-gray-700 mb-2">Ngozi Adichie</div>
              <div className="text-center">
                <span className="text-lg font-bold text-red-600 uppercase leading-tight block">DREAM</span>
                <span className="text-lg font-bold text-red-600 uppercase leading-tight block">COUNT</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl">🔥</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Book Info */}
        <div>
          <h4 className="text-sm font-bold">{title}</h4>
          <p className="text-xs text-gray-600 italic">By: {author}</p>
        </div>
      </Link>
    </div>
  );
}
