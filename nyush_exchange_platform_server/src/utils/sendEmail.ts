import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

/**
 * Sends a verification email.
 * @param email - Recipient's email address
 * @param verificationCode - Verification code to be sent
 */
export const sendVerificationEmail = async (email: string, verificationCode: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS, // Sender's email
      to: email, // Recipient's email
      subject: 'NYUSH Exchange Platform Verification Code',
      text: `Your verification code is: ${verificationCode}`,
      html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};