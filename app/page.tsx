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

  return (
    <main className="bg-white min-h-screen">
      {/* Blog Description */}
      <div className="text-center py-6">
        <p className="text-sm text-gray-500 italic">
          {homepage?.description || 'one sentence blog description'}
        </p>
      </div>

      {/* Featured 2x2 Grid */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {featuredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => (
                  <FeaturedGridCard 
                    key={article.id}
                    category={article.category}
                    title={article.articleTitle}
                    slug={article.slug}
                    imageUrl={
                      article.coverImage?.[0]?.ImageSrc?.[0]
                        ? getStrapiImageUrl(article.coverImage[0].ImageSrc[0])
                        : undefined
                    }
                    overlayText={article.coverImage?.[0]?.AlternateText?.toString() || 'Featured'}
                  />
                ))}
            </div>
          ) : (
            // Fallback placeholder cards
            <NoContent message="No featured articles available." />
          )}
      </div>

      {/* Load More Button */}
      {/* <div className="flex justify-center py-6">
        <button className="px-8 py-2 border border-black text-xs text-black font-medium uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
          Load More
        </button>
      </div> */}

      {/* Explore Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                category.articles.map((article) => (
                  <ExploreCard 
                    key={article.id}
                    title={article.articleTitle}
                    url={`/${category.name.toLowerCase().replace(' + ', '-')}/${article.slug}`}
                    imageUrl={
                      article.coverImage?.[0]?.ImageSrc?.[0]
                        ? getStrapiImageUrl(article.coverImage[0].ImageSrc[0])
                        : undefined
                    }
                  />
                ))
              ) : (
                // Fallback placeholder cards
                <NoContent message={`No articles available in ${category.name}.`} />
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}