import Link from "next/link";
import AuthorBio from "@/components/AuthorBio";
import SocialIcons from "@/components/SocialIcons";
import RecentArticleCard from "@/components/RecentArticleCard";
import TitleSection from "@/components/TitleSection";

export default function BookReviewPage() {
  const review = {
    title: "REVIEW: OPEN WATER",
    description: "Short article discription.Lorem ipsum dolor sit amet, consectetur",
    author: "Jess Writes",
    authorAvatar: "",
    date: "12 Nov 2024",
    tags: ["Tags", "Comedy"],
  };

  const book = {
    title: "OPEN WATER",
    author: "CALEB AZUMAH NELSON",
    rating: 4.5,
    maxRating: 5,
    genre: "DRAMA",
    coverImage: "",
    blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. in reprehenderit in voluptate velit esse cillum",
  };

  const literaryTropes = ["CHOSEN ONE", "GOOD VS EVIL", "AFRO CARIBBEAN", "CHOSEN ONE"];

  const initialReaction = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

  const finalReview = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

  const similarArticles = [
    { title: "INSERT TITLE" },
    { title: "INSERT TITLE" },
    { title: "INSERT TITLE" },
  ];

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section with Thumbnail */}
      <div className="bg-black text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <p className="text-gray-400 text-sm">(Insert thumbnail collage)</p>
        </div>

        {/* Title Section - Overlaying with white background */}
        <TitleSection 
          title={review.title}
          description={review.description}
          author={review.author}
          date={review.date}
        />
      </div>

      {/* Spacer for the overlapping title */}
      <div className="h-28"></div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tags */}
        <div className="mb-8">
          {review.tags.map((tag, i) => (
            <span key={i} className="text-xs text-gray-600">
              {tag}{i < review.tags.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>

        {/* Book Info Card */}
        <div className="border border-gray-200 p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Book Cover */}
            <div className="w-full md:w-48 flex-shrink-0">
              {book.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={book.coverImage} alt={book.title} className="w-full h-auto" />
              ) : (
                <div className="w-full aspect-[2/3] bg-gradient-to-b from-teal-600 to-teal-800 flex flex-col justify-between p-4 text-white">
                  <div>
                    <p className="text-xs uppercase tracking-wider">{book.author}</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold leading-tight">OPEN</p>
                    <p className="text-4xl font-bold leading-tight">WATER</p>
                  </div>
                </div>
              )}
            </div>

            {/* Book Details */}
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">{book.title}</h2>
              <ul className="text-sm text-gray-700 mb-4 space-y-1">
                <li>· {book.rating}/{book.maxRating}</li>
                <li>· {book.genre}</li>
              </ul>

              {/* Buttons */}
              <div className="flex gap-3 mb-6">
                <Link
                  href="#"
                  className="px-6 py-2 border border-black text-xs font-medium hover:bg-black hover:text-white transition-colors"
                >
                  AMAZON
                </Link>
                <Link
                  href="#"
                  className="px-6 py-2 bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors"
                >
                  WATERSTONE
                </Link>
              </div>

              {/* Blurb */}
              <div>
                <h3 className="text-sm font-bold mb-2">Blurb:</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{book.blurb}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Literary Tropes */}
        <div className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4">LITERARY TROPES</h3>
          <div className="flex flex-wrap gap-6 text-xs text-gray-500 uppercase tracking-wider border-t border-b border-gray-200 py-3">
            {literaryTropes.map((trope, i) => (
              <span key={i} className="hover:text-black cursor-pointer">{trope}</span>
            ))}
          </div>
        </div>

        {/* Initial Reaction */}
        <div className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4">INITIAL REACTION :</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{initialReaction}</p>
        </div>

        {/* Final Review */}
        <div className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4">FINAL REVIEW</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{finalReview}</p>
        </div>
      </div>

      {/* Logo */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <Link href="/" className="inline-block">
          <div className="text-xs font-bold tracking-widest">EVERYTHING</div>
          <div className="text-4xl font-black tracking-tight font-[family-name:var(--font-black-han-sans)]">BLK</div>
        </Link>
      </div>

      {/* Social Icons */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <SocialIcons />
      </div>

      {/* Author Bio */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <AuthorBio
          name="Authors blurb is a blah blah blah..."
          bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        />
      </div>

      {/* Similar Articles Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-sm font-bold uppercase tracking-wider italic mb-6">
          SIMILAR ARTICLES
        </h2>
        <div className="border border-gray-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarArticles.map((article, i) => (
              <RecentArticleCard
                key={i}
                title={article.title}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <Link href="/books" className="text-sm text-gray-400 hover:text-black transition-colors">
          BACK
        </Link>
      </div>
    </main>
  );
}
