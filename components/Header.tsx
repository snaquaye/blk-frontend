import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white text-black">
      {/* Top Black Bar */}
      <div className="bg-black text-white text-center py-2">
        <span className="text-xs tracking-wider">EverythingBLKMedia</span>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-end">
          {/* Left Navigation */}
          <nav className="hidden md:flex items-end space-x-33 mb-4">
            <button className="text-black hover:opacity-70 transition-opacity" aria-label="Search">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link href="/" className="text-sm font-medium tracking-wider text-black hover:opacity-70 transition-opacity">
              RECENT
            </Link>
            <Link href="/shop" className="text-sm font-medium tracking-wider text-black hover:opacity-70 transition-opacity">
              SHOP
            </Link>
          </nav>

          {/* Center Logo */}
          <div className="shrink-0 text-center">
            <Link href="/" className="text-black hover:opacity-80 transition-opacity leading-none font-(family-name:--font-black-han-sans)">
              <div className="text-[20px] tracking-widest">EVERYTHING</div>
              <div className="text-[100px] tracking-tight leading-none">BLK</div>
            </Link>
          </div>

          {/* Right Navigation */}
          <nav className="hidden md:flex items-end space-x-33 mb-4">
            <Link href="/film-tv" className="text-sm font-medium tracking-wider text-black hover:opacity-70 transition-opacity">
              FILM+TV
            </Link>
            <Link href="/books" className="text-sm font-medium tracking-wider text-black hover:opacity-70 transition-opacity">
              BOOKS
            </Link>
            <Link href="/culture" className="text-sm font-medium tracking-wider text-black hover:opacity-70 transition-opacity">
              CULTURE
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-md hover:bg-gray-100 text-black">
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
