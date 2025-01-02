import Image from 'next/image'

const featuredMovies = [
  { id: 1, title: 'Movie 1', image: '/placeholder.svg?height=400&width=300' },
  { id: 2, title: 'Movie 2', image: '/placeholder.svg?height=400&width=300' },
  { id: 3, title: 'Movie 3', image: '/placeholder.svg?height=400&width=300' },
  { id: 4, title: 'Movie 4', image: '/placeholder.svg?height=400&width=300' },
]

export default function FeaturedMovies() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {featuredMovies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <Image src={movie.image} alt={movie.title} width={300} height={400} className="w-full h-auto" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

