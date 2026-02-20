import FeaturedArticleCard from "@/components/FeaturedArticleCard";
import RecentArticleCard from "@/components/RecentArticleCard";
import CurrentlyReading from "@/components/CurrentlyReading";
import PaginationControls from "@/components/PaginationControls";
import { getArticlesByCategoryPaginated, getStrapiImageUrl, getCurrentlyReadingBooks } from "@/lib/strapi";

export const dynamic = 'force-dynamic';

interface BooksPageProps {
  searchParams: { page?: string };
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 6;

  const { data: articles, meta } = await getArticlesByCategoryPaginated('Books', currentPage, pageSize);
  
  // Fetch currently reading books from Strapi
  const currentlyReading = await getCurrentlyReadingBooks();
  
  // Debug log
  console.log(' Currently Reading Books:', currentlyReading.length, 'books found');

  // Helper function to extract image URL
  const getImageUrl = (coverImage: any) => {
    if (!coverImage) return undefined;
    return getStrapiImageUrl(coverImage);
  };

  // Get first 3 articles as featured
  const featuredArticles = articles.slice(0, 3);

  return (
    <main className="bg-white min-h-screen">
      {/* Page Title */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="flex items-center justify-center">
          <div className="h-px bg-black flex-1 max-w-[200px]"></div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black px-8">
            BLK BOOKS
          </h1>
          <div className="h-px bg-black flex-1 max-w-[200px]"></div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="flex-1">
            {/* Featured Articles from Strapi */}
            {featuredArticles.length > 0 && (
              <div className="space-y-6 mb-8">
                {featuredArticles.map((article, i) => (
                  <FeaturedArticleCard
                    key={article.id}
                    title={article.articleTitle}
                    excerpt={article.excerpt }
                  />
                ))}
              </div>
            )}

            {/* Newsletter/Search Box */}
            <div className="max-w-xl mb-8">
              <div className="border border-gray-300">
                <input
                  type="text"
                  placeholder=""
                  className="w-full px-4 py-6 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Recent Articles Section */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider italic mb-6">
                RECENT ARTICLES
              </h2>
              <div className="border border-gray-200 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article, i) => (
                    <RecentArticleCard
                      key={article.id}
                      title={article.articleTitle}
                      imageUrl={getImageUrl(article.coverImage)}
                      slug={`/books/${article.slug}`}
                    />
                  ))}
                </div>
              </div>

              {/* Pagination */}
              {meta.pagination.pageCount > 1 && (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={meta.pagination.pageCount}
                  basePath="/books"
                />
              )}
            </div>
          </div>

          {/* Right Sidebar - Currently Reading */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <CurrentlyReading books={currentlyReading} />
          </div>
        </div>
      </div>
    </main>
  );
}