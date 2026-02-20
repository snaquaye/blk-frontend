import { strapi } from "@strapi/client";
import { Article, Category, Homepage, StapiImage } from "./types";
const client = strapi({baseURL: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'});

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Fetch from Strapi API
 */
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;

  const res = await fetch(url, {
    cache: 'no-store',
    next: { revalidate: 0 },
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    console.log('Strapi fetch error:', res);
    throw new Error(`Strapi API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Get featured articles (where IsFeaturedPost is true)
 */
export async function getFeaturedArticles(limit: number = 4): Promise<Article[]> {
  const response = await fetchAPI<StrapiResponse<Array<Article>>>(
    `/articles?filters[isFeaturedPost][$eq]=true&sort=publishedAt:desc&pagination[limit]=${limit}&populate=*`
  );

  return response.data;
}

/**
 * Get featured articles with pagination support
 */
export async function getFeaturedArticlesPaginated(
  page: number = 1,
  pageSize: number = 4
): Promise<{ data: Article[]; meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } } }> {
  const response = await fetchAPI<StrapiResponse<Array<Article>>>(
    `/articles?filters[isFeaturedPost][$eq]=true&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`
  );

  return {
    data: response.data,
    meta: {
      pagination: response.meta?.pagination || { page: 1, pageSize, pageCount: 1, total: response.data.length }
    }
  };
}

/**
 * Get recent articles (most recent, regardless of category)
 */
export async function getRecentArticles(limit: number = 3): Promise<Article[]> {
  const response = await fetchAPI<StrapiResponse<Array<Article>>>(
    `/articles?sort=createdAt:desc&pagination[limit]=${limit}&populate=*`
  );
  
  return response.data;
}

/**
 * Get homepage data
 */
export async function getHomepage(): Promise<Homepage | null> {
  try {
    const response = await fetchAPI<StrapiResponse<Homepage>>(
      '/homepage?populate=*'
    );
    
    return response.data;
  } catch {
    return null;
  }
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(category: Category, limit: number = 3): Promise<Article[]> {
  const response = await fetchAPI<StrapiResponse<Array<Article>>>(
    `/articles?filters[category][$eq]=${encodeURIComponent(category)}&sort=createdAt:desc&pagination[limit]=${limit}&populate=*`
  );

  return response.data;
}

/**
 * Get articles by category with pagination support
 */
export async function getArticlesByCategoryPaginated(
  category: Category,
  page: number = 1,
  pageSize: number = 6
): Promise<{ data: Article[]; meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } } }> {
  const response = await fetchAPI<StrapiResponse<Array<Article>>>(
    `/articles?filters[category][$eq]=${encodeURIComponent(category)}&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`
  );
  
  // Calculate pageCount based on the total items returned when API doesn't provide pagination metadata
  const apiPagination = response.meta?.pagination;
  const totalItems = apiPagination?.total ?? response.data.length;
  const calculatedPageCount = Math.ceil(totalItems / pageSize) || 1;
  
  return {
    data: response.data,
    meta: {
      pagination: apiPagination || { 
        page: 1, 
        pageSize, 
        pageCount: calculatedPageCount, 
        total: totalItems 
      }
    }
  };
}

/**
 * Get all categories with their articles
 */
export async function getCategoriesWithArticles(limit: number = 3): Promise<Category[]> {
  const response = await fetchAPI<StrapiResponse<Array<Category>>>(
    `/categories?populate[articles][populate]=*&populate[articles][pagination][limit]=${limit}&populate[articles][sort]=createdAt:desc`
  );
  
  return response.data;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const response = await fetchAPI<StrapiResponse<Array<Article>>>(
    `/articles?filters[slug][$eq]=${slug}&populate=*`
  )

  const article = response.data[0] || null;

  return article;
}

/**
 * Get image URL from Strapi
 */
export function getStrapiImageUrl(image?: any): string | undefined {
  if (!image) return undefined;

  // Handle direct object with url property
  let urlString: string | undefined;
  
  if (typeof image === 'string') {
    urlString = image;
  } else if (image.url) {
    urlString = typeof image.url === 'string' ? image.url : image.url.toString();
  } else if (image.data?.attributes?.url) {
    urlString = image.data.attributes.url;
  }

  if (!urlString) return undefined;

  // If the URL is already absolute, return it
  if (urlString.startsWith('http')) {
    return urlString;
  }

  // Otherwise, prepend the Strapi URL
  return `${STRAPI_URL}${urlString}`;
}

/**
 * Get articles by tags (where article has one or more of the specified tags)
 * Uses $in operator to match any of the provided tag slugs
 */
export async function getArticlesByTags(tagSlugs: string[], limit: number = 3, excludeSlug?: string): Promise<Article[]> {
  // Build filter for tags - uses $in to match any of the tags
  const tagFilter = tagSlugs.map((slug, i) => `filters[tags][slug][$in][${i}]=${encodeURIComponent(slug)}`).join('&');

  // Optionally exclude a specific article (useful for related posts)
  const excludeFilter = excludeSlug ? `&filters[slug][$ne]=${excludeSlug}` : '';

  const response = await fetchAPI<StrapiResponse<Array<Article>>>(
    `/articles?${tagFilter}${excludeFilter}&sort=createdAt:desc&pagination[limit]=${limit}&populate=*`
  );

  return response.data;
}

/**
 * Get related posts based on an article's tags
 */
export async function getRelatedPosts(articleSlug: string, tagSlugs: string[], limit: number = 3): Promise<Article[]> {
  return getArticlesByTags(tagSlugs, limit, articleSlug);
}

/**
 * Get watchlist items from Strapi
 */
export async function getWatchlistItems(): Promise<Article[]> {
  const response = await fetchAPI<StrapiResponse<Array<Article>>>(
    `/articles?filters[addToWatchlist][$eq]=Yes&sort=createdAt:desc&populate=*`
  );
  
  return response.data;
}

/**
 * Get currently reading books (placeholder/mock data)
 * TODO: Replace with actual Strapi fetch when the field is available
 */
export async function getCurrentlyReadingBooks(): Promise<{ title: string; author: string; imageUrl?: string; slug: string }[]> {
  // Placeholder data - replace with actual Strapi fetch when available
  // Example Strapi query: `/articles?filters[currentlyReading][$eq]=true&populate=*`
  return [
    {
      title: "DREAM COUNT",
      author: "Chimamanda Ngozi Adichie",
      slug: "/books/dream-count",
    },
    {
      title: "INTERMEZZO",
      author: "Sally Rooney",
      slug: "/books/intermezzo",
    },
  ];
}
