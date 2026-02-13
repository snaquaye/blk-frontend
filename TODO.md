# TODO: Add Pagination to Homepage Featured Articles

## Tasks
- [ ] Update getFeaturedArticles in lib/strapi.ts to support pagination (add page and pageSize parameters, return meta)
- [ ] Convert app/page.tsx to client-side component ('use client')
- [ ] Add state management for featured articles, current page, and total pages in app/page.tsx
- [ ] Add PaginationDots component below the featured grid in app/page.tsx
- [ ] Move all data fetching to useEffect in app/page.tsx
- [ ] Test the pagination functionality
