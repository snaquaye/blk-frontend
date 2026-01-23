import FeaturedArticleCard from "@/components/FeaturedArticleCard";
import RecentArticleCard from "@/components/RecentArticleCard";
import PageTitle from "@/components/PageTitle";

export default function CulturePage() {
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

  const recentArticles = [
    { title: "INSERT TITLE" },
    { title: "INSERT TITLE" },
    { title: "INSERT TITLE" },
  ];

  const paginationDots = [1, 2, 3, 4, 5, 6, 7];

  return (
    <main className="bg-white min-h-screen">
      <PageTitle title="BLK CULTURE" />

      {/* Featured Articles */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      {/* Pagination Dots */}
      <div className="flex justify-center py-8">
        <div className="flex space-x-2">
          {paginationDots.map((dot) => (
            <button
              key={dot}
              className="w-4 h-4 bg-black hover:bg-gray-600 transition-colors"
              aria-label={`Page ${dot}`}
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

      {/* Recent Articles Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-sm font-bold uppercase tracking-wider italic mb-6">
          RECENT ARTICLES
        </h2>
        <div className="border border-gray-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentArticles.map((article, i) => (
              <RecentArticleCard 
                key={i}
                title={article.title}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
