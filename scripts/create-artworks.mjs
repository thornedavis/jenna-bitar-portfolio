// Script to create 43 artwork entries in Sanity
// Run with: npx sanity exec scripts/create-artworks.mjs --with-user-token

import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';

// Try to get token from Sanity CLI config
function getSanityToken() {
    // Check environment variable first
    if (process.env.SANITY_WRITE_TOKEN) {
        return process.env.SANITY_WRITE_TOKEN;
    }

    // Try to read from Sanity CLI config
    const configPath = join(homedir(), '.config', 'sanity', 'config.json');
    if (existsSync(configPath)) {
        try {
            const config = JSON.parse(readFileSync(configPath, 'utf-8'));
            if (config.authToken) {
                return config.authToken;
            }
        } catch (e) {
            // Config exists but couldn't read token
        }
    }

    return null;
}

const token = getSanityToken();

const client = createClient({
    projectId: 'sfy3tmyk',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: token,
    useCdn: false,
});

// Artwork titles extracted from filenames
const artworks = [
    'Aetherium',
    'Alca',
    'Anima Mundi',
    'Anthropometry',
    'Archetypes',
    'As Above or Below',
    'Atom',
    'Baalbek',
    'Blossom',
    'Cliff Collapse',
    'Entre Ciel et Terre',
    'From Quark to Cosmos',
    'Jannah',
    'Kaleidoscope',
    'Liwa',
    'Malibu Sunset',
    'Margi',
    'Matcha',
    'Melbia',
    'Mintsihil',
    'Moss',
    'Namib',
    'Nectar Furnace',
    'Ocean Eyes',
    'Opium',
    'Orion',
    'Oxida',
    'Oysters',
    'Passage',
    'Passage of Time',
    'Pistachio Rose',
    'Roots',
    'Rubra',
    'Ruug',
    'Soha',
    'SOL',
    'Solar',
    'The Dancer',
    'Venus',
    'Wabi Sabi',
    "You're My Jam",
    'Zarqa',
    'Zuhara',
];

// Helper to create a slug from title
function createSlug(title) {
    return title
        .toLowerCase()
        .replace(/['']/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

async function main() {
    if (!token) {
        console.error('❌ Error: No Sanity token found');
        console.log('\nPlease run: npx sanity login');
        console.log('Or set SANITY_WRITE_TOKEN environment variable\n');
        process.exit(1);
    }

    console.log('🎨 Creating 43 artwork entries in Sanity...\n');

    // Get first available collection to assign artworks to
    const collections = await client.fetch('*[_type == "collection"] | order(order asc) { _id, name }');

    if (collections.length === 0) {
        console.error('❌ No collections found. Please create at least one collection first.');
        process.exit(1);
    }

    // Use the first collection (Abstract Series based on order)
    const targetCollection = collections[0];
    console.log(`📁 Assigning artworks to collection: "${targetCollection.name}"\n`);

    let created = 0;
    let skipped = 0;

    for (let i = 0; i < artworks.length; i++) {
        const title = artworks[i];
        const slug = createSlug(title);

        // Check if artwork already exists
        const existing = await client.fetch(
            '*[_type == "artwork" && slug.current == $slug][0]',
            { slug }
        );

        if (existing) {
            console.log(`  ⏭️  Skipped: ${title} (already exists)`);
            skipped++;
            continue;
        }

        try {
            await client.create({
                _type: 'artwork',
                title,
                slug: { _type: 'slug', current: slug },
                collection: {
                    _type: 'reference',
                    _ref: targetCollection._id,
                },
                available: true,
                order: i + 1,
                // Placeholder values - can be updated in Sanity Studio
                year: new Date().getFullYear().toString(),
                dimensions: '',
                medium: '',
            });
            console.log(`  ✅ Created: ${title}`);
            created++;
        } catch (error) {
            console.error(`  ❌ Failed: ${title} - ${error.message}`);
        }
    }

    console.log(`\n✨ Done! Created ${created} artworks, skipped ${skipped} existing.`);
    console.log('\n📌 Next steps:');
    console.log('1. Go to http://localhost:3000/admin/structure/artwork');
    console.log('2. Click on each artwork to upload images');
    console.log('3. Fill in dimensions, medium, and other details as needed');
}

main().catch(console.error);
