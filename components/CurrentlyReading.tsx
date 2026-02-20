import Link from 'next/link';

interface Book {
  id: number;
  title: string;
  author?: string;
  coverUrl?: string;
  slug: string;
}

interface CurrentlyReadingProps {
  books: Book[];
}

export default function CurrentlyReading({ books }: CurrentlyReadingProps) {
  if (books.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 p-6">
      <h2 className="text-xs font-bold uppercase tracking-wider mb-6">
        CURRENTLY READING..
      </h2>
      <div className="flex flex-col gap-6">
        {books.map((book) => (
          <Link
            key={book.id}
            href={`/books/${book.slug}`}
            className="group text-center"
          >
            <div className="relative aspect-[2/3] w-full max-w-[120px] mx-auto overflow-hidden bg-gray-100 mb-3">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-xs text-gray-400">No Cover</span>
                </div>
              )}
            </div>
            
            <h3 className="text-xs font-bold mb-1 group-hover:opacity-70 transition-opacity">
              {book.title}
            </h3>
            
            {book.author && (
              <p className="text-xs text-gray-600">
                by {book.author}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}