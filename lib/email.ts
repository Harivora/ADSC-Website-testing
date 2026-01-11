import nodemailer from 'nodemailer';

// ADSC Brand Colors
const ADSC_COLORS = {
  valencia: '#dc3d43',    // A - Red
  oceangreen: '#3cb179',  // D - Green
  azureradiance: '#0091ff', // S - Blue
  supernova: '#f7ce00',   // C - Yellow
};

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

    return { success: true, data: info };
  } catch (error) {
    return { success: false, error };
  }
}

// ADSC Logo HTML component for emails
function getADSCLogoHtml(): string {
  return `
    <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
      <tr>
        <td style="padding: 0 2px;">
          <div style="width: 40px; height: 40px; background-color: rgba(220, 61, 67, 0.2); border: 2px solid ${ADSC_COLORS.valencia}; border-radius: 8px; text-align: center; line-height: 36px;">
            <span style="color: ${ADSC_COLORS.valencia}; font-weight: bold; font-size: 20px; font-family: Arial, sans-serif;">A</span>
          </div>
        </td>
        <td style="padding: 0 2px;">
          <div style="width: 40px; height: 40px; background-color: rgba(60, 177, 121, 0.2); border: 2px solid ${ADSC_COLORS.oceangreen}; border-radius: 8px; text-align: center; line-height: 36px;">
            <span style="color: ${ADSC_COLORS.oceangreen}; font-weight: bold; font-size: 20px; font-family: Arial, sans-serif;">D</span>
          </div>
        </td>
        <td style="padding: 0 2px;">
          <div style="width: 40px; height: 40px; background-color: rgba(0, 145, 255, 0.2); border: 2px solid ${ADSC_COLORS.azureradiance}; border-radius: 8px; text-align: center; line-height: 36px;">
            <span style="color: ${ADSC_COLORS.azureradiance}; font-weight: bold; font-size: 20px; font-family: Arial, sans-serif;">S</span>
          </div>
        </td>
        <td style="padding: 0 2px;">
          <div style="width: 40px; height: 40px; background-color: rgba(247, 206, 0, 0.2); border: 2px solid ${ADSC_COLORS.supernova}; border-radius: 8px; text-align: center; line-height: 36px;">
            <span style="color: ${ADSC_COLORS.supernova}; font-weight: bold; font-size: 20px; font-family: Arial, sans-serif;">C</span>
          </div>
        </td>
      </tr>
    </table>
  `;
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
          <!-- Header with gradient using all 4 colors -->
          <tr>
            <td style="background: linear-gradient(135deg, ${ADSC_COLORS.valencia} 0%, ${ADSC_COLORS.supernova} 50%, ${ADSC_COLORS.oceangreen} 100%); padding: 40px; text-align: center;">
              <!-- ADSC Logo -->
              ${getADSCLogoHtml()}
              <h1 style="margin: 20px 0 0; color: #fff; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">🎉 Welcome to ADSC!</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #e5e5e5; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Hey there! 👋
              </p>
              <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Thank you for subscribing to the <strong style="color: ${ADSC_COLORS.supernova};">Atmiya Developer Students Club</strong> newsletter!
              </p>
              <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                You'll now receive updates about:
              </p>
              <ul style="color: #a3a3a3; font-size: 16px; line-height: 1.8; margin: 0 0 30px; padding-left: 20px;">
                <li><span style="color: ${ADSC_COLORS.valencia};">🚀</span> Upcoming workshops & events</li>
                <li><span style="color: ${ADSC_COLORS.oceangreen};">💻</span> Hackathons & coding challenges</li>
                <li><span style="color: ${ADSC_COLORS.azureradiance};">📚</span> Tech tutorials & resources</li>
                <li><span style="color: ${ADSC_COLORS.supernova};">🎯</span> Career opportunities & internships</li>
              </ul>
              
              <!-- CTA Button with gradient -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://adsc-atmiya.in/events" style="display: inline-block; background: linear-gradient(90deg, ${ADSC_COLORS.valencia}, ${ADSC_COLORS.supernova}, ${ADSC_COLORS.oceangreen}); color: #000; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                      Explore Events
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6; margin: 30px 0 0;">
                Stay curious, keep building! 🛠️
              </p>
              <p style="margin: 10px 0 0;">
                <span style="color: ${ADSC_COLORS.valencia}; font-weight: bold;">—</span>
                <span style="color: ${ADSC_COLORS.oceangreen}; font-weight: bold;"> The</span>
                <span style="color: ${ADSC_COLORS.azureradiance}; font-weight: bold;"> ADSC</span>
                <span style="color: ${ADSC_COLORS.supernova}; font-weight: bold;"> Team</span>
              </p>
            </td>
          </tr>
          
          <!-- Footer with color dots -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 30px; text-align: center; border-top: 1px solid #262626;">
              <!-- Color dots -->
              <p style="margin: 0 0 15px;">
                <span style="color: ${ADSC_COLORS.valencia}; font-size: 16px;">●</span>
                <span style="color: ${ADSC_COLORS.oceangreen}; font-size: 16px;"> ● </span>
                <span style="color: ${ADSC_COLORS.azureradiance}; font-size: 16px;">● </span>
                <span style="color: ${ADSC_COLORS.supernova}; font-size: 16px;">●</span>
              </p>
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
          <!-- Header with gradient using all 4 colors -->
          <tr>
            <td style="background: linear-gradient(135deg, ${ADSC_COLORS.azureradiance} 0%, ${ADSC_COLORS.oceangreen} 50%, ${ADSC_COLORS.supernova} 100%); padding: 40px; text-align: center;">
              <!-- ADSC Logo -->
              ${getADSCLogoHtml()}
              <p style="margin: 20px 0 10px; color: #fff; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">📅 New Event</p>
              <h1 style="margin: 0; color: #fff; font-size: 26px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${eventDetails.name}</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                ${eventDetails.description}
              </p>
              
              <!-- Event Date with colored border -->
              <div style="background-color: #262626; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; border-left: 4px solid ${ADSC_COLORS.oceangreen};">
                <p style="color: #737373; font-size: 12px; margin: 0 0 5px; text-transform: uppercase;">Event Date</p>
                <p style="color: ${ADSC_COLORS.supernova}; font-size: 24px; font-weight: bold; margin: 0;">${eventDetails.date}</p>
              </div>
              
              ${eventDetails.registerUrl ? `
              <!-- CTA Button with gradient -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${eventDetails.registerUrl}" style="display: inline-block; background: linear-gradient(90deg, ${ADSC_COLORS.valencia}, ${ADSC_COLORS.supernova}, ${ADSC_COLORS.oceangreen}); color: #000; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
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
          
          <!-- Footer with color dots -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 30px; text-align: center; border-top: 1px solid #262626;">
              <!-- Color dots -->
              <p style="margin: 0 0 15px;">
                <span style="color: ${ADSC_COLORS.valencia}; font-size: 16px;">●</span>
                <span style="color: ${ADSC_COLORS.oceangreen}; font-size: 16px;"> ● </span>
                <span style="color: ${ADSC_COLORS.azureradiance}; font-size: 16px;">● </span>
                <span style="color: ${ADSC_COLORS.supernova}; font-size: 16px;">●</span>
              </p>
              <p style="color: #737373; font-size: 12px; margin: 0 0 10px;">
                Atmiya Developer Students Club | Atmiya University
              </p>
              <p style="color: #525252; font-size: 11px; margin: 0;">
                <a href="https://adsc-atmiya.in" style="color: ${ADSC_COLORS.azureradiance}; text-decoration: none;">Visit Website</a>
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
