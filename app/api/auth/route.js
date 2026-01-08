import { NextResponse } from 'next/server';

// Simple password authentication
// In production, use environment variables and proper hashing
const ADMIN_PASSWORD = 'admin123';

export async function POST(request) {
    try {
        const { password } = await request.json();

        if (password === ADMIN_PASSWORD) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
