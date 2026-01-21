import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper to format budget display
const formatBudget = (budget) => {
    const budgetLabels = {
        'under-2500': 'Under $2,500',
        '2500-5000': '$2,500 - $5,000',
        '5000-10000': '$5,000 - $10,000',
        '10000-25000': '$10,000 - $25,000',
        'over-25000': '$25,000+',
        'flexible': 'Flexible / Not sure'
    };
    return budgetLabels[budget] || budget;
};

// Helper to format project type display
const formatProjectType = (type) => {
    const typeLabels = {
        'personal': 'Personal / Home',
        'business': 'Business / Commercial',
        'gift': 'Gift for someone',
        'other': 'Other'
    };
    return typeLabels[type] || type;
};

export async function POST(request) {
    try {
        const { name, email, projectType, location, budget, timeline, description } = await request.json();

        // Validate required fields
        if (!name || !email || !projectType || !budget) {
            return NextResponse.json(
                { error: 'Required fields are missing' },
                { status: 400 }
            );
        }

        // Send email to Jenna
        const { data, error } = await resend.emails.send({
            from: 'Jenna Bitar <hello@contact.jennabitar.com>',
            to: process.env.CONTACT_EMAIL || 'jenna@jennabitar.com',
            replyTo: email,
            subject: `New Commission Inquiry - ${formatBudget(budget)}`,
            html: `
                <h2>New Commission Request</h2>
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Project Type:</strong> ${formatProjectType(projectType)}</p>
                <p><strong>Budget Range:</strong> ${formatBudget(budget)}</p>
                ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
                ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
                ${description ? `
                    <p><strong>Vision / Description:</strong></p>
                    <div style="background: #f5f5f5; padding: 15px; border-left: 3px solid #333; margin: 10px 0;">
                        ${description.replace(/\n/g, '<br>')}
                    </div>
                ` : ''}
                <hr />
                <p style="color: #666; font-size: 12px;">This commission request was sent via your website. You can reply directly to this email to respond to ${name}.</p>
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
        console.error('Commission form error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
