import WatchlistCard from "@/components/WatchlistCard";
import RecentArticleCard from "@/components/RecentArticleCard";
import FilmTVList from "@/components/FilmTVList";
import {
  getArticlesByCategoryPaginated,
  getRecentArticles,
  getStrapiImageUrl,
  getWatchlistItems,
} from "@/lib/strapi";
import { Category } from "@/lib/types";

const CATEGORY: Category = "Film + TV" as Category;
const PAGE_SIZE = 6;

export const dynamic = 'force-dynamic';

interface FilmTVPageProps {
  searchParams: { page?: string };
}

export default async function FilmTVPage({ searchParams }: FilmTVPageProps) {
  const currentPage = Number(searchParams.page) || 1;

  // Fetch all data
  const [watchlist, { data: articles, meta }, recent] = await Promise.all([
    getWatchlistItems(),
    getArticlesByCategoryPaginated(CATEGORY, currentPage, PAGE_SIZE),
    getRecentArticles(3),
  ]);

  // Helper function to extract image URL
  const getImageUrl = (coverImage: any) => {
    if (!coverImage) return undefined;
    return getStrapiImageUrl(coverImage);
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - BLK Watchlist */}
          {watchlist.length > 0 && (
            <aside className="w-full lg:w-1/4">
              <h2 className="text-sm font-bold uppercase tracking-wider italic mb-6">
                BLK WATCHLIST
              </h2>
              <div className="flex flex-col gap-6">
                {watchlist.map((article, i) => (
                  <WatchlistCard
                    key={i}
                    slug={article.slug}
                    title={article.articleTitle}
                    imageUrl={getImageUrl(article.coverImage)}
                  />
                ))}
              </div>
            </aside>
          )}

          {/* Main Content with Load More */}
          <FilmTVList
            mainArticles={articles}
            category={CATEGORY}
            initialPage={currentPage}
            pageSize={PAGE_SIZE}
            totalPages={meta.pagination.pageCount}
          />
        </div>
      </div>

      {/* Recent Articles Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-sm font-bold uppercase tracking-wider italic mb-6">
          RECENT ARTICLES
        </h2>
        <div className="border border-gray-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recent.map((article, i) => (
              <RecentArticleCard
                key={article.slug || i}
                title={article.articleTitle}
                slug={`/film-tv/${article.slug}`}
                imageUrl={getImageUrl(article.coverImage)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
