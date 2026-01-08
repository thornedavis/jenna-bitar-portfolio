# Jenna Bitar - Artist Portfolio

A modern artist portfolio website built with Next.js and Sanity CMS.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity CMS

Create a Sanity project:

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Create a new project (or use an existing one)
3. Get your **Project ID** from the project settings

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Content Management

Access the Sanity Studio at [http://localhost:3000/admin](http://localhost:3000/admin) to:

- **Collections**: Create and manage artwork series/collections
- **Artworks**: Add artworks with images, dimensions, medium, year, and availability
- **Site Settings**: Update artist info, bio, contact details, and CV

### Adding Content

1. Go to `/admin` and log in with your Sanity account
2. Create collections first (e.g., "Abstract Series", "Landscape Series")
3. Add artworks and assign them to collections
4. Update Site Settings with artist information

## Deployment

Deploy to [Vercel](https://vercel.com) for the best experience:

1. Push your code to GitHub
2. Import the project on Vercel
3. Add the environment variables in Vercel's project settings
4. Deploy!

After deployment, access the studio at `yourdomain.com/admin`.

## Tech Stack

- **Framework**: Next.js 16
- **CMS**: Sanity
- **Styling**: CSS
- **Deployment**: Vercel (recommended)
