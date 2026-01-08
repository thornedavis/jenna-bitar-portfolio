import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    groups: [
        { name: 'artist', title: 'Artist Info' },
        { name: 'contact', title: 'Contact' },
        { name: 'cv', title: 'CV / Resume' },
    ],
    fields: [
        // Artist Info
        defineField({
            name: 'artistName',
            title: 'Artist Name',
            type: 'string',
            group: 'artist',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
            group: 'artist',
            description: 'e.g., "Contemporary Artist"',
        }),
        defineField({
            name: 'shortBio',
            title: 'Short Bio',
            type: 'text',
            rows: 3,
            group: 'artist',
            description: 'Brief description shown on homepage',
        }),
        defineField({
            name: 'fullBio',
            title: 'Full Bio',
            type: 'text',
            rows: 8,
            group: 'artist',
            description: 'Full biography shown on About page',
        }),
        defineField({
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: { hotspot: true },
            group: 'artist',
        }),

        // Contact Info
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            group: 'contact',
        }),
        defineField({
            name: 'instagram',
            title: 'Instagram Handle',
            type: 'string',
            group: 'contact',
            description: 'e.g., "@jennabitar"',
        }),
        defineField({
            name: 'instagramUrl',
            title: 'Instagram URL',
            type: 'url',
            group: 'contact',
        }),

        // CV
        defineField({
            name: 'education',
            title: 'Education',
            type: 'array',
            group: 'cv',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        { name: 'year', type: 'string', title: 'Year' },
                        { name: 'title', type: 'string', title: 'Degree/Title' },
                        { name: 'institution', type: 'string', title: 'Institution' },
                    ],
                    preview: {
                        select: { year: 'year', title: 'title' },
                        prepare: ({ year, title }) => ({ title: `${year} - ${title}` }),
                    },
                }),
            ],
        }),
        defineField({
            name: 'soloExhibitions',
            title: 'Solo Exhibitions',
            type: 'array',
            group: 'cv',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        { name: 'year', type: 'string', title: 'Year' },
                        { name: 'title', type: 'string', title: 'Exhibition Title' },
                        { name: 'venue', type: 'string', title: 'Venue' },
                    ],
                    preview: {
                        select: { year: 'year', title: 'title' },
                        prepare: ({ year, title }) => ({ title: `${year} - ${title}` }),
                    },
                }),
            ],
        }),
        defineField({
            name: 'groupExhibitions',
            title: 'Group Exhibitions',
            type: 'array',
            group: 'cv',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        { name: 'year', type: 'string', title: 'Year' },
                        { name: 'title', type: 'string', title: 'Exhibition Title' },
                        { name: 'venue', type: 'string', title: 'Venue' },
                    ],
                    preview: {
                        select: { year: 'year', title: 'title' },
                        prepare: ({ year, title }) => ({ title: `${year} - ${title}` }),
                    },
                }),
            ],
        }),
        defineField({
            name: 'awards',
            title: 'Awards & Grants',
            type: 'array',
            group: 'cv',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        { name: 'year', type: 'string', title: 'Year' },
                        { name: 'title', type: 'string', title: 'Award Title' },
                    ],
                    preview: {
                        select: { year: 'year', title: 'title' },
                        prepare: ({ year, title }) => ({ title: `${year} - ${title}` }),
                    },
                }),
            ],
        }),
        defineField({
            name: 'press',
            title: 'Press & Publications',
            type: 'array',
            group: 'cv',
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        { name: 'year', type: 'string', title: 'Year' },
                        { name: 'title', type: 'string', title: 'Article Title' },
                        { name: 'publication', type: 'string', title: 'Publication' },
                        { name: 'url', type: 'url', title: 'Link' },
                    ],
                    preview: {
                        select: { year: 'year', title: 'title', publication: 'publication' },
                        prepare: ({ year, title, publication }) => ({
                            title: `${year} - ${title}`,
                            subtitle: publication,
                        }),
                    },
                }),
            ],
        }),
    ],
    preview: {
        select: { title: 'artistName' },
        prepare: ({ title }) => ({ title: title || 'Site Settings' }),
    },
});
