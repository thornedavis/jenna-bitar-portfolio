import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { name, email, painting, location, notes } = await request.json();

        // Validate required fields
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 }
            );
        }

        // Send email to Jenna
        const { data, error } = await resend.emails.send({
            from: 'Jenna Bitar <hello@contact.jennabitar.com>',
            to: process.env.CONTACT_EMAIL || 'jenna@jennabitar.com',
            replyTo: email,
            subject: `New Inquiry: ${painting || 'General Contact'}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                ${painting ? `<p><strong>Painting of Interest:</strong> ${painting}</p>` : ''}
                ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
                ${notes ? `<p><strong>Notes:</strong></p><p>${notes}</p>` : ''}
                <hr />
                <p style="color: #666; font-size: 12px;">This message was sent via your website contact form. You can reply directly to this email to respond to ${name}.</p>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, messageId: data?.id },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
