import FeaturedGridCard from "@/components/FeaturedGridCard";
import ExploreCard from "@/components/ExploreCard";
import {
  getFeaturedArticlesPaginated,
  getHomepage,
  getArticlesByCategory,
  getArticleImageUrl,
} from "@/lib/strapi";
import NoContent from "@/components/NoContent";
import { Category } from "@/lib/types";
import PaginationControls from "@/components/PaginationControls";

// Force dynamic rendering
export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const pageSize = 4;

  // Fetch featured articles with pagination
  const { data: featuredArticles, meta } = await getFeaturedArticlesPaginated(
    currentPage,
    pageSize,
  );

  // Fetch homepage data
  const homepage = await getHomepage();

  // Fetch articles for each category
  const categoriesWithArticles = await Promise.all(
    ["Film + TV", "Books", "Culture"].map(async (slug) => {
      const articles = await getArticlesByCategory(slug as Category, 3);
      return {
        name: slug.replace("-", "+").toUpperCase(),
        articles,
      };
    }),
  );

  // Helper function to get image URL - checks both coverImage and coverImageUrl
  const getImageUrl = (article: any) => {
    return getArticleImageUrl(article);
  };

  const getAltText = (article: any) => {
    if (!article) return "";
    // Check coverImage first
    if (article.coverImage) {
      const coverImage = Array.isArray(article.coverImage)
        ? article.coverImage[0]
        : article.coverImage;
      if (coverImage?.alternativeText) return coverImage.alternativeText;
    }
    // Check coverImageUrl
    if (article.coverImageUrl) {
      return article.articleTitle || "";
    }
    return "";
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Blog Description */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "24px",
          paddingBottom: "24px",
        }}
      >
        <p
          style={{
            fontFamily: "Montserrat",
            fontWeight: 300,
            fontStyle: "normal",
            fontSize: "16px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          {homepage?.description || "one sentence blog description"}
        </p>
      </div>

      {/* Featured 2x2 Grid */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border border-gray-200">
        {featuredArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredArticles.map((article: any) => {
                const coverImageUrl = getImageUrl(article);
                const altText = getAltText(article);

                return (
                  <FeaturedGridCard
                    key={article.id}
                    category={article.category}
                    title={article.articleTitle}
                    slug={article.slug}
                    imageUrl={coverImageUrl}
                    overlayText={altText || article.articleTitle}
                  />
                );
              })}
            </div>

            {/* Pagination */}
            {meta.pagination.pageCount > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={meta.pagination.pageCount}
                basePath="/"
              />
            )}
          </>
        ) : (
          <NoContent message="No featured articles available." />
        )}
      </div>

      {/* Explore Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border border-gray-200">
        <h2 className="text-sm font-bold uppercase tracking-wider mb-8">
          EXPLORE
        </h2>

        {categoriesWithArticles.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-600 mb-4">
              {category.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.articles.length > 0 ? (
                category.articles.map((article: any) => {
                  const coverImageUrl = getImageUrl(article);

                  return (
                    <ExploreCard
                      key={article.id}
                      title={article.articleTitle}
                      url={`/${category.name.toLowerCase().replace(" + ", "-")}/${article.slug}`}
                      imageUrl={coverImageUrl}
                    />
                  );
                })
              ) : (
                <NoContent
                  message={`No articles available in ${category.name}.`}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
