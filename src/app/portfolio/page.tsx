import { prisma } from '@/lib/prisma';

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
            <div className="relative w-full h-64">
              {/* Using standard img tag for now to avoid Next.js domain config errors */}
              <img 
                src={image.cloudinaryUrl} 
                alt={image.title || 'Portfolio Image'} 
                className="object-cover w-full h-full"
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