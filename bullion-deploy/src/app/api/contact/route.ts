import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, recaptchaToken } = await req.json();

    // 1. Verify reCAPTCHA
    const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) { // Check for success and a reasonable score
      return NextResponse.json({ error: 'Failed CAPTCHA verification.' }, { status: 400 });
    }

    // 2. Input validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // 2. Sanitize inputs (basic example)
    const sanitized = {
      name: name.toString(),
      email: email.toString(),
      subject: subject.toString(),
      message: message.toString(),
    };

    // 3. Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 4. Define email options
    const mailOptions = {
      from: `"${sanitized.name}" <${sanitized.email}>`,
      to: 'support@mycourier.com', // Your support email
      subject: `New Contact Form Submission - ${sanitized.subject}`,
      html: `
        <h2>New Message from Contact Form</h2>
        <p><strong>Name:</strong> ${sanitized.name}</p>
        <p><strong>Email:</strong> ${sanitized.email}</p>
        <hr />
        <h3>Message:</h3>
        <p>${sanitized.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // 5. Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Thank you! Your message has been sent.' });

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Oops, something went wrong. Please try again.' }, { status: 500 });
  }
}
