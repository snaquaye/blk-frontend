import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ArticleCard from '../components/ArticleCard'

describe('ArticleCard', () => {
  it('renders title and excerpt', () => {
    const props = {
      title: "Test Article",
      excerpt: "This is a test excerpt.",
      category: "Testing",
      slug: "/test-article"
    }
    
    render(<ArticleCard {...props} />)
    
    expect(screen.getByText("Test Article")).toBeDefined()
    expect(screen.getByText("This is a test excerpt.")).toBeDefined()
    expect(screen.getByText("Testing")).toBeDefined()
  })

  it('renders image when provided', () => {
    const props = {
      title: "Test Article",
      excerpt: "Excerpt",
      category: "Testing",
      imageUrl: "http://example.com/image.jpg"
    }
    
    render(<ArticleCard {...props} />)
    
    const img = screen.getByRole('img')
    expect(img).toBeDefined()
    expect(img.getAttribute('src')).toBe("http://example.com/image.jpg")
  })
})
