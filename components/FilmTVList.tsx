"use client";

import { Article, Category } from "@/lib/types";
import MainArticleCard from "./MainArticleCard";
import { getStrapiImageUrl } from "@/lib/strapi";
import LoadMoreButton from "./LoadMoreButton";
import { useState, useCallback } from "react";

interface FilmTVListProps {
  mainArticles: Article[];
  category: Category;
  initialPage?: number;
  pageSize?: number;
  totalPages?: number;
}

export default function FilmTVList({
  mainArticles,
  category,
  initialPage = 1,
  pageSize = 6,
  totalPages = 1,
}: FilmTVListProps) {
  const [articles, setArticles] = useState<Article[]>(mainArticles);
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
    <div className="flex-1">
      {/* Page Title */}
      <div className="mb-8">
        <div className="flex items-center">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black">
            BLK FILM+TV
          </h1>
          <div className="hidden md:block flex-1 h-1 bg-black ml-4"></div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article, i) => (
          <MainArticleCard
            key={article.slug || i}
            imageUrl={
              article.coverImage?.[0]?.ImageSrc?.[0]
                ? getStrapiImageUrl(article.coverImage[0].ImageSrc[0])
                : undefined
            }
            title={article.articleTitle}
            slug={article.slug}
          />
        ))}
      </div>

      {/* Pagination */}
      {hasMore && (
        <LoadMoreButton onClick={loadMore} isLoading={isLoading} />
      )}
    </div>
  );
}
