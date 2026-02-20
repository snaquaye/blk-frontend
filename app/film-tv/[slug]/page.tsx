import Link from "next/link";
import FilmRecommendationItem from "@/components/FilmRecommendationItem";
import AuthorBio from "@/components/AuthorBio";
import SocialIcons from "@/components/SocialIcons";
import RecentArticleCard from "@/components/RecentArticleCard";
import TitleSection from "@/components/TitleSection";
import FilmTVReviewHero from "@/components/FilmTVReviewHero";
import { getArticleBySlug, getRelatedPosts, getStrapiImageUrl } from "@/lib/strapi";
import Image from "next/image";
import BlockRendererClient from "@/components/BlockRendererClient";

// Force dynamic rendering - don't pre-render at build time
export const dynamic = 'force-dynamic';

export default async function FilmTVListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = await getArticleBySlug((await params).slug);
  const tagSlugs = article?.tags.map((tag) => tag.slug) || [];
  const relatedArticles = await getRelatedPosts(article?.slug || "", tagSlugs);

  if (!article) {
    return (
      <main className="bg-white min-h-screen">
        <p>Article not found.</p>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section with Thumbnail */}
      <div className="bg-black text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          {getStrapiImageUrl(article.coverImage?.[0]) ? (
            <Image
              alt={article.articleTitle}
              src={getStrapiImageUrl(article.coverImage?.[0])!}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto mx-auto mb-6 object-cover shadow-lg"
            />
          ) : (
            <div className="w-full aspect-video mx-auto mb-6 bg-black flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white px-8 text-center">
                {article.articleTitle}
              </h2>
            </div>
          )}
        </div>

        {/* Title Section - Overlaying with white background */}
        <TitleSection
          title={article.articleType}
          description={article.description}
          author={article.author?.name}
          date={new Date(article.createdAt).toDateString()}
        />
      </div>

      {/* Spacer for the overlapping title */}
      <div className="h-24"></div>

      {/* Tags */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2">
          {article.tags.map((tag, i) => (
            <span key={i} className="text-sm text-gray-600">
              {tag.name}
              {i < article.tags.length - 1 ? "," : ""}
            </span>
          ))}
        </div>
      </div>

      {/* show essay */}
      {article.articleType === "Long Post" && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="prose prose-lg max-w-none text-gray-800">
            <BlockRendererClient content={article.content} />
          </div>
        </div>
      )}
      {/* Create slug for culture  */}

      {/* Show recommendations */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {article.articleType === "Recommendation List" &&
          article.recommendationList.length &&
          article.recommendationList.map((show, index) => (
            <FilmRecommendationItem
              key={show.id}
              number={index + 1}
              title={show.title}
              content={show.content}
              imageUrl={getStrapiImageUrl(show.image)}
              trailerLink={show.trailerLink}
              genre={show.genre}
              rating={show.rating}
              availableOn={show.availableOn}
            />
          ))}
      </div>

      {/* show reviews */}
      {article.articleType === "Review Post" && article.review && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Review Hero Card */}
          <div className="py-8">
            <FilmTVReviewHero
              imageUrl={getStrapiImageUrl(article.coverImage?.[0])}
              imageAlt={article.coverImage?.[0]?.alternativeText || article.review.title}
              rating={article.review.rating}
              genre={article.review.genre}
              reviewType={article.review.reviewType}
              availableOn={article.availableOn}
            />
          </div>

          {/* Blurb */}
          {article.review.blurb && (
            <div className="py-6 border-gray-200">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Blurb</h3>
              <p className="text-lg text-gray-700 italic">{article.review.blurb}</p>
            </div>
          )}

          {/* Literary Tropes */}
          {article.review.literaryTropes && article.review.literaryTropes.length > 0 && (
            <div className="py-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Literary Tropes</h3>
              <div className="flex flex-wrap gap-2">
                {article.review.literaryTropes.map((trope, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {trope.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Initial Reaction */}
          {article.review.initialReaction && (
            <div className="py-8">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Initial Reaction</h3>
              <p className="text-gray-700 leading-relaxed">{article.review.initialReaction}</p>
            </div>
          )}

          {/* Final Review */}
          {article.review.finalReview && (
            <div className="py-8">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Final Thoughts</h3>
              <p className="text-gray-700 leading-relaxed">{article.review.finalReview}</p>
            </div>
          )}
        </div>
      )}

      {/* Social Icons & Logo */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SocialIcons className="mb-8" />

        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-3xl font-black tracking-tight font-[family-name:var(--font-black-han-sans)]"
          >
            BLK
          </Link>
        </div>
      </div>

      {/* Author Bio */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <AuthorBio
          imageUrl={getStrapiImageUrl(article.author.profilePicture)}
          name={article.author.name}
          bio={article.author.bio}
        />
      </div>

      {/* Similar Articles Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-sm font-bold uppercase tracking-wider italic mb-6">
          SIMILAR ARTICLES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((article, i) => (
            <RecentArticleCard
              key={i}
              title={article.articleTitle}
              slug={article.slug}
              imageUrl={article.coverImage?.[0]?.url || ""}
            /> 
          ))}
        </div>
      </div>
    </main>
  );
}
