"use client";

import { Article, Category } from "@/lib/types";
import FeaturedArticleCard from "./FeaturedArticleCard";
import { getStrapiImageUrl } from "@/lib/strapi";
import LoadMoreButton from "./LoadMoreButton";
import { useState, useCallback } from "react";

interface BooksListProps {
  articles: Article[];
  category: Category;
  initialPage?: number;
  pageSize?: number;
  totalPages?: number;
}

export default function BooksList({
  articles: initialArticles,
  category,
  initialPage = 1,
  pageSize = 3,
  totalPages = 1,
}: BooksListProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(currentPage < totalPages);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(
        `/api/articles?category=${encodeURIComponent(category)}&page=${nextPage}&pageSize=${pageSize}`
      );
      
      if (!response.ok) throw new Error("Failed to fetch articles");
      
      const data = await response.json();
      
      setArticles((prev) => [...prev, ...data.data]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < data.meta.pagination.pageCount);
    } catch (error) {
      console.error("Error loading more articles:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, hasMore, isLoading, category, pageSize]);

  // Helper to get excerpt from article
  const getExcerpt = (article: Article): string => {
    // Use description if available
    if (article.description) {
      const desc = String(article.description);
      return desc.length > 150 ? desc.substring(0, 150) + "..." : desc;
    }
    return "Read more about this article...";
  };

  return (
    <div className="space-y-6">
      {articles.map((article, i) => (
        <FeaturedArticleCard
          key={article.slug || i}
          title={article.articleTitle}
          excerpt={getExcerpt(article)}
          imageUrl={
            article.coverImage?.[0]?.url
              ? getStrapiImageUrl(article.coverImage[0])
              : undefined
          }
          slug={`/books/${article.slug}`}
        />
      ))}

      {/* Pagination */}
      {hasMore && (
        <LoadMoreButton onClick={loadMore} isLoading={isLoading} />
      )}
    </div>
  );
}
