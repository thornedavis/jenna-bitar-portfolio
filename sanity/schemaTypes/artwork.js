import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
    name: 'artwork',
    title: 'Artwork',
    type: 'document',
    groups: [
        { name: 'basic', title: 'Basic Info', default: true },
        { name: 'details', title: 'Details & Description' },
        { name: 'expandable', title: 'Expandable Sections' },
    ],
    fields: [
        // Basic Info
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'basic',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'basic',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            group: 'basic',
            of: [
                defineArrayMember({
                    type: 'image',
                    options: { hotspot: true },
                }),
            ],
            validation: (Rule) => Rule.required().min(1),
            description: 'Add multiple images for the artwork gallery. First image is the main/thumbnail image.',
        }),
        defineField({
            name: 'collection',
            title: 'Collection',
            type: 'reference',
            group: 'basic',
            to: [{ type: 'collection' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'string',
            group: 'basic',
        }),
        defineField({
            name: 'dimensions',
            title: 'Dimensions',
            type: 'string',
            group: 'basic',
            description: 'e.g., "120cm w x 120cm h"',
        }),
        defineField({
            name: 'medium',
            title: 'Medium',
            type: 'string',
            group: 'basic',
            description: 'e.g., "Desert organisms and plant life on raw canvas"',
        }),
        defineField({
            name: 'available',
            title: 'Available for Sale',
            type: 'boolean',
            group: 'basic',
            initialValue: true,
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            group: 'basic',
            description: 'Order within the collection (lower numbers appear first)',
            initialValue: 0,
        }),

        // Details & Description
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            group: 'details',
            rows: 8,
            description: 'Full description of the artwork shown on the detail page',
        }),

        // Expandable Sections
        defineField({
            name: 'artworkInformation',
            title: 'Artwork Information',
            type: 'text',
            group: 'expandable',
            rows: 4,
            description: 'Additional technical details (shown in expandable "Artwork Information" section)',
        }),
        defineField({
            name: 'framing',
            title: 'Framing',
            type: 'text',
            group: 'expandable',
            rows: 4,
            description: 'Information about framing options (shown in expandable "Framing" section)',
        }),
        defineField({
            name: 'shipping',
            title: 'Shipping',
            type: 'text',
            group: 'expandable',
            rows: 4,
            description: 'Shipping information (shown in expandable "Shipping" section)',
        }),
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
        {
            title: 'Title A-Z',
            name: 'titleAsc',
            by: [{ field: 'title', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'images.0',
            collection: 'collection.name',
            available: 'available',
        },
        prepare({ title, media, collection, available }) {
            return {
                title,
                subtitle: `${collection || 'No collection'} • ${available ? 'Available' : 'Sold'}`,
                media,
            };
        },
    },
});
