import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, address, services, details } = data;

    // Determine subject based on services
    let serviceType = '';
    if (services.landscaping && services.outdoorConstruction) {
      serviceType = 'Landscaping & Outdoor Construction';
    } else if (services.landscaping) {
      serviceType = 'Landscaping Services';
    } else if (services.outdoorConstruction) {
      serviceType = 'Outdoor Construction';
    } else {
      serviceType = 'General Inquiry';
    }

    // Create email content
    const emailContent = `Subject: ${serviceType} Request

Dear SplitRock Team,

A new quote request has been submitted through the website.

CLIENT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:         ${name}
Email:        ${email}
Phone:        ${phone}

SERVICE REQUESTED:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${services.landscaping ? '✓ Landscaping Services\n' : ''}${services.outdoorConstruction ? '✓ Outdoor Construction\n' : ''}
PROJECT LOCATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${address}

PROJECT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${details}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This request was submitted on: ${new Date().toLocaleString('en-US', { 
  dateStyle: 'full', 
  timeStyle: 'short',
  timeZone: 'America/New_York'
})}

Best regards,
SplitRock Website System
`;

    // Create draft-emails directory if it doesn't exist
    const draftDir = path.join(process.cwd(), 'draft-emails');
    await mkdir(draftDir, { recursive: true });

    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `quote-request-${timestamp}.txt`;
    const filepath = path.join(draftDir, filename);

    // Save the email draft
    await writeFile(filepath, emailContent, 'utf-8');

    return NextResponse.json({ 
      success: true, 
      message: 'Quote request saved successfully',
      filename 
    });
  } catch (error) {
    console.error('Error saving quote:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save quote request' },
      { status: 500 }
    );
  }
}
