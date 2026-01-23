interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  category?: string;
}

export default function HeroSection({ title, subtitle, imageUrl, category }: HeroSectionProps) {
  return (
    <div className="relative w-full h-[60vh] min-h-[400px] flex items-end justify-start overflow-hidden rounded-xl mb-12 group">
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800">
        {imageUrl ? (
           // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black">
             <svg className="w-24 h-24 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      
      <div className="relative z-10 p-8 md:p-12 max-w-4xl w-full">
        {category && (
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/30">
            {category}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
