import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-gray-300">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-gray-300">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="hover:text-gray-300">FAQ</Link></li>
              <li><Link href="/help" className="hover:text-gray-300">Help Center</Link></li>
              <li><Link href="/terms" className="hover:text-gray-300">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/action" className="hover:text-gray-300">Action</Link></li>
              <li><Link href="/comedy" className="hover:text-gray-300">Comedy</Link></li>
              <li><Link href="/drama" className="hover:text-gray-300">Drama</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-gray-300">Facebook</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Twitter</Link></li>
              <li><Link href="#" className="hover:text-gray-300">Instagram</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 MovieStream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

