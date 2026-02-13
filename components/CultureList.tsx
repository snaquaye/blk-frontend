"use client";

import { Article, Category } from "@/lib/types";
import RecentArticleCard from "./RecentArticleCard";
import { getStrapiImageUrl } from "@/lib/strapi";
import LoadMoreButton from "./LoadMoreButton";
import { useState, useCallback } from "react";

interface CultureListProps {
  articles: Article[];
  category: Category;
  initialPage?: number;
  pageSize?: number;
  totalPages?: number;
}

export default function CultureList({
  articles: initialArticles,
  category,
  initialPage = 1,
  pageSize = 6,
  totalPages = 1,
}: CultureListProps) {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {articles.map((article, i) => (
        <RecentArticleCard
          key={article.slug || i}
          title={article.articleTitle}
          imageUrl={getStrapiImageUrl(article.coverImage)}
          slug={`/culture/${article.slug}`}
        />
      ))}

      {/* Load More */}
      {hasMore && (
        <div className="col-span-full flex justify-center">
          <LoadMoreButton onClick={loadMore} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
}
