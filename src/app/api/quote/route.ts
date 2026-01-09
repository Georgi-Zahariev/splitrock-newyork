import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { quoteFormSchemaWithServiceCheck } from '@/lib/validation/quote';
import { rateLimit } from '@/lib/rate-limit';
import { ZodError } from 'zod';

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

// Environment variables with defaults
const QUOTE_TO_EMAIL_LANDSCAPING = process.env.QUOTE_TO_EMAIL_LANDSCAPING || '';
const QUOTE_TO_EMAIL_CONSTRUCTION = process.env.QUOTE_TO_EMAIL_CONSTRUCTION || '';
const QUOTE_TO_EMAIL_FALLBACK = process.env.QUOTE_TO_EMAIL_FALLBACK || 'quotes@splitrocknewyork.com';
const QUOTE_FROM_EMAIL = process.env.QUOTE_FROM_EMAIL || 'onboarding@resend.dev';
const QUOTE_REPLY_TO = process.env.QUOTE_REPLY_TO;
const QUOTE_RATE_LIMIT = parseInt(process.env.QUOTE_RATE_LIMIT_PER_MIN || '3', 10);
const QUOTE_HONEYPOT_FIELD = process.env.QUOTE_HONEYPOT_FIELD || '_gotcha';
const QUOTE_DEV_EMAIL = process.env.QUOTE_DEV_EMAIL; // Development mode override

// Warn if critical configuration is missing
if (!process.env.RESEND_API_KEY) {
  console.error('[CONFIG ERROR] RESEND_API_KEY is not set!');
}
if (!QUOTE_TO_EMAIL_LANDSCAPING && !QUOTE_TO_EMAIL_CONSTRUCTION) {
  console.warn('[CONFIG WARNING] No business emails configured, using fallback:', QUOTE_TO_EMAIL_FALLBACK);
}

/**
 * POST /api/quote
 * Handle quote form submissions with validation, rate limiting, and email notifications
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // ===== HONEYPOT CHECK =====
    // If honeypot field is filled, silently reject (return success to avoid bot detection)
    const honeypotValue = body[QUOTE_HONEYPOT_FIELD] || body.honeypot;
    if (honeypotValue && honeypotValue !== '') {
      console.log('[HONEYPOT] Bot detected, honeypot field was filled');
      // Return success to the bot but don't process
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // ===== VALIDATION =====
    // Validate request body with Zod schema (includes service check)
    let validatedData;
    try {
      validatedData = quoteFormSchemaWithServiceCheck.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        // Format validation errors for client
        const fieldErrors: Record<string, string[]> = {};
        error.issues.forEach((issue) => {
          const path = issue.path.join('.');
          if (!fieldErrors[path]) {
            fieldErrors[path] = [];
          }
          fieldErrors[path].push(issue.message);
        });

        return NextResponse.json(
          {
            ok: false,
            error: 'validation',
            fieldErrors,
          },
          { status: 400 }
        );
      }
      throw error; // Re-throw if not a Zod error
    }

    // ===== RATE LIMITING =====
    // Extract client IP address
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    const rateLimitResult = rateLimit(ip, QUOTE_RATE_LIMIT);
    if (!rateLimitResult.ok) {
      console.log(`[RATE LIMIT] IP ${ip} exceeded rate limit`);
      return NextResponse.json(
        {
          ok: false,
          error: 'rate_limited',
          retryAfterSeconds: rateLimitResult.retryAfterSeconds,
        },
        { status: 429 }
      );
    }

    // ===== EMAIL SENDING =====
    const timestamp = new Date().toISOString();
    const {
      name,
      email,
      phone,
      address,
      landscaping,
      outdoorConstruction,
      details,
    } = validatedData;

    // Determine selected services for display
    const selectedServices = [];
    if (landscaping) selectedServices.push('Landscaping Services');
    if (outdoorConstruction) selectedServices.push('Outdoor Construction');
    const servicesText = selectedServices.join(' & ');

    // Determine recipient email(s) based on selected services
    const recipients: string[] = [];
    
    if (landscaping && QUOTE_TO_EMAIL_LANDSCAPING) {
      recipients.push(QUOTE_TO_EMAIL_LANDSCAPING);
    }
    
    if (outdoorConstruction && QUOTE_TO_EMAIL_CONSTRUCTION) {
      recipients.push(QUOTE_TO_EMAIL_CONSTRUCTION);
    }
    
    // Fallback if no specific email is available
    if (recipients.length === 0) {
      console.warn('[QUOTE] No service-specific emails configured, using fallback');
      recipients.push(QUOTE_TO_EMAIL_FALLBACK);
    }

    // Development mode: override recipients with dev email if domain not verified
    const actualRecipients = QUOTE_DEV_EMAIL ? [QUOTE_DEV_EMAIL] : recipients;
    const isDevMode = !!QUOTE_DEV_EMAIL;

    if (isDevMode) {
      console.warn('[DEV MODE] Emails redirected to:', actualRecipients[0]);
    }

    // Format contact emails for display
    const contactEmails = [
      landscaping && QUOTE_TO_EMAIL_LANDSCAPING ? `Landscaping: ${QUOTE_TO_EMAIL_LANDSCAPING}` : '',
      outdoorConstruction && QUOTE_TO_EMAIL_CONSTRUCTION ? `Construction: ${QUOTE_TO_EMAIL_CONSTRUCTION}` : '',
    ].filter(Boolean).join('\n') || QUOTE_TO_EMAIL_FALLBACK;

    try {
      // 1) Send internal notification email to business
      const internalEmail = await resend.emails.send({
        from: QUOTE_FROM_EMAIL,
        to: actualRecipients,
        replyTo: QUOTE_REPLY_TO || email, // Use submitter email if QUOTE_REPLY_TO not set
        subject: `${isDevMode ? '[DEV] ' : ''}New Quote Request: ${servicesText}`,
        text: `
${isDevMode ? '⚠️ DEVELOPMENT MODE - This would normally go to: ' + recipients.join(', ') + '\n\n' : ''}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  NEW QUOTE REQUEST - SplitRock New York
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 CLIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:         ${name}
Email:        ${email}
Phone:        ${phone}

🛠️  SERVICES REQUESTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${landscaping ? '✓ Landscaping Services\n' : ''}${outdoorConstruction ? '✓ Outdoor Construction\n' : ''}
📍 PROJECT LOCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${address}

📝 PROJECT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${details}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ Submitted:  ${new Date(timestamp).toLocaleString('en-US', {
          dateStyle: 'full',
          timeStyle: 'short',
          timeZone: 'America/New_York',
        })} ET

🌐 Client IP:  ${ip}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This request was submitted through the SplitRock website.
Reply directly to this email to contact the client.
        `,
      });

      // Check if internal email was successful
      if (internalEmail.error) {
        console.error('[EMAIL ERROR] Internal notification failed:', internalEmail.error);
        return NextResponse.json(
          {
            ok: false,
            error: 'email_send_failed',
            message: 'Failed to send internal notification. Please try again or contact support.',
          },
          { status: 500 }
        );
      }

      console.log('[EMAIL] Internal notification sent successfully');

      // 2) Send confirmation email to customer
      const confirmationEmail = await resend.emails.send({
        from: QUOTE_FROM_EMAIL,
        to: email,
        subject: 'Quote Request Received - SplitRock New York',
        text: `
Hello ${name},

Thank you for requesting a quote from SplitRock New York!

We've received your request for ${servicesText} and our team will review it shortly. You can expect to hear from us within 1-2 business days.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR REQUEST SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Services:     ${servicesText}
Location:     ${address}
Phone:        ${phone}

Project Details:
${details}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  This is an automated confirmation — please do not reply to this email.

If you have any questions, please contact us directly:

${contactEmails}

Best regards,
The SplitRock Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SplitRock New York
Professional Landscaping & Outdoor Construction
${contactEmails}
        `,
      });

      // Check confirmation email response (non-critical)
      if (confirmationEmail.error) {
        console.error('[EMAIL WARNING] Customer confirmation failed:', confirmationEmail.error);
        // Don't fail the request if confirmation fails - internal email is more critical
      } else {
        console.log('[EMAIL] Customer confirmation sent successfully');
      }
      
    } catch (emailError) {
      // Log email errors but don't expose to client
      console.error('[EMAIL ERROR] Exception during email send:', emailError);
      
      // Return generic server error without leaking provider details
      return NextResponse.json(
        {
          ok: false,
          error: 'server_error',
        },
        { status: 500 }
      );
    }

    // ===== SUCCESS =====
    console.log(`[QUOTE] Request processed successfully for ${email}`);
    return NextResponse.json({ ok: true }, { status: 200 });

  } catch (error) {
    // Catch-all for unexpected errors
    console.error('[UNEXPECTED ERROR]', error);
    return NextResponse.json(
      {
        ok: false,
        error: 'server_error',
      },
      { status: 500 }
    );
  }
}

/**
 * Handle non-POST methods
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}
