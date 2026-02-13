'use client';

import { useState, useEffect } from 'react';
import FeaturedArticleCard from "@/components/FeaturedArticleCard";
import RecentArticleCard from "@/components/RecentArticleCard";
import PageTitle from "@/components/PageTitle";
import { getArticlesByCategoryPaginated, getStrapiImageUrl } from "@/lib/strapi";
import { Article } from "@/lib/types";

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

export default function BooksPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const result = await getArticlesByCategoryPaginated('Books', currentPage, 6);
        setArticles(result.data);
        setTotalPages(result.meta.pagination.pageCount);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [currentPage]);

  // Helper function to extract image URL - coverImage is an object, not array
  const getImageUrl = (coverImage: any) => {
    if (!coverImage) return undefined;
    return getStrapiImageUrl(coverImage);
  };

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

      {/* Recent Articles Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-sm font-bold uppercase tracking-wider italic mb-6">
          RECENT ARTICLES
        </h2>
        <div className="border border-gray-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <RecentArticleCard
                key={article.id}
                title={article.articleTitle}
                imageUrl={getImageUrl(article.coverImage)}
                slug={`/books/${article.slug}`}
              />
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <PaginationDots
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </main>
  );
}