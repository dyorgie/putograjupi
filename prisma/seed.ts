import { prisma } from '../src/lib/prisma';
import { ImageCategory } from '@prisma/client';

async function main() {
  console.log('Clearing existing data...');
  await prisma.portfolioImage.deleteMany(); 

  console.log('Seeding Portfolio Images...');

  const sampleImages = [
    {
      cloudinaryUrl: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      publicId: 'sample',
      title: 'Vibrant Flower',
      category: ImageCategory.PERSONAL, 
      isFeatured: true,
      sortOrder: 1,
    },
    {
      cloudinaryUrl: 'https://res.cloudinary.com/demo/image/upload/cld-sample.jpg',
      publicId: 'cld-sample',
      title: 'City Portrait',
      category: ImageCategory.PORTRAIT, 
      isFeatured: false,
      sortOrder: 2,
    },
    {
      cloudinaryUrl: 'https://res.cloudinary.com/demo/image/upload/cld-sample-2.jpg',
      publicId: 'cld-sample-2',
      title: 'Mountain Hike',
      category: ImageCategory.WEDDING, 
      isFeatured: true,
      sortOrder: 3,
    }
  ];

  for (const image of sampleImages) {
    await prisma.portfolioImage.create({
      data: image,
    });
  }

  console.log(`Successfully seeded ${sampleImages.length} images.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });