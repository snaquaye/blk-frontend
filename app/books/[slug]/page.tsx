import Link from "next/link";
import AuthorBio from "@/components/AuthorBio";
import SocialIcons from "@/components/SocialIcons";
import RecentArticleCard from "@/components/RecentArticleCard";
import TitleSection from "@/components/TitleSection";
import BookReviewContent from "@/components/BookReviewContent";
import BookRecommendationContent from "@/components/BookRecommendationContent";
import BookEssayContent from "@/components/BookEssayContent";
import CurrentlyReading from "@/components/CurrentlyReading";
import { getArticleBySlug, getRelatedPosts, getStrapiImageUrl } from "@/lib/strapi";
import { formatDate } from "@/lib/utils";

// Mock data for currently reading
const currentlyReading = [
  {
    id: 1,
    title: "sisterhood",
    author: "Author Name",
    coverUrl: "http://localhost:1337/uploads/6_4_6c6d0f10b4.png",
    progress: 65,
    slug: "article-1",
  },
];

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';

export default async function BookListingPage({params}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Article not found.</p>
      </main>
    );
  }

  // Get similar articles based on tags
  const tagSlugs = article?.tags?.map(tag => tag.slug) || [];
  const similarArticles = tagSlugs.length > 0 
    ? await getRelatedPosts(slug, tagSlugs, 3)
    : [];

  // Render content based on article type
  const renderContent = () => {
    switch (article.articleType) {
      case "Review Post":
        return <BookReviewContent article={article} />;
      case "Recommendation List":
        return <BookRecommendationContent article={article} />;
      case "Long Post":
        return <BookEssayContent article={article} />;
      default:
        return <BookEssayContent article={article} />;
    }
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section with Thumbnail */}
      <div className="bg-black text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          <p className="text-gray-400 text-sm">(Insert thumbnail collage)</p>
        </div>

        {/* Title Section - Overlaying with white background */}
        <TitleSection 
          title={article.articleTitle}
          description={article.excerpt}
          author={article.author?.name || article.createdBy?.documentId?.toString() || "BLK"}
          date={formatDate(article.publishedAt)}
        />
      </div>

      {/* Spacer for the overlapping title */}
      <div className="h-24"></div>

      {/* Dynamic Content based on Article Type */}
      {renderContent()}

      {/* Social Icons & Logo */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SocialIcons className="mb-8" />
        
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-black tracking-tight font-[family-name:var(--font-black-han-sans)]">
            BLK
          </Link>
        </div>
      </div>

      {/* Author Bio */}
      {article.author && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <AuthorBio
            name={article.author.name}
            bio={article.author.bio || ""}
            imageUrl={article.author.profilePicture ? getStrapiImageUrl(article.author.profilePicture) : undefined}
          />
        </div>
      )}

      {/* Similar Articles Section */}
      {similarArticles.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-sm font-bold uppercase tracking-wider italic mb-6">
            SIMILAR ARTICLES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarArticles.map((similarArticle, i) => (
              <RecentArticleCard
                key={similarArticle.slug || i}
                title={similarArticle.articleTitle}
                slug={`/books/${similarArticle.slug}`}
                imageUrl={
                  similarArticle.coverImage?.[0]?.url
                    ? getStrapiImageUrl(similarArticle.coverImage[0])
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <Link href="/books" className="text-sm text-gray-400 hover:text-black transition-colors">
          BACK
        </Link>
      </div>
    </main>
  );
}
