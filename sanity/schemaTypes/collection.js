import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'collection',
    title: 'Collection',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Collection Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first',
            initialValue: 0,
        }),
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'name',
            order: 'order',
        },
        prepare({ title, order }) {
            return {
                title,
                subtitle: `Order: ${order ?? 0}`,
            };
        },
    },
});
