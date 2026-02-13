import FeaturedGridCard from "@/components/FeaturedGridCard";
import ExploreCard from "@/components/ExploreCard";
import { getFeaturedArticles, getHomepage, getArticlesByCategory, getStrapiImageUrl } from "@/lib/strapi";
import NoContent from "@/components/NoContent";
import { Category } from "@/lib/types";

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch featured articles (IsFeaturedPost = true, latest 4)
  const featuredArticles = await getFeaturedArticles(4);
  
  // Fetch homepage data
  const homepage = await getHomepage();

  // Fetch articles for each category
  const categoriesWithArticles = await Promise.all(
    ['Film + TV', 'Books', 'Culture'].map(async (slug) => {
      const articles = await getArticlesByCategory(slug as Category, 3);
      return {
        name: slug.replace('-', '+').toUpperCase(),
        articles,
      };
    })
  );

  // Helper function to extract image URL - coverImage is an object, not array
  const getImageUrl = (coverImage: any) => {
    if (!coverImage) return undefined;
    return getStrapiImageUrl(coverImage);
  };

  const getAltText = (coverImage: any) => {
    if (!coverImage) return '';
    return coverImage?.alternativeText || '';
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Blog Description */}
      <div className="text-center py-6">
        <p className="text-sm text-gray-500 italic">
          {homepage?.description || 'one sentence blog description'}
        </p>
      </div>

      {/* Featured 2x2 Grid */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border border-gray-200">
        {featuredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredArticles.map((article: any) => {
                const coverImageUrl = getImageUrl(article.coverImage);
                const altText = getAltText(article.coverImage);

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
                  const coverImageUrl = getImageUrl(article.coverImage);

                  return (
                    <ExploreCard
                      key={article.id}
                      title={article.articleTitle}
                      url={`/${category.name.toLowerCase().replace(' + ', '-')}/${article.slug}`}
                      imageUrl={coverImageUrl}
                    />
                  );
                })
              ) : (
                <NoContent message={`No articles available in ${category.name}.`} />
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}