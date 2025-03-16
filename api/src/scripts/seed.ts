import { db, schema } from '../db';

async function seed() {
  try {
    // Create admin user for artworks
    const admin = await db.insert(schema.users).values({
      name: 'Admin User',
      email: 'admin@artmarket.com',
      password: 'hashed_password_here', // In production, this should be properly hashed
      role: 'admin',
      bio: 'System administrator',
    }).returning();

    // Create categories
    const categories = await db.insert(schema.categories).values([
      {
        name: 'Original Art',
        description: 'Original paintings, drawings, and illustrations',
      },
      {
        name: 'Photography',
        description: 'Professional photographs available as prints or digital downloads',
      },
      {
        name: 'Digital Art',
        description: 'Digital artwork including wallpapers and templates',
      },
      {
        name: 'Prints',
        description: 'Limited and open-edition prints on various materials',
      },
      {
        name: 'Custom Art',
        description: 'Commissioned artwork based on customer requests',
      },
      {
        name: 'Merchandise',
        description: 'Artwork printed on various items like mugs and t-shirts',
      },
      {
        name: 'Textile Art',
        description: 'Designs for fabric, wrapping paper, and wallpaper',
      },
      {
        name: 'Sculptures',
        description: 'Original clay works and 3D-printed designs',
      },
      {
        name: 'Collaborations',
        description: 'Artwork available for licensing and commercial use',
      },
      {
        name: 'Print-on-Demand',
        description: 'Art applied to home decor items',
      },
    ]).returning();

    // Sample artworks for each category
    const artworks = [];
    const categoryArtworks = {
      'Original Art': [
        {
          title: 'Abstract Sunset',
          description: 'A vibrant abstract interpretation of a sunset using acrylic on canvas',
          price: 1200.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
        {
          title: 'Urban Landscape',
          description: 'Oil painting depicting a modern cityscape at night',
          price: 1500.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
      ],
      'Photography': [
        {
          title: 'Mountain Serenity',
          description: 'High-resolution photograph of mountain peaks at dawn',
          price: 350.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
        {
          title: 'Ocean Waves',
          description: 'Black and white photograph of ocean waves',
          price: 275.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
      ],
      'Digital Art': [
        {
          title: 'Cyberpunk City',
          description: 'Digital illustration of a futuristic cyberpunk cityscape',
          price: 150.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
        {
          title: 'Fantasy World Map',
          description: 'Detailed digital map of an imaginary fantasy world',
          price: 200.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
      ],
      'Prints': [
        {
          title: 'Cherry Blossom Limited Edition',
          description: 'Limited edition print of cherry blossoms, numbered and signed',
          price: 180.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
        {
          title: 'Vintage Botanical Collection',
          description: 'Set of 4 botanical prints on archival paper',
          price: 240.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
      ],
      'Custom Art': [
        {
          title: 'Pet Portrait Commission',
          description: 'Custom pet portrait in watercolor, size 11x14 inches',
          price: 300.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
        {
          title: 'Family Portrait Commission',
          description: 'Custom family portrait in oil, size 16x20 inches',
          price: 800.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
      ],
      'Merchandise': [
        {
          title: 'Art Print T-Shirt',
          description: 'Original artwork printed on premium cotton t-shirt',
          price: 35.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
        {
          title: 'Designer Coffee Mug',
          description: 'Artistic design printed on 11oz ceramic mug',
          price: 25.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
      ],
      'Textile Art': [
        {
          title: 'Floral Pattern Fabric',
          description: 'Original floral pattern printed on cotton fabric, per yard',
          price: 45.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
        {
          title: 'Abstract Wallpaper Design',
          description: 'Modern abstract pattern wallpaper, per roll',
          price: 85.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
      ],
      'Sculptures': [
        {
          title: 'Modern Abstract Sculpture',
          description: 'Bronze abstract sculpture, height 24 inches',
          price: 2200.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
        {
          title: '3D Printed Art Piece',
          description: 'Complex geometric design 3D printed in metallic finish',
          price: 450.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
      ],
      'Collaborations': [
        {
          title: 'Commercial License - Abstract Series',
          description: 'Commercial license for abstract art series, 1-year term',
          price: 1500.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
        {
          title: 'Brand Collaboration Package',
          description: 'Custom artwork package for brand collaboration',
          price: 3000.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
      ],
      'Print-on-Demand': [
        {
          title: 'Designer Throw Pillow',
          description: 'Original artwork printed on premium throw pillow',
          price: 45.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
        {
          title: 'Art Print Blanket',
          description: 'Cozy throw blanket featuring original artwork',
          price: 65.00,
          imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        },
      ],
    };

    // Insert artworks for each category
    for (const category of categories) {
      const categoryArtworksList = categoryArtworks[category.name];
      if (categoryArtworksList) {
        for (const artwork of categoryArtworksList) {
          artworks.push({
            ...artwork,
            categoryId: category.id,
            artistId: admin[0].id,
          });
        }
      }
    }

    await db.insert(schema.artworks).values(artworks);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 