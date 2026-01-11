import nodemailer from 'nodemailer';

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
  },
});

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"ADSC Newsletter" <${process.env.GMAIL_USER}>`,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
    });

    console.log('Email sent:', info.messageId);
    return { success: true, data: info };
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, error };
  }
}

// Welcome email template
export function getWelcomeEmailHtml(email: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ADSC Newsletter</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #171717; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #ca8a04 0%, #a16207 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #000; font-size: 28px; font-weight: bold;">🎉 Welcome to ADSC!</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #e5e5e5; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Hey there! 👋
              </p>
              <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Thank you for subscribing to the <strong style="color: #ca8a04;">Atmiya Developer Students Club</strong> newsletter!
              </p>
              <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                You'll now receive updates about:
              </p>
              <ul style="color: #a3a3a3; font-size: 16px; line-height: 1.8; margin: 0 0 30px; padding-left: 20px;">
                <li>🚀 Upcoming workshops & events</li>
                <li>💻 Hackathons & coding challenges</li>
                <li>📚 Tech tutorials & resources</li>
                <li>🎯 Career opportunities & internships</li>
              </ul>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://adsc.atmiya.in/events" style="display: inline-block; background-color: #ca8a04; color: #000; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                      Explore Events
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6; margin: 30px 0 0;">
                Stay curious, keep building! 🛠️
              </p>
              <p style="color: #ca8a04; font-size: 16px; font-weight: bold; margin: 10px 0 0;">
                — The ADSC Team
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 30px; text-align: center; border-top: 1px solid #262626;">
              <p style="color: #737373; font-size: 12px; margin: 0 0 10px;">
                Atmiya Developer Students Club | Atmiya University
              </p>
              <p style="color: #525252; font-size: 11px; margin: 0;">
                You received this email because ${email} subscribed to our newsletter.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Event announcement email template
export function getEventEmailHtml(eventDetails: {
  name: string;
  description: string;
  date: string;
  registerUrl?: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Event from ADSC</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #171717; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #ca8a04 0%, #a16207 100%); padding: 40px; text-align: center;">
              <p style="margin: 0 0 10px; color: #000; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">📅 New Event</p>
              <h1 style="margin: 0; color: #000; font-size: 26px; font-weight: bold;">${eventDetails.name}</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                ${eventDetails.description}
              </p>
              
              <!-- Event Date -->
              <div style="background-color: #262626; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
                <p style="color: #737373; font-size: 12px; margin: 0 0 5px; text-transform: uppercase;">Event Date</p>
                <p style="color: #ca8a04; font-size: 24px; font-weight: bold; margin: 0;">${eventDetails.date}</p>
              </div>
              
              ${eventDetails.registerUrl ? `
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${eventDetails.registerUrl}" style="display: inline-block; background-color: #ca8a04; color: #000; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                      Register Now
                    </a>
                  </td>
                </tr>
              </table>
              ` : ''}
              
              <p style="color: #737373; font-size: 14px; margin: 20px 0 0; text-align: center;">
                Don't miss out! See you there! 🚀
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 30px; text-align: center; border-top: 1px solid #262626;">
              <p style="color: #737373; font-size: 12px; margin: 0 0 10px;">
                Atmiya Developer Students Club | Atmiya University
              </p>
              <p style="color: #525252; font-size: 11px; margin: 0;">
                <a href="https://adsc.atmiya.in" style="color: #ca8a04; text-decoration: none;">Visit Website</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
