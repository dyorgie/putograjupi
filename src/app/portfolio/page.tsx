import { prisma } from '@/lib/prisma';
import Image from 'next/image'; // import image component
import Link from 'next/link'; // <-- 1. Added Link import

// Update the fetcher to accept an optional category filter
async function getPortfolioImages(category?: string) {
  return await prisma.portfolioImage.findMany({
    where: category ? { category: category as any } : undefined,
    orderBy: { sortOrder: 'asc' },
  });
}

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentCategory = resolvedSearchParams.category;
  const images = await getPortfolioImages(currentCategory);

  // categories based on schema/seed script
  const categories = ['ALL', 'WEDDING', 'PORTRAIT', 'COMMERCIAL', 'EVENTS', 'PERSONAL'];

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">Portfolio</h1>
      
      {/* Added Category Filter Buttons here */}
      <div className="flex gap-4 mb-8">
        {categories.map((cat) => {
          const isActive = cat === 'ALL' ? !currentCategory : currentCategory === cat;
          const href = cat === 'ALL' ? '/portfolio' : `/portfolio?category=${cat}`;
          
          return (
            <Link
              key={cat}
              href={href}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-black border-gray-300 hover:bg-gray-100'
              }`}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      {/* Responsive CSS Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
            <Link 
            key={image.id} 
      href={`/portfolio/${image.id}`}
      className="flex flex-col border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
            {/* added bg-gray-100 as a placeholder while images load */}
            <div className="relative w-full h-64 bg-gray-100"> 
              {/* replaced <img> with Next.js <Image> */}
              <Image 
                src={image.cloudinaryUrl} 
                alt={image.title || 'Portfolio Image'} 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4 bg-white">
              <h2 className="font-semibold text-lg">{image.title}</h2>
              <p className="text-sm text-gray-500">{image.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}