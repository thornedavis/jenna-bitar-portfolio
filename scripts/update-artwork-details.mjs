// Update all artworks with consistent details section content
// Run with: SANITY_WRITE_TOKEN=xxx node scripts/update-artwork-details.mjs

import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'sfy3tmyk',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
});

const shippingContent = `All artworks are painted in my studio in Bali and shipped internationally from here. I offer both Air and Sea freight depending on your timeline and budget. Air freight is the fastest option, with delivery typically taking between 2 days to one week, though it comes at a higher cost. Sea freight is a more affordable choice, with delivery times of up to three weeks. Every order includes a 2-day handling period to ensure your artwork is securely wrapped and professionally crated before dispatch.`;

const framingContent = `Each artwork is framed in albasia wood, chosen for its light weight, durability and natural finish. Frames can be custom-stained to suit your preference whether to complement the artwork's color palette or match existing wooden furniture in your space.`;

const artworkInformationContent = `Each Artwork is a quiet dialogues between nature and abstraction contemporary pieces shaped by the rhythms, textures, and patterns of the earth. Each artwork is mixed media, created using materials I make myself from organic derivatives such as seeds, natural inks, clay, sand, volcanic ash, tea, and leaf tints. In this way, nature is given a second life transformed into layered surfaces that live on as art.
All pieces are created by hand in my Bali studio with close attention to detail. From painting to packaging, each step is handled with care to ensure your artwork arrives beautifully presented and ready to enjoy.`;

async function updateArtworkDetails() {
    console.log('📝 Updating artwork details...\n');

    // Fetch all artworks
    const artworks = await client.fetch(`*[_type == "artwork"]{ _id, title }`);
    console.log(`Found ${artworks.length} artworks to update.\n`);

    for (const artwork of artworks) {
        console.log(`Updating: ${artwork.title}`);

        await client.patch(artwork._id)
            .set({
                artworkInformation: artworkInformationContent,
                framing: framingContent,
                shipping: shippingContent,
            })
            .commit();
    }

    console.log('\n✅ All artworks updated successfully!');
}

updateArtworkDetails().catch(console.error);
