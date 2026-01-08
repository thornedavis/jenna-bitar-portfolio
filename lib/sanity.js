import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Fetch all collections with their artworks
export async function getCollectionsWithArtworks() {
  return client.fetch(`
    *[_type == "collection"] | order(order asc) {
      _id,
      name,
      "slug": slug.current,
      description,
      order,
      "artworks": *[_type == "artwork" && references(^._id)] | order(order asc) {
        _id,
        title,
        "slug": slug.current,
        "image": images[0],
        images,
        dimensions,
        medium,
        year,
        available,
        description,
        artworkInformation,
        framing,
        shipping,
        order
      }
    }
  `);
}

// Fetch site settings
export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      artistName,
      tagline,
      shortBio,
      fullBio,
      profileImage,
      email,
      instagram,
      instagramUrl,
      education,
      soloExhibitions,
      groupExhibitions,
      awards,
      press
    }
  `);
}

// Fetch a single collection by slug
export async function getCollectionBySlug(slug) {
  return client.fetch(`
    *[_type == "collection" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      description,
      "artworks": *[_type == "artwork" && references(^._id)] | order(order asc) {
        _id,
        title,
        "slug": slug.current,
        "image": images[0],
        images,
        dimensions,
        medium,
        year,
        available,
        description,
        artworkInformation,
        framing,
        shipping,
        order
      }
    }
  `, { slug });
}

// Fetch a single artwork by slug
export async function getArtworkBySlug(slug) {
  return client.fetch(`
    *[_type == "artwork" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      images,
      dimensions,
      medium,
      year,
      available,
      description,
      artworkInformation,
      framing,
      shipping,
      "collection": collection->{
        _id,
        name,
        "slug": slug.current
      }
    }
  `, { slug });
}

// Fetch all artwork slugs (for static generation)
export async function getAllArtworkSlugs() {
  return client.fetch(`
    *[_type == "artwork" && defined(slug.current)]{
      "slug": slug.current
    }
  `);
}
