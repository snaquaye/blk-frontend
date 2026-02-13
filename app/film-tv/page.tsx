'use client';

import { useState, useEffect } from 'react';
import WatchlistCard from "@/components/WatchlistCard";
import RecentArticleCard from "@/components/RecentArticleCard";
import MainArticleCard from "@/components/MainArticleCard";
import {
  getArticlesByCategoryPaginated,
  getRecentArticles,
  getStrapiImageUrl,
  getWatchlistItems,
} from "@/lib/strapi";
import { Category, Article } from "@/lib/types";

const CATEGORY: Category = "Film + TV" as Category;
const PAGE_SIZE = 6;

const PaginationDots = ({ totalPages, currentPage, onPageChange }: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex justify-center items-center gap-2 py-6">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-6 h-6 flex items-center justify-center text-xs font-medium transition-colors
            ${currentPage === page
              ? 'bg-black text-white'
              : 'bg-white text-black border border-black hover:bg-gray-100'
            }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default function FilmTVPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [watchlistItems, setWatchlistItems] = useState<Article[]>([]);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [watchlist, { data: mainArticles, meta }, recent] = await Promise.all([
          getWatchlistItems(),
          getArticlesByCategoryPaginated(CATEGORY, currentPage, PAGE_SIZE),
          getRecentArticles(3),
        ]);
        setWatchlistItems(watchlist);
        setArticles(mainArticles);
        setTotalPages(meta.pagination.pageCount);
        setRecentArticles(recent);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  // Helper function to extract image URL - coverImage is an object, not array
  const getImageUrl = (coverImage: any) => {
    if (!coverImage) return undefined;
    return getStrapiImageUrl(coverImage);
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border border-gray-200">
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
                    imageUrl={getImageUrl(article.coverImage)}
                  />
                ))}
              </div>
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Page Title */}
            <div className="mb-8">
              <div className="flex items-center justify-center">
                <div className="hidden md:block h-1 bg-black mr-4 flex-1"></div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black">
                  BLK FILM+TV
                </h1>
                <div className="hidden md:block h-1 bg-black ml-4 flex-1"></div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article, i) => (
                <MainArticleCard
                  key={article.slug || i}
                  imageUrl={getImageUrl(article.coverImage)}
                  title={article.articleTitle}
                  slug={article.slug}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <PaginationDots
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
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
                slug={`/film-tv/${article.slug}`}
                imageUrl={getImageUrl(article.coverImage)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}