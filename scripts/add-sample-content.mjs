// Add sample content to all artworks for design testing
// Run with: SANITY_WRITE_TOKEN=xxx node scripts/add-sample-content.mjs

import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'sfy3tmyk',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_WRITE_TOKEN,
    useCdn: false,
});

const sampleDescriptions = [
    `This piece explores the intersection of form and emotion, drawing on traditions of abstract expressionism while incorporating contemporary techniques. The layered composition creates depth and movement, inviting viewers to discover new details with each viewing.

The work emerged from a period of intensive studio practice, where experimentation with materials and process led to unexpected discoveries. Natural pigments and unconventional grounds contribute to the textured surface quality.`,

    `Created during an artist residency, this work reflects the surrounding landscape and its influence on creative practice. The palette draws from observations of light and atmosphere, translated through intuitive mark-making.

Each layer builds upon the last, creating a conversation between intention and chance. The final surface holds traces of this process, visible texture that rewards close inspection.`,

    `This composition balances tension and harmony through careful consideration of color relationships and spatial dynamics. The canvas becomes a field for exploration, where gesture and contemplation coexist.

Working across multiple sessions allowed for periods of reflection between active painting, resulting in a work that embodies both spontaneity and considered decision-making.`,
];

const sampleArtworkInfo = `Medium: Mixed media on stretched canvas
Substrate: Belgian linen, museum-quality stretcher bars
Varnish: UV-protective satin finish
Signed: Verso, with certificate of authenticity
Condition: Excellent, created for this exhibition`;

const sampleFraming = `This work is presented unframed, gallery-wrapped on 2" deep stretcher bars with painted edges, ready to hang.

Custom framing available upon request. We work with specialist art framers who can provide options ranging from minimal floating frames to traditional museum-style presentations. Please inquire for a consultation and quote.`;

const sampleShipping = `Shipping is available worldwide. Works are professionally packed in custom-built crates with climate control considerations for international transit.

Domestic shipping typically arrives within 5-10 business days. International shipping times vary by destination, usually 10-21 business days.

All shipments are fully insured and include tracking. White glove delivery and installation services available for an additional fee. Please contact us to discuss your specific requirements.`;

async function addContent() {
    console.log('📝 Adding sample content to artworks...\n');

    // Fetch all artworks
    const artworks = await client.fetch(`*[_type == "artwork"]{ _id, title }`);

    for (let i = 0; i < artworks.length; i++) {
        const artwork = artworks[i];
        const description = sampleDescriptions[i % sampleDescriptions.length];

        console.log(`Updating: ${artwork.title}`);

        await client.patch(artwork._id)
            .set({
                description: description,
                artworkInformation: sampleArtworkInfo,
                framing: sampleFraming,
                shipping: sampleShipping,
            })
            .commit();
    }

    console.log('\n✅ Sample content added to all artworks!');
}

addContent().catch(console.error);
