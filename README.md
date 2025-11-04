# 🚀 AI Resume Builder

A modern, full-stack MERN application that helps users create professional resumes with AI-powered content enhancement. Built with React, Node.js, Express, and MongoDB, featuring multiple professional templates and intelligent content suggestions.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)

## ✨ Features

- 🤖 **AI-Powered Content Enhancement** - Leverage OpenAI GPT-4o-mini to enhance professional summaries, experience descriptions, and skills
- 📄 **Multiple Professional Templates** - Choose from 6 beautifully designed resume templates:
  - Classic Template
  - Modern Template
  - Minimal Template
  - Minimal Image Template
  - Elegant Template
  - Corporate Template
- 🎨 **Customizable Color Themes** - Personalize your resume with custom color schemes
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 👤 **User Authentication** - Secure JWT-based authentication system with password reset
- 🔐 **Password Recovery** - OTP-based password reset via email
- 💾 **Save & Manage Resumes** - Create, save, and manage multiple resumes
- 📸 **Image Upload** - Add profile pictures with ImageKit integration
- 📥 **Export to PDF** - Download your resume as a PDF file
- 🔍 **Live Preview** - Real-time preview of your resume as you edit
- 🎯 **ATS-Friendly** - Templates optimized for Applicant Tracking Systems
- 📧 **Contact Form** - Email-based contact system with auto-responses
- 🎭 **Beautiful Animations** - Smooth page transitions and interactive elements

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Latest React with modern features
- **Vite 7.1.7** - Lightning-fast build tool and dev server
- **Redux Toolkit 2.9.2** - State management
- **React Router DOM 7.9.4** - Client-side routing
- **Tailwind CSS 4.1.16** - Modern utility-first CSS framework
- **Framer Motion 12.23.24** - Advanced animations and transitions
- **Lucide React 0.548.0** - Beautiful icon library
- **React Toastify 11.0.5** - Toast notifications
- **Axios 1.13.1** - HTTP client
- **React Icons 5.5.0** - Additional icon sets

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Modern web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.19.2** - MongoDB object modeling
- **OpenAI API (GPT-4o-mini)** - AI content enhancement
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt 6.0.0** - Secure password hashing
- **ImageKit** - Image hosting and optimization
- **Multer 2.0.2** - File upload handling
- **Nodemailer 7.0.10** - Email service for notifications
- **Compression** - Response compression middleware

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **OpenAI API Key** (for AI features)
- **ImageKit Account** (for image uploads)
- **Email Account** (Gmail/Outlook/Yahoo for email features)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/chamma08/ai-resume-builder.git
cd ai-resume-builder
```

### 2. Install Dependencies

#### Install Server Dependencies
```bash
cd server
npm install
```

#### Install Client Dependencies
```bash
cd ../client
npm install
```

### 3. Environment Variables

#### Server Environment Variables
Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL_NAME=gpt-4o-mini

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# Email Configuration (for contact form and password reset)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
ADMIN_EMAIL=admin@yourdomain.com

# Note: For Gmail, you need to generate an App Password
# 1. Enable 2-Step Verification in your Google Account
# 2. Go to Security > App passwords
# 3. Generate a new app password for "Mail"
# 4. Use this app password in EMAIL_PASS
```

#### Client Environment Variables
Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:3000
```

### 4. Run the Application

#### Start the Backend Server
```bash
cd server
npm run dev
```
The server will run on `http://localhost:3000`

#### Start the Frontend Client
```bash
cd client
npm run dev
```
The client will run on `http://localhost:5173`

### 5. Email Configuration (Important)

The application uses email for:
- Contact form submissions
- Password reset OTP delivery
- Account notifications

#### Gmail Setup (Recommended)
1. Enable 2-Step Verification in your Google Account
2. Go to **Security** > **App passwords**
3. Generate a new app password for "Mail"
4. Use this app password in `EMAIL_PASS` environment variable

#### Alternative Email Providers
The application also supports:
- **Outlook/Hotmail**: Modify `server/configs/email.js` to use Outlook settings
- **Yahoo**: Modify `server/configs/email.js` to use Yahoo settings

**Note**: If you don't configure email, the application will still work, but password reset and contact form features will be disabled.

## � Troubleshooting

### Email Issues
- **"Email configuration error"**: Make sure you've set up `EMAIL_USER` and `EMAIL_PASS` in your `.env` file
- **Gmail authentication failed**: Ensure you're using an App Password, not your regular password
- **OTP not received**: Check spam folder or verify your email configuration

### Database Connection
- **MongoDB connection failed**: Verify your `MONGODB_URI` is correct
- **Connection timeout**: Check your network and MongoDB Atlas whitelist settings

### OpenAI API
- **AI features not working**: Verify your `OPENAI_API_KEY` is valid and has credits
- **Rate limit exceeded**: You've exceeded your OpenAI API quota, check your usage

### Build Issues
- **Module not found**: Run `npm install` in both client and server directories
- **Port already in use**: Change the port in `.env` file or stop the process using that port

## �📁 Project Structure

```
ai-resume-builder/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/        # Images and static files
│   │   ├── components/    # Reusable React components
│   │   │   ├── home/     # Homepage components
│   │   │   ├── ResumeBuilderSections/  # Resume builder components
│   │   │   └── templates/ # Resume templates
│   │   ├── configs/       # API configuration
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store and slices
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Backend Node.js application
│   ├── configs/          # Configuration files
│   │   ├── ai.js         # OpenAI configuration
│   │   ├── db.js         # MongoDB connection
│   │   ├── email.js      # Nodemailer configuration
│   │   ├── imageKit.js   # ImageKit configuration
│   │   └── multer.js     # File upload configuration
│   ├── controllers/      # Route controllers
│   │   ├── aiController.js       # AI enhancement logic
│   │   ├── contactController.js  # Contact form handler
│   │   ├── resumeController.js   # Resume CRUD operations
│   │   └── userController.js     # User authentication & password reset
│   ├── middlewares/      # Custom middlewares
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/           # MongoDB schemas
│   │   ├── Resume.js     # Resume model
│   │   └── User.js       # User model with password reset fields
│   ├── routes/           # API routes
│   │   ├── aiRoute.js
│   │   ├── contactRoute.js
│   │   ├── resumeRoute.js
│   │   └── userRoute.js
│   ├── uploads/          # Uploaded files storage
│   ├── index.js          # Server entry point
│   └── package.json
│
└── README.md
```

## 🔑 Key Features Explained

### AI Content Enhancement
The application uses OpenAI's GPT-4o-mini model to enhance various sections of your resume:
- **Professional Summary**: Generate compelling summaries based on your experience
- **Experience Descriptions**: Improve job descriptions with action verbs and achievements
- **Skills**: Suggest relevant skills based on your profile
- **Project Descriptions**: Enhance project descriptions for better impact

### Password Reset System
Secure OTP-based password recovery:
- Generate 6-digit OTP codes
- 10-minute expiry for security
- Email delivery with professional templates
- Verification step before password change
- Confirmation email after successful reset

### Email System
Integrated email functionality using Nodemailer:
- **Contact Form**: Receive messages from visitors
- **Auto-responses**: Automatic confirmation emails to users
- **Password Reset**: OTP delivery and confirmation emails
- **Professional Templates**: Beautiful HTML email designs
- **Multiple Provider Support**: Gmail, Outlook, Yahoo

### Resume Templates
Choose from 6 professionally designed templates, each optimized for different industries and preferences:
1. **Classic** - Traditional and professional
2. **Modern** - Contemporary design with bold elements
3. **Minimal** - Clean and simple layout
4. **Minimal with Image** - Minimal design with profile picture
5. **Elegant** - Sophisticated and refined
6. **Corporate** - Business-focused design

### User Dashboard
- View all your saved resumes
- Create new resumes from scratch
- Edit existing resumes
- Delete unwanted resumes
- Quick preview and download
- Profile management with image upload

## 🔒 Security Features

- Password hashing with Bcrypt 6.0.0
- JWT-based authentication with 7-day expiry
- Protected API routes with authentication middleware
- Secure file upload handling with Multer
- Environment variable protection
- CORS configuration for cross-origin requests
- OTP-based password reset with 10-minute expiry
- Email verification for password changes
- Secure token generation with crypto module

## 🎨 UI/UX Features

- Smooth animations with Framer Motion
- Responsive design for all screen sizes
- Toast notifications for user feedback
- Loading states and error handling
- Breadcrumb navigation
- Collapsible sections for better organization

## 📚 API Endpoints

### Authentication
- `POST /api/users/sign-up` - Register new user
- `POST /api/users/sign-in` - User login
- `POST /api/users/forgot-password` - Request password reset OTP
- `POST /api/users/verify-otp` - Verify OTP code
- `POST /api/users/reset-password` - Reset password with OTP
- `GET /api/users/get-user` - Get authenticated user profile

### Resume Management
- `GET /api/resumes` - Get all user resumes
- `GET /api/resumes/:id` - Get specific resume
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

### AI Enhancement
- `POST /api/ai/enhance-summary` - Enhance professional summary
- `POST /api/ai/enhance-experience` - Enhance experience descriptions
- `POST /api/ai/suggest-skills` - Get skill suggestions

### Contact
- `POST /api/contact/send` - Send contact form email

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Chamma08**
- GitHub: [@chamma08](https://github.com/chamma08)

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- ImageKit for image hosting
- All the open-source libraries used in this project

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact via GitHub profile

## 📝 Changelog

### Version 2.0.0 (Latest)
**New Features:**
- ✨ Added OTP-based password reset functionality
- 📧 Integrated Nodemailer for email services
- 📮 Contact form with email notifications
- 🎨 Professional HTML email templates
- 🔐 Enhanced security with crypto-based OTP generation
- 📱 Email support for Gmail, Outlook, and Yahoo

**Updates:**
- ⬆️ Upgraded to React 19.1.1
- ⬆️ Upgraded to Express.js 5.1.0
- ⬆️ Upgraded to Tailwind CSS 4.1.16
- ⬆️ Updated all dependencies to latest versions
- 🚀 Improved performance with compression middleware
- 🎭 Enhanced UI animations with Framer Motion 12.23.24

**Improvements:**
- 🛡️ Better error handling for email services
- 📋 Extended User model with password reset fields
- 🔄 Added verification step for OTP validation
- 💌 Auto-response emails for contact form submissions
- 🎨 Improved email template designs

### Version 1.0.0
- 🎉 Initial release
- 🤖 AI-powered resume enhancement
- 📄 6 professional resume templates
- 👤 User authentication system
- 💾 Resume management dashboard
- 📸 Image upload functionality

## 🎯 Future Enhancements

- [ ] LinkedIn profile import
- [ ] Cover letter generator with AI
- [ ] More template options
- [ ] Multi-language support
- [ ] Resume scoring and ATS optimization suggestions
- [ ] Export to Word format
- [ ] Social media integration
- [ ] Collaborative editing
- [ ] Resume analytics and insights
- [ ] Two-factor authentication
- [ ] Dark mode support
- [ ] Resume version history

---

⭐ If you found this project helpful, please give it a star!

Made with ❤️ by Chamma08
