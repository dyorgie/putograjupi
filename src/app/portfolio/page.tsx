import { prisma } from '@/lib/prisma';
import Image from 'next/image'; // import image component

// Fetch images sorted by the sortOrder defined in your schema
async function getPortfolioImages() {
  return await prisma.portfolioImage.findMany({
    orderBy: {
      sortOrder: 'asc',
    },
  });
}

export default async function PortfolioPage() {
  // Line 14: images is declared here
  const images = await getPortfolioImages();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">Portfolio</h1>
      
      {/* Responsive CSS Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="flex flex-col border rounded-lg overflow-hidden shadow-sm">
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
          </div>
        ))}
      </div>
    </main>
  );
}