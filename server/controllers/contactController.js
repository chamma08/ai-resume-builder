import transporter from '../configs/email.js';

// Send contact email
export const sendContactEmail = async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;

    // Validation
    if (!fullName || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide full name, email, and message' 
      });
    }

    // Email options for admin notification
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Send to admin email
      subject: `New Contact Form Submission from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #991B1B; border-bottom: 2px solid #991B1B; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Full Name:</strong> ${fullName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <div style="margin-top: 20px;">
              <strong>Message:</strong>
              <p style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 4px solid #991B1B;">
                ${message}
              </p>
            </div>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
            This email was sent from the AI Resume Builder contact form.
          </p>
        </div>
      `,
    };

    // Email options for user confirmation
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting AI Resume Builder',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #991B1B; border-bottom: 2px solid #991B1B; padding-bottom: 10px;">
            Thank You for Reaching Out!
          </h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>Hi ${fullName},</p>
            <p>Thank you for contacting AI Resume Builder. We have received your message and will get back to you as soon as possible.</p>
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #991B1B;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;"><strong>Your message:</strong></p>
              <p style="margin-top: 10px;">${message}</p>
            </div>
            <p>We typically respond within 24-48 hours.</p>
            <p>Best regards,<br><strong>AI Resume Builder Team</strong></p>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 30px; text-align: center;">
            © 2025 AI Resume Builder. All rights reserved.
          </p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully! We will get back to you soon.' 
    });

  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
};
