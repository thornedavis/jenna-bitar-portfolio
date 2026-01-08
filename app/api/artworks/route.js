import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const dataPath = join(process.cwd(), 'data', 'artworks.json');

function readArtworks() {
    try {
        const data = readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch {
        return { series: [] };
    }
}

function writeArtworks(data) {
    writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// GET - Fetch all artworks
export async function GET() {
    const artworks = readArtworks();
    return NextResponse.json(artworks);
}

// POST - Add new artwork
export async function POST(request) {
    try {
        const { seriesId, artwork } = await request.json();
        const data = readArtworks();

        const seriesIndex = data.series.findIndex(s => s.id === seriesId);
        if (seriesIndex === -1) {
            return NextResponse.json({ error: 'Series not found' }, { status: 404 });
        }

        data.series[seriesIndex].artworks.push(artwork);
        writeArtworks(data);

        return NextResponse.json({ success: true, artwork });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add artwork' }, { status: 500 });
    }
}

// PUT - Update artwork
export async function PUT(request) {
    try {
        const { seriesId, artwork } = await request.json();
        const data = readArtworks();

        const seriesIndex = data.series.findIndex(s => s.id === seriesId);
        if (seriesIndex === -1) {
            return NextResponse.json({ error: 'Series not found' }, { status: 404 });
        }

        const artworkIndex = data.series[seriesIndex].artworks.findIndex(a => a.id === artwork.id);
        if (artworkIndex === -1) {
            return NextResponse.json({ error: 'Artwork not found' }, { status: 404 });
        }

        data.series[seriesIndex].artworks[artworkIndex] = artwork;
        writeArtworks(data);

        return NextResponse.json({ success: true, artwork });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update artwork' }, { status: 500 });
    }
}

// DELETE - Delete artwork
export async function DELETE(request) {
    try {
        const { seriesId, artworkId } = await request.json();
        const data = readArtworks();

        const seriesIndex = data.series.findIndex(s => s.id === seriesId);
        if (seriesIndex === -1) {
            return NextResponse.json({ error: 'Series not found' }, { status: 404 });
        }

        data.series[seriesIndex].artworks = data.series[seriesIndex].artworks.filter(a => a.id !== artworkId);
        writeArtworks(data);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete artwork' }, { status: 500 });
    }
}
