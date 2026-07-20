import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const image = await prisma.portfolioImage.findUnique({
    where: {
      id: id,
    },
  });

  if (!image) {
    notFound();
  }

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <Link 
        href="/portfolio" 
        className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
      >
        &larr; Back to Portfolio
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left Column: Large Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-100 shadow-md">
          <Image
            src={image.cloudinaryUrl}
            alt={image.title || 'Portfolio Image'}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Right Column: Photo Metadata */}
        <div className="flex flex-col space-y-6 pt-4">
          <div className="space-y-2">
            <span className="text-sm font-bold tracking-widest text-gray-500 uppercase">
              {image.category}
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {image.title || 'Untitled'}
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
}