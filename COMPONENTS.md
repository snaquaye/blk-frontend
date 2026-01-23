# Component Library

## Header
The main navigation header.
- **Usage:** `<Header />`
- **Location:** `components/Header.tsx`

## Footer
The site footer with links and copyright.
- **Usage:** `<Footer />`
- **Location:** `components/Footer.tsx`

## ArticleCard
A reusable card component for displaying article previews.
- **Props:**
  - `title` (string): The article title.
  - `excerpt` (string): Short summary.
  - `category` (string): Category label.
  - `imageUrl` (string, optional): URL for the thumbnail.
  - `slug` (string, optional): Link destination (defaults to `#`).
  - `date` (string, optional): Publication date.

## HeroSection
A large banner component for page headers.
- **Props:**
  - `title` (string): Main headline.
  - `subtitle` (string, optional): Sub-headline.
  - `imageUrl` (string, optional): Background image URL.
  - `category` (string, optional): Label above title.
