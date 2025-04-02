import { categories, users, artworks } from '@/lib/data';
import { API_ENDPOINTS } from './config';
import { api } from '@/lib/api-client';

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`HTTP error! status: ${response.status}, body: ${JSON.stringify(error)}`);
  }
  return response.json();
}

async function createCategory(category: typeof categories[0]) {
  console.log(`Creating category: ${category.name}`);
  const response = await fetch(API_ENDPOINTS.categories, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: category.name,
      description: category.description,
    }),
  });
  return handleResponse(response);
}

async function createArtist(artist: typeof users[0]) {
  console.log(`Creating artist: ${artist.name}`);
  const response = await fetch(API_ENDPOINTS.artists, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: artist.name,
      email: artist.email,
      role: 'artist',
      bio: artist.bio,
      profileImage: artist.profileImage,
      isVerified: artist.isVerified,
    }),
  });
  return handleResponse(response);
}

async function createArtwork(artwork: typeof artworks[0], categoryId: string, artistId: string) {
  console.log(`Creating artwork: ${artwork.title}`);
  
  // First, fetch the image
  const imageResponse = await fetch(artwork.imageUrl);
  const imageBlob = await imageResponse.blob();
  const imageFile = new File([imageBlob], 'artwork.jpg', { type: 'image/jpeg' });

  // Create form data
  const formData = new FormData();
  formData.append('title', artwork.title);
  formData.append('description', artwork.description || '');
  formData.append('price', artwork.price.toString());
  formData.append('categoryId', categoryId);
  formData.append('artistId', artistId);
  formData.append('image', imageFile);

  const response = await fetch(API_ENDPOINTS.artworks, {
    method: 'POST',
    body: formData,
  });
  return handleResponse(response);
}

async function migrateData() {
  console.log('Starting data migration...');
  
  try {
    // Create categories first
    console.log('Creating categories...');
    const categoryMap = new Map<string, string>();
    for (const category of categories) {
      const createdCategory = await createCategory(category);
      categoryMap.set(category.id, createdCategory.id);
    }
    console.log('Categories processed successfully');

    // Create artists
    console.log('Creating artists...');
    const artistMap = new Map<string, string>();
    for (const artist of users) {
      if (artist.role === 'artist') {
        const createdArtist = await createArtist(artist);
        artistMap.set(artist.id, createdArtist.id);
      }
    }
    console.log('Artists created successfully');

    // Create artworks
    console.log('Creating artworks...');
    for (const artwork of artworks) {
      const categoryId = categoryMap.get(artwork.categoryId);
      const artistId = artistMap.get(artwork.artistId);
      
      if (!categoryId || !artistId) {
        console.error(`Missing category or artist for artwork: ${artwork.title}`);
        continue;
      }

      await createArtwork(artwork, categoryId, artistId);
    }
    console.log('Artworks created successfully');

    console.log('Data migration completed successfully!');
  } catch (error) {
    console.error('Error during data migration:', error);
    throw error;
  }
}

// Run the migration
migrateData().catch(console.error); 