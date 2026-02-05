import RecentArticleCard from "@/components/RecentArticleCard";
import PageTitle from "@/components/PageTitle";
import BooksList from "@/components/BooksList";
import {
  getArticlesByCategoryPaginated,
  getRecentArticles,
  getStrapiImageUrl,
} from "@/lib/strapi";
import { Category } from "@/lib/types";

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';

const CATEGORY: Category = "Books" as Category;
const PAGE_SIZE = 3;

export default async function BooksPage() {
  const [{ data: bookArticles, meta }, recentArticles] = await Promise.all([
    getArticlesByCategoryPaginated(CATEGORY, 1, PAGE_SIZE),
    getRecentArticles(3),
  ]);

  return (
    <main className="bg-white min-h-screen">
      <PageTitle title="BLK BOOKS" />

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BooksList
          articles={bookArticles}
          category={CATEGORY}
          initialPage={1}
          pageSize={PAGE_SIZE}
          totalPages={meta.pagination.pageCount}
        />
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
                slug={`/books/${article.slug}`}
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
