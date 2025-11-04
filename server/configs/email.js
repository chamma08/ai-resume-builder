import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// OPTION 1: Gmail with explicit SMTP settings (Current)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
  tls: {
    rejectUnauthorized: false
  }
});

// OPTION 2: Outlook/Hotmail (Uncomment to use)
// const transporter = nodemailer.createTransport({
//   host: 'smtp-mail.outlook.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER, 
//     pass: process.env.EMAIL_PASS, 
//   },
//   tls: {
//     ciphers: 'SSLv3'
//   }
// });

// OPTION 3: Yahoo (Uncomment to use)
// const transporter = nodemailer.createTransport({
//   host: 'smtp.mail.yahoo.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER, 
//     pass: process.env.EMAIL_PASS, 
//   }
// });

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('⚠️  Email configuration error:', error.message);
    console.log('📧 Email features may not work. Please check your EMAIL_USER and EMAIL_PASS in .env file');
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

export default transporter;
