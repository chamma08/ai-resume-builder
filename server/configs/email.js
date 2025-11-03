import nodemailer from 'nodemailer';

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
    console.log('Email configuration error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

export default transporter;
