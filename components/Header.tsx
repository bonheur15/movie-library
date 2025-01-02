import Link from 'next/link'
import { Film } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Film size={24} />
          <span className="text-xl font-bold">MovieStream</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link href="/movies" className="hover:text-gray-300">Movies</Link></li>
            <li><Link href="/tv-shows" className="hover:text-gray-300">TV Shows</Link></li>
            <li><Link href="/my-list" className="hover:text-gray-300">My List</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

