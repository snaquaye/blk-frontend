import WatchlistCard from "@/components/WatchlistCard";
import RecentArticleCard from "@/components/RecentArticleCard";
import {
  getArticlesByCategoryPaginated,
  getRecentArticles,
  getStrapiImageUrl,
  getWatchlistItems,
} from "@/lib/strapi";
import { Category } from "@/lib/types";
import FilmTVList from "@/components/FilmTVList";

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';

const CATEGORY: Category = "Film + TV" as Category;
const PAGE_SIZE = 6;

export default async function FilmTVPage() {
  const [watchlistItems, { data: mainArticles, meta }, recentArticles] = await Promise.all([
    getWatchlistItems(),
    getArticlesByCategoryPaginated(CATEGORY, 1, PAGE_SIZE),
    getRecentArticles(3),
  ]);

  return (
    <main className="bg-white min-h-screen">
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - BLK Watchlist */}
          {watchlistItems.length > 0 && (
            <aside className="w-full lg:w-1/4">
              <h2 className="text-sm font-bold uppercase tracking-wider italic mb-6">
                BLK WATCHLIST
              </h2>
              <div className="flex flex-col gap-6">
                {watchlistItems.map((article, i) => (
                  <WatchlistCard
                    key={i}
                    slug={article.slug}
                    title={article.articleTitle}
                    imageUrl={
                      article.coverImage?.[0]?.ImageSrc?.[0]
                        ? getStrapiImageUrl(article.coverImage[0].ImageSrc[0])
                        : undefined
                    }
                  />
                ))}
              </div>
            </aside>
          )}

          {/* Main Content */}
          <FilmTVList 
            mainArticles={mainArticles} 
            category={CATEGORY}
            initialPage={1}
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
            {recentArticles.map((article, i) => (
              <RecentArticleCard
                key={article.slug || i}
                title={article.articleTitle}
                slug={`/film-tv/article/${article.slug}`}
                imageUrl={
                  article.coverImage?.[0]?.ImageSrc?.[0]
                    ? getStrapiImageUrl(article.coverImage[0].ImageSrc[0])
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
