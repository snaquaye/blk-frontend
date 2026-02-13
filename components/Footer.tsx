import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter mb-4 block">
              <Image
                src="/logo.svg"
                alt="BLK Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-white dark:text-gray-400 max-w-xs">
              Curating the best in Books, Culture, Film & TV. Defining the modern aesthetic.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white!">Categories</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/books" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">Books</Link></li>
              <li><Link href="/culture" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">Culture</Link></li>
              <li><Link href="/film-tv" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">Film & TV</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white!">Connect</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">Newsletter</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-white! text-center">
            &copy; {new Date().getFullYear()} BLK Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
