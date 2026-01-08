// Migration script to add slugs to existing artworks
// Run with: SANITY_WRITE_TOKEN=xxx node scripts/add-slugs.mjs

import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'sfy3tmyk',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
});

function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

async function migrate() {
    console.log('🔄 Adding slugs to artworks...\n');

    // Fetch all artworks without slugs
    const artworks = await client.fetch(`
    *[_type == "artwork"] {
      _id,
      title,
      "hasSlug": defined(slug)
    }
  `);

    for (const artwork of artworks) {
        if (!artwork.hasSlug) {
            const slug = generateSlug(artwork.title);
            console.log(`Adding slug "${slug}" to "${artwork.title}"`);

            await client.patch(artwork._id)
                .set({ slug: { _type: 'slug', current: slug } })
                .commit();
        }
    }

    console.log('\n✅ Migration complete!');
}

migrate().catch(console.error);
