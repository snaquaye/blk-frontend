import FeaturedArticleCard from "@/components/FeaturedArticleCard";
import PageTitle from "@/components/PageTitle";
import BooksList from "@/components/BooksList";
import { getArticlesByCategoryPaginated } from "@/lib/strapi";
import { Category } from "@/lib/types";

export const dynamic = 'force-dynamic';

interface BooksPageProps {
  searchParams: { page?: string };
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 6;
  const category: Category = "Books";

  const { data: articles, meta } = await getArticlesByCategoryPaginated(category, currentPage, pageSize);

  const featuredArticles = [
    {
      title: "THE RISE OF ...",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum..."
    },
    {
      title: "THE RISE OF ...",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum..."
    },
    {
      title: "THE RISE OF ...",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum..."
    },
  ];

  return (
    <main className="bg-white min-h-screen">
      <PageTitle title="BLK BOOKS" />

      {/* Featured Articles */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border border-gray-200">
        <div className="space-y-6">
          {featuredArticles.map((article, i) => (
            <FeaturedArticleCard
              key={i}
              title={article.title}
              excerpt={article.excerpt}
            />
          ))}
        </div>
      </div>

      {/* Newsletter/Search Box */}
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="border border-gray-300">
          <input
            type="text"
            placeholder=""
            className="w-full px-4 py-6 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Recent Articles Section with Load More */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-sm font-bold uppercase tracking-wider italic mb-6">
          RECENT ARTICLES
        </h2>
        <div className="border border-gray-200 p-8">
          <BooksList
            articles={articles}
            category={category}
            initialPage={currentPage}
            pageSize={pageSize}
            totalPages={meta.pagination.pageCount}
          />
        </div>
      </div>
    </main>
  );
}
