// Seed script to populate Sanity with sample data
// Run with: node scripts/seed-sanity.mjs

import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'sfy3tmyk',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_WRITE_TOKEN, // You'll need to create this
    useCdn: false,
});

const collections = [
    { name: 'Abstract Series', slug: 'abstract-series', order: 1 },
    { name: 'Landscape Series', slug: 'landscape-series', order: 2 },
    { name: 'Portrait Series', slug: 'portrait-series', order: 3 },
];

const artworkTemplates = [
    { title: 'Untitled I', dimensions: '90 x 120 cm', medium: 'Oil on canvas', year: '2024', available: true },
    { title: 'Untitled II', dimensions: '60 x 90 cm', medium: 'Acrylic on canvas', year: '2024', available: true },
    { title: 'Untitled III', dimensions: '120 x 150 cm', medium: 'Mixed media', year: '2023', available: false },
    { title: 'Untitled IV', dimensions: '75 x 100 cm', medium: 'Oil on canvas', year: '2023', available: true },
    { title: 'Untitled V', dimensions: '90 x 120 cm', medium: 'Acrylic on canvas', year: '2023', available: true },
    { title: 'Untitled VI', dimensions: '60 x 75 cm', medium: 'Mixed media', year: '2022', available: true },
    { title: 'Untitled VII', dimensions: '100 x 130 cm', medium: 'Oil on linen', year: '2022', available: false },
    { title: 'Untitled VIII', dimensions: '90 x 120 cm', medium: 'Acrylic on canvas', year: '2022', available: true },
];

async function seed() {
    console.log('🌱 Seeding Sanity...\n');

    // Create collections
    const createdCollections = [];
    for (const col of collections) {
        console.log(`Creating collection: ${col.name}`);
        const result = await client.create({
            _type: 'collection',
            name: col.name,
            slug: { _type: 'slug', current: col.slug },
            order: col.order,
        });
        createdCollections.push(result);
        console.log(`  ✓ Created: ${result._id}\n`);
    }

    // Create artworks for each collection (distribute 8 artworks across 3 collections)
    // Collection 1: 3 artworks, Collection 2: 3 artworks, Collection 3: 2 artworks
    const artworkDistribution = [
        { collectionIndex: 0, artworkIndices: [0, 1, 2] },
        { collectionIndex: 1, artworkIndices: [3, 4, 5] },
        { collectionIndex: 2, artworkIndices: [6, 7] },
    ];

    for (const dist of artworkDistribution) {
        const collection = createdCollections[dist.collectionIndex];
        console.log(`Adding artworks to: ${collection.name}`);

        for (let i = 0; i < dist.artworkIndices.length; i++) {
            const template = artworkTemplates[dist.artworkIndices[i]];
            const result = await client.create({
                _type: 'artwork',
                title: template.title,
                dimensions: template.dimensions,
                medium: template.medium,
                year: template.year,
                available: template.available,
                order: i + 1,
                collection: {
                    _type: 'reference',
                    _ref: collection._id,
                },
            });
            console.log(`  ✓ Created: ${template.title}`);
        }
        console.log('');
    }

    // Create site settings
    console.log('Creating site settings...');
    await client.create({
        _type: 'siteSettings',
        artistName: 'Jenna Bitar',
        tagline: 'Contemporary Artist',
        shortBio: 'Jenna Bitar is a contemporary artist whose work explores the intersection of color, texture, and emotion through various mediums including oil painting, acrylics, and mixed media.',
        fullBio: 'Jenna Bitar (born 1990) is a contemporary artist whose intuitive works feature layered compositions that blend abstraction with representation. Her practice explores the relationship between color, texture, and emotional resonance, creating works that invite contemplation and connection.\n\nWith an ever-evolving palette and process, Jenna enjoys experimenting with new materials and techniques, allowing the canvas to become a space for presence and poetic tension. Her work has been featured in galleries across the region and is held in private collections worldwide.',
        email: 'hello@jennabitar.com',
        instagram: '@jennabitar',
        instagramUrl: 'https://instagram.com/jennabitar',
        education: [
            { _key: 'edu1', year: '2012', title: 'Bachelor of Fine Arts', institution: 'School of Visual Arts, New York' },
        ],
        soloExhibitions: [
            { _key: 'solo1', year: '2024', title: 'New Horizons', venue: 'Gallery One, New York' },
            { _key: 'solo2', year: '2023', title: 'Inner Landscapes', venue: 'Art Space, Los Angeles' },
        ],
        groupExhibitions: [
            { _key: 'group1', year: '2024', title: 'Collective Vision', venue: 'Modern Art Center' },
            { _key: 'group2', year: '2023', title: 'Emerging Artists', venue: 'City Gallery' },
        ],
        awards: [
            { _key: 'award1', year: '2024', title: 'Emerging Artist Grant' },
        ],
    });
    console.log('  ✓ Site settings created\n');

    console.log('✅ Seeding complete!');
}

seed().catch(console.error);
