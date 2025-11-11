# 🚀 AI Resume Builder

A modern, full-stack MERN application that helps users create professional resumes with AI-powered content enhancement and gamification. Built with React, Node.js, Express, and MongoDB, featuring multiple professional templates, intelligent content suggestions, and a comprehensive points-based reward system.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)

## 📋 Table of Contents

- [✨ Core Features](#-core-features)
- [🎯 Points System Features](#-points-system-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Getting Started](#-getting-started)
- [⚠️ Troubleshooting](#️-troubleshooting)
- [📁 Project Structure](#-project-structure)
- [🔑 Key Features Explained](#-key-features-explained)
- [🔒 Security Features](#-security-features)
- [🎨 UI/UX Features](#-uiux-features)
- [📚 API Endpoints](#-api-endpoints)
- [🗄️ Database Models](#️-database-models)
- [📝 Changelog](#-changelog)
- [🎯 Points Economy Details](#-points-economy-details)
- [🚀 Deployment Guide](#-deployment-guide)
- [🔮 Future Enhancements](#-future-enhancements)
- [🐛 Known Issues & Limitations](#-known-issues--limitations)
- [🧪 Testing Checklist](#-testing-checklist)
- [📊 Performance Optimization](#-performance-optimization)
- [🔐 Security Best Practices](#-security-best-practices)
- [📝 Important Notes](#-important-notes)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [👨‍💻 Author](#-author)
- [🙏 Acknowledgments](#-acknowledgments)
- [📞 Support & Contact](#-support--contact)

## ✨ Core Features

### 🤖 AI-Powered Content Enhancement
- Leverage OpenAI GPT-4o-mini to enhance professional summaries
- Intelligent experience descriptions and project highlights
- Smart skill suggestions and keyword optimization
- Context-aware content improvements

### 📄 Professional Resume Templates (8 Templates)
Choose from beautifully designed, ATS-optimized templates:
- **Free Templates** (0 points unlock):
  - Classic Template - Traditional and professional
  - Minimal Template - Clean and modern
  
- **Premium Templates** (100 points unlock):
  - Modern Template - Contemporary design
  - Elegant Template - Sophisticated layout
  - Minimal Image Template - Clean with photo support
  
- **Elite Templates** (200 points unlock):
  - ATS Template - Applicant Tracking System optimized
  - ATS Image Template - ATS-friendly with photo
  - Corporate Template - Professional business style

### 🎮 Gamification System
- **Points Economy**: Earn and spend points on various actions
- **5-Tier Level System**: Bronze → Silver → Gold → Platinum → Diamond
- **Achievement Badges**: Unlock badges for milestones
- **Leaderboard**: Compete with other users globally
- **Activity History**: Track all your points transactions
- **Referral System**: Earn bonus points by inviting friends

### � Authentication & Security
- Secure JWT-based authentication
- Bcrypt password hashing
- OTP-based password reset via email
- Protected routes and API endpoints
- Session management

### 🎨 User Experience
- **Customizable Color Themes** - Personalize resume with custom colors
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Live Preview** - Real-time resume preview as you edit
- **Drag & Drop** - Easy file uploads and reordering
- **Beautiful Animations** - Smooth Framer Motion transitions
- **Toast Notifications** - Real-time user feedback

## 🎯 Points System Features

### Earn Points By:
- **Sign Up**: +100 points (Welcome bonus)
- **Complete Profile**: +150 points
- **Create Resume**: +50 points per resume
- **Daily Login**: +10 points
- **Social Media Follow**: +20 points per platform (Twitter, LinkedIn, Facebook, Instagram, YouTube)
- **Referral**: +300 points when someone signs up with your code
- **Level Up**: +100 points on each level progression
- **Weekly Streak**: +50 points
- **Monthly Streak**: +200 points

### Spend Points On:
- **CV Download (Basic)**: 10 points
- **CV Download (Premium)**: 25 points
- **CV Download (Elite)**: 50 points
- **Template Unlock (Premium)**: 100 points (one-time)
- **Template Unlock (Elite)**: 200 points (one-time)
- **AI Suggestions (Basic)**: 5 points
- **AI Suggestions (Advanced)**: 15 points

### Level Progression:
- 🥉 **Bronze**: 0-99 points (Starting level)
- 🥈 **Silver**: 100-299 points
- 🥇 **Gold**: 300-599 points
- 💎 **Platinum**: 600-999 points
- 💠 **Diamond**: 1000+ points (Elite level)

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Latest React with modern features
- **Vite 7.1.7** - Lightning-fast build tool and dev server
- **Redux Toolkit 2.9.2** - Global state management with slices
- **React Router DOM 7.9.4** - Client-side routing and navigation
- **Tailwind CSS 4.1.16** - Modern utility-first CSS framework
- **Framer Motion 12.23.24** - Advanced animations and transitions
- **Lucide React 0.548.0** - Beautiful, consistent icon library
- **React Toastify 11.0.5** - Elegant toast notifications
- **Axios 1.13.1** - Promise-based HTTP client
- **React Icons 5.5.0** - Additional icon sets (Fa, Ai, Bi, etc.)

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 5.1.0** - Fast, minimalist web framework
- **MongoDB** - NoSQL document database
- **Mongoose 8.19.2** - Elegant MongoDB object modeling
- **OpenAI API (GPT-4o-mini)** - AI-powered content enhancement
- **JWT (jsonwebtoken 9.0.2)** - Secure authentication tokens
- **Bcrypt 6.0.0** - Industry-standard password hashing
- **ImageKit 6.0.0** - Cloud-based image hosting and optimization
- **Multer 2.0.2** - Multipart/form-data file upload handling
- **Nodemailer 7.0.10** - Email sending service
- **Compression 1.8.1** - Response compression middleware
- **CORS 2.8.5** - Cross-Origin Resource Sharing

### Development Tools
- **ESLint** - Code linting and quality checks
- **Nodemon** - Auto-restart development server
- **Terser** - JavaScript minification for production
- **SWC** - Super-fast JavaScript/TypeScript compiler

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

## 📁 Project Structure

```
ai-resume-builder/
├── client/                           # Frontend React application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── assets/                  # Images, icons, and static files
│   │   │   ├── assets.js           # Asset exports
│   │   │   ├── assets/             # General assets
│   │   │   └── users/              # User uploaded images
│   │   ├── components/             # Reusable React components
│   │   │   ├── home/               # Homepage components
│   │   │   │   ├── AnimatedText.jsx
│   │   │   │   ├── Banner.jsx
│   │   │   │   ├── Contact.jsx
│   │   │   │   ├── Features.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── Testimonial.jsx
│   │   │   │   └── Title.jsx
│   │   │   ├── modals/             # Modal components
│   │   │   │   └── DownloadConfirmModal.jsx
│   │   │   ├── points/             # Points system components
│   │   │   │   └── PointsDisplay.jsx
│   │   │   ├── ResumeBuilderSections/  # Resume builder components
│   │   │   │   ├── ColorPicker.jsx
│   │   │   │   ├── Education.jsx
│   │   │   │   ├── Experience.jsx
│   │   │   │   ├── PersonalInfo.jsx
│   │   │   │   ├── ProfessionalSummary.jsx
│   │   │   │   ├── Project.jsx
│   │   │   │   ├── ResumePreview.jsx
│   │   │   │   ├── Skills.jsx
│   │   │   │   └── TemplateSelector.jsx
│   │   │   ├── templates/          # Resume templates (8 templates)
│   │   │   │   ├── ATSImageTemplate.jsx
│   │   │   │   ├── ATSTemplate.jsx
│   │   │   │   ├── ClassicTemplate.jsx
│   │   │   │   ├── CorporateTemplate.jsx
│   │   │   │   ├── ElegantTemplate.jsx
│   │   │   │   ├── MinimalImageTemplate.jsx
│   │   │   │   ├── MinimalTemplate.jsx
│   │   │   │   └── ModernTemplate.jsx
│   │   │   ├── Breadcrumb.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── NotFound.jsx
│   │   ├── configs/                # Configuration files
│   │   │   └── api.js              # API base URL configuration
│   │   ├── pages/                  # Page components (Route pages)
│   │   │   ├── ActivityHistory.jsx  # Points activity history
│   │   │   ├── Dashboard.jsx        # User dashboard
│   │   │   ├── ForgotPassword.jsx   # Password reset request
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Layout.jsx           # Main layout wrapper
│   │   │   ├── Leaderboard.jsx      # Global leaderboard
│   │   │   ├── PointsDashboard.jsx  # Points overview
│   │   │   ├── Preview.jsx          # Resume preview page
│   │   │   ├── ReferralPage.jsx     # Referral system
│   │   │   ├── ResetPassword.jsx    # Password reset with OTP
│   │   │   ├── ResumeBuilder.jsx    # Resume builder page
│   │   │   ├── SignIn.jsx           # Sign in page
│   │   │   └── SignUp.jsx           # Sign up page
│   │   ├── redux/                  # Redux state management
│   │   │   ├── features/           # Redux slices
│   │   │   └── store.js            # Redux store configuration
│   │   ├── App.jsx                 # Main App component with routes
│   │   ├── index.css               # Global styles
│   │   └── main.jsx                # Entry point
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                         # Backend Node.js application
│   ├── configs/                    # Configuration files
│   │   ├── ai.js                  # OpenAI GPT-4o-mini configuration
│   │   ├── db.js                  # MongoDB connection setup
│   │   ├── email.js               # Nodemailer email configuration
│   │   ├── imageKit.js            # ImageKit image hosting setup
│   │   └── multer.js              # File upload middleware config
│   ├── controllers/                # Route controllers (Business logic)
│   │   ├── aiController.js        # AI content enhancement logic
│   │   ├── contactController.js   # Contact form handler
│   │   ├── pointsController.js    # Points system logic
│   │   ├── resumeController.js    # Resume CRUD operations
│   │   └── userController.js      # User auth & profile management
│   ├── middlewares/                # Custom middleware functions
│   │   └── authMiddleware.js      # JWT token verification
│   ├── models/                     # MongoDB Mongoose schemas
│   │   ├── Activity.js            # Points activity tracking
│   │   ├── Resume.js              # Resume data model
│   │   ├── Transaction.js         # Points transaction model
│   │   └── User.js                # User model with points system
│   ├── routes/                     # API route definitions
│   │   ├── aiRoute.js             # /api/ai/* endpoints
│   │   ├── contactRoute.js        # /api/contact/* endpoints
│   │   ├── pointsRoute.js         # /api/points/* endpoints
│   │   ├── resumeRoute.js         # /api/resume/* endpoints
│   │   └── userRoute.js           # /api/user/* endpoints
│   ├── uploads/                    # Temporary file upload storage
│   ├── utils/                      # Utility functions
│   │   └── pointsManager.js       # Points calculation utilities
│   ├── index.js                    # Server entry point & Express setup
│   └── package.json
│
├── Documentation Files              # Project documentation
│   ├── ACTIVITY-HISTORY-FIX.md
│   ├── DATABASE-MODELS.md
│   ├── ENHANCED-POINTS-SYSTEM-OVERVIEW.md
│   ├── FIXES-SUMMARY.md
│   ├── IMPLEMENTATION-ROADMAP.md
│   ├── IMPLEMENTATION-SUMMARY.md
│   ├── PAYMENT-GATEWAY-INTEGRATION.md
│   ├── POINTS-DEDUCTION-SYSTEM.md
│   ├── POINTS-SYSTEM-IMPLEMENTATION.md
│   ├── POINTS-UPDATE-SUMMARY.md
│   ├── PROJECT-WALKTHROUGH-SUMMARY.md
│   ├── SOCIAL-MEDIA-FOLLOW-FIX.md
│   ├── SWIMLANE-DIAGRAM.md
│   ├── TEMPLATE-UNLOCK-SYSTEM.md
│   └── TESTING-CHECKLIST.md
│
└── README.md                       # This file
```

## 🔑 Key Features Explained

### 🤖 AI Content Enhancement
The application uses OpenAI's GPT-4o-mini model to enhance various sections of your resume:
- **Professional Summary**: Generate compelling summaries based on your experience
- **Experience Descriptions**: Improve job descriptions with action verbs and achievements
- **Skills**: Suggest relevant skills based on your profile
- **Project Descriptions**: Enhance project descriptions for better impact

### 🎮 Points System
Complete gamification system with rewards and levels:
- **Point Earning**: Sign up bonus, profile completion, resume creation, social follows, referrals
- **Point Spending**: CV downloads, AI suggestions, template unlocking
- **Level Progression**: Bronze → Silver → Gold → Platinum → Diamond
- **Activity Tracking**: Complete history of all point transactions
- **Leaderboard**: Global ranking of top users
- **Referral Rewards**: Earn points by inviting friends

### 🔐 Password Reset System
Secure OTP-based password recovery:
- Generate 6-digit OTP codes
- 10-minute expiry for security
- Email delivery with professional templates
- Verification step before password change
- Confirmation email after successful reset

### 📧 Email System
Integrated email functionality using Nodemailer:
- **Contact Form**: Receive messages from visitors
- **Auto-responses**: Automatic confirmation emails to users
- **Password Reset**: OTP delivery and confirmation emails
- **Professional Templates**: Beautiful HTML email designs
- **Multiple Provider Support**: Gmail, Outlook, Yahoo

### 📄 Resume Templates (8 Templates)
Choose from professionally designed, ATS-optimized templates:

**Free Templates (0 points)**:
1. **Classic** - Traditional and professional
2. **Minimal** - Clean and simple layout

**Premium Templates (100 points to unlock)**:
3. **Modern** - Contemporary design with bold elements
4. **Elegant** - Sophisticated and refined
5. **Minimal with Image** - Clean design with profile picture

**Elite Templates (200 points to unlock)**:
6. **ATS Template** - Applicant Tracking System optimized
7. **ATS Image Template** - ATS-friendly with profile photo
8. **Corporate** - Professional business style

### 📊 User Dashboard
- View all your saved resumes in one place
- Create new resumes from scratch
- Edit existing resumes with live preview
- Delete unwanted resumes
- Quick preview and download options
- Profile management with image upload
- Points balance and level display
- Activity history tracking

## 🔒 Security Features

- **Password Encryption**: Bcrypt 6.0.0 with salt rounds
- **JWT Authentication**: Token-based auth with 7-day expiry
- **Protected Routes**: Middleware authentication on all protected endpoints
- **Secure File Upload**: Multer with file type and size validation
- **Environment Variables**: Sensitive data protected with dotenv
- **CORS**: Configured for secure cross-origin requests
- **OTP Security**: 6-digit codes with 10-minute expiration
- **Email Verification**: Required for password changes
- **Crypto Module**: Secure random token generation

## 🎨 UI/UX Features

- **Smooth Animations**: Framer Motion for page transitions and micro-interactions
- **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- **Toast Notifications**: Real-time feedback with React Toastify
- **Loading States**: Skeleton loaders and spinners for better UX
- **Error Handling**: Graceful error messages and fallbacks
- **Breadcrumb Navigation**: Always know where you are
- **Collapsible Sections**: Clean, organized interface
- **Live Preview**: Real-time resume preview as you type
- **Color Picker**: Visual color selection for templates
- **Modal Confirmations**: Clear user confirmations for important actions

## 📚 API Endpoints

### User Authentication
- `POST /api/user/sign-up` - Register new user (awards 100 points)
- `POST /api/user/sign-in` - User login
- `POST /api/user/forgot-password` - Request password reset OTP
- `POST /api/user/verify-otp` - Verify OTP code
- `POST /api/user/reset-password` - Reset password with OTP
- `GET /api/user/get-user` - Get authenticated user profile
- `PUT /api/user/update-profile` - Update user profile information
- `POST /api/user/upload-image` - Upload profile picture

### Points System
- `GET /api/points/me` - Get current user's points and level
- `POST /api/points/award` - Award points for activities
- `GET /api/points/activities` - Get user's activity history
- `GET /api/points/leaderboard` - Get global leaderboard
- `POST /api/points/follow` - Record social media follow (one-time reward)
- `GET /api/points/referral-code` - Generate user's referral code
- `POST /api/points/validate-referral` - Validate and apply referral code

### Resume Management
- `GET /api/resume/all` - Get all user resumes (protected)
- `GET /api/resume/:id` - Get specific resume by ID (protected)
- `POST /api/resume/create` - Create new resume (protected, awards 50 points)
- `PUT /api/resume/update/:id` - Update existing resume (protected)
- `DELETE /api/resume/delete/:id` - Delete resume (protected)
- `GET /api/resume/download/:id` - Download resume as PDF (protected, costs points)

### AI Enhancement
- `POST /api/ai/enhance-summary` - Enhance professional summary with AI
- `POST /api/ai/enhance-experience` - Enhance experience descriptions
- `POST /api/ai/suggest-skills` - Get intelligent skill suggestions
- `POST /api/ai/enhance-project` - Enhance project descriptions

### Contact
- `POST /api/contact/send` - Send contact form message via email

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

## �️ Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  profilePicture: String,
  
  // Points System
  points: Number (default: 0),
  level: String (Bronze/Silver/Gold/Platinum/Diamond),
  badges: [String],
  
  // Referral System
  referralCode: String (unique),
  referredBy: ObjectId (ref: User),
  referrals: [ObjectId] (ref: User),
  
  // Social Media
  socialMediaFollows: {
    twitter: Boolean,
    linkedin: Boolean,
    facebook: Boolean,
    instagram: Boolean,
    youtube: Boolean
  },
  
  // Statistics
  stats: {
    resumesCreated: Number,
    resumesDownloaded: Number,
    profileCompleted: Boolean,
    firstResumeBonus: Boolean,
    dailyLoginStreak: Number,
    lastLoginDate: Date
  },
  
  // Password Reset
  resetPasswordOTP: String,
  resetPasswordExpires: Date,
  
  timestamps: true
}
```

### Resume Model
```javascript
{
  userId: ObjectId (ref: User),
  templateType: String,
  templateColor: String,
  
  personalInfo: {
    name, email, phone, location, linkedin, website, github, profilePicture
  },
  
  professionalSummary: String,
  
  experience: [{
    jobTitle, company, location, startDate, endDate, current, description
  }],
  
  education: [{
    degree, institution, location, startDate, endDate, current, description
  }],
  
  projects: [{
    projectName, description, technologies, startDate, endDate, current, link
  }],
  
  skills: {
    technical: [String],
    soft: [String],
    languages: [String],
    tools: [String]
  },
  
  timestamps: true
}
```

### Activity Model
```javascript
{
  user: ObjectId (ref: User),
  type: String (SIGNUP, RESUME_CREATED, SOCIAL_FOLLOW, etc.),
  points: Number,
  description: String,
  metadata: Object,
  createdAt: Date
}
```

### Transaction Model
```javascript
{
  user: ObjectId (ref: User),
  type: String (EARN_*, SPEND_*, PURCHASE_*, REFUND_*, etc.),
  amount: Number,
  balance_before: Number,
  balance_after: Number,
  status: String (pending/completed/failed/refunded),
  description: String,
  metadata: Object,
  createdAt: Date
}
```

## �📝 Changelog

### Version 3.0.0 (Current - Points System Branch)
**New Features:**
- 🎮 Complete gamification system with points and levels
- 🏆 5-tier level progression (Bronze → Diamond)
- 📊 Activity history tracking
- 🥇 Global leaderboard
- 🤝 Referral system with bonus points
- 📱 Social media follow rewards
- 💎 Achievement badges
- 🎯 Points-based template unlocking system
- 💰 Points deduction on CV downloads
- 📈 Comprehensive analytics dashboard

**Database Updates:**
- ✅ Added Activity model for tracking all point-earning activities
- ✅ Added Transaction model for detailed transaction logging
- ✅ Enhanced User model with points, levels, badges, referrals, and stats
- ✅ Added social media follow tracking

**Backend Enhancements:**
- ✅ Created pointsController.js with 6+ endpoints
- ✅ Implemented pointsManager utility for calculations
- ✅ Added points routes (/api/points/*)
- ✅ Integrated points award system in user signup
- ✅ Added referral code generation and validation

**Frontend Updates:**
- ✅ Created PointsDashboard page
- ✅ Created ActivityHistory page
- ✅ Created Leaderboard page
- ✅ Created ReferralPage
- ✅ Added PointsDisplay component
- ✅ Integrated points system in Redux

### Version 2.0.0
**New Features:**
- ✨ OTP-based password reset functionality
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

### Version 1.0.0
**Initial Release:**
- ✨ Basic resume builder functionality
- 🤖 AI-powered content enhancement
- 📄 6 professional resume templates
- 👤 User authentication and authorization
- 💾 Resume save and management
- 📸 Profile picture upload
- 📥 PDF export functionality

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

# 🪙 POINTS SYSTEM IMPLEMENTATION GUIDE

## Overview
This guide provides complete code implementation for a points-based system where users can:
- Earn points by following social media (Instagram, Facebook, TikTok - 1 point each)
- Spend 1 point to download CVs
- Spend 2-4 points to unlock premium templates
- Purchase points through Stripe payment gateway

---

## 📦 Dependencies to Install

### Server Dependencies
```bash
cd server
npm install stripe
```

### Client Dependencies
```bash
cd client
npm install @stripe/stripe-js react-hot-toast
```

---

## 🔧 Environment Variables

### Server `.env` - Add these variables:
```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Client URL (for payment redirects)
CLIENT_URL=http://localhost:5173
```

### Client `.env` - Add this variable:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

> **Note**: Get your Stripe keys from https://dashboard.stripe.com/test/apikeys

---

## 🗄️ Database Models

### 1. Update User Model - `server/models/User.js`

Replace the entire file with:

```javascript
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0
    },
    social_follows: {
        instagram: {
            type: Boolean,
            default: false
        },
        facebook: {
            type: Boolean,
            default: false
        },
        tiktok: {
            type: Boolean,
            default: false
        }
    },
    unlocked_templates: {
        type: [String],
        default: ['classic', 'ats'] // Free templates
    },
    downloads_count: {
        type: Number,
        default: 0
    },
    points_history: [{
        action: {
            type: String,
            enum: ['earn_social', 'download_cv', 'unlock_template', 'purchase', 'admin_adjustment'],
            required: true
        },
        points: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    resetPasswordOTP: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    }
}, { timestamps: true })

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
```

### 2. Create Transaction Model - `server/models/Transaction.js`

Create new file:

```javascript
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: "USD"
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentProvider: {
        type: String,
        enum: ['stripe', 'paypal'],
        default: 'stripe'
    },
    sessionId: {
        type: String,
        required: true
    },
    paymentIntentId: {
        type: String,
        default: null
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
```

---

## 🎮 Controllers

### 3. Create Points Controller - `server/controllers/pointsController.js`

Create new file:

```javascript
import User from "../models/User.js";

// Claim points for following social media
export const claimSocialPoints = async (req, res) => {
    try {
        const userId = req.userId;
        const { platform } = req.body;

        // Validate platform
        if (!['instagram', 'facebook', 'tiktok'].includes(platform)) {
            return res.status(400).json({ message: "Invalid platform" });
        }

        // Get user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if already claimed
        if (user.social_follows[platform]) {
            return res.status(400).json({ 
                message: `You have already claimed points for ${platform}` 
            });
        }

        // Update user - add 1 point and mark social media as followed
        user.points += 1;
        user.social_follows[platform] = true;
        user.points_history.push({
            action: 'earn_social',
            points: 1,
            description: `Earned 1 point for following on ${platform}`
        });

        await user.save();

        return res.status(200).json({
            message: `Successfully earned 1 point for following on ${platform}`,
            points: user.points,
            social_follows: user.social_follows
        });
    } catch (error) {
        console.error("Claim social points error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get user points and history
export const getPointsInfo = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).select('points social_follows unlocked_templates points_history downloads_count');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            points: user.points,
            social_follows: user.social_follows,
            unlocked_templates: user.unlocked_templates,
            downloads_count: user.downloads_count,
            points_history: user.points_history
        });
    } catch (error) {
        console.error("Get points info error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Unlock premium template
export const unlockTemplate = async (req, res) => {
    try {
        const userId = req.userId;
        const { templateName, cost } = req.body;

        // Template costs
        const templateCosts = {
            'modern': 2,
            'elegant': 3,
            'minimal': 2,
            'corporate': 3,
            'minimal-image': 4,
            'ats-image': 4
        };

        // Validate template
        if (!templateCosts[templateName]) {
            return res.status(400).json({ message: "Invalid template" });
        }

        // Validate cost
        if (cost !== templateCosts[templateName]) {
            return res.status(400).json({ message: "Invalid cost for template" });
        }

        // Get user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if already unlocked
        if (user.unlocked_templates.includes(templateName)) {
            return res.status(400).json({ 
                message: "Template already unlocked" 
            });
        }

        // Check if user has enough points
        if (user.points < cost) {
            return res.status(403).json({ 
                message: "Not enough points to unlock this template",
                required: cost,
                current: user.points
            });
        }

        // Deduct points and unlock template
        user.points -= cost;
        user.unlocked_templates.push(templateName);
        user.points_history.push({
            action: 'unlock_template',
            points: -cost,
            description: `Unlocked ${templateName} template for ${cost} points`
        });

        await user.save();

        return res.status(200).json({
            message: `Successfully unlocked ${templateName} template`,
            points: user.points,
            unlocked_templates: user.unlocked_templates
        });
    } catch (error) {
        console.error("Unlock template error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
```

### 4. Create Payment Controller - `server/controllers/paymentController.js`

Create new file:

```javascript
import Stripe from "stripe";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import transporter from "../configs/email.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Points packages
const POINTS_PACKAGES = {
    '5pts': { points: 5, price: 299, label: '5 Points' },
    '10pts': { points: 10, price: 499, label: '10 Points' },
    '25pts': { points: 25, price: 999, label: '25 Points' },
    '50pts': { points: 50, price: 1699, label: '50 Points' }
};

// Create Stripe checkout session
export const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.userId;
        const { packageId } = req.body;

        // Validate package
        const selectedPackage = POINTS_PACKAGES[packageId];
        if (!selectedPackage) {
            return res.status(400).json({ message: "Invalid package selected" });
        }

        // Get user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${selectedPackage.label} - AI Resume Builder`,
                            description: `Purchase ${selectedPackage.points} points for downloading resumes and unlocking templates`,
                        },
                        unit_amount: selectedPackage.price,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/dashboard?payment=success`,
            cancel_url: `${process.env.CLIENT_URL}/dashboard?payment=cancelled`,
            metadata: {
                userId: userId.toString(),
                points: selectedPackage.points.toString(),
                packageId: packageId
            },
            customer_email: user.email,
        });

        // Create pending transaction
        await Transaction.create({
            userId: userId,
            points: selectedPackage.points,
            amount: selectedPackage.price / 100, // Convert cents to dollars
            status: 'pending',
            sessionId: session.id,
            metadata: {
                packageId: packageId,
                label: selectedPackage.label
            }
        });

        return res.status(200).json({
            sessionId: session.id,
            url: session.url
        });
    } catch (error) {
        console.error("Create checkout session error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Stripe webhook handler
export const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        try {
            const userId = session.metadata.userId;
            const points = parseInt(session.metadata.points);

            // Update user points
            const user = await User.findById(userId);
            if (!user) {
                console.error("User not found for completed payment:", userId);
                return res.status(404).json({ message: "User not found" });
            }

            user.points += points;
            user.points_history.push({
                action: 'purchase',
                points: points,
                description: `Purchased ${points} points for $${(session.amount_total / 100).toFixed(2)}`
            });
            await user.save();

            // Update transaction status
            await Transaction.findOneAndUpdate(
                { sessionId: session.id },
                { 
                    status: 'completed',
                    paymentIntentId: session.payment_intent
                }
            );

            // Send receipt email
            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: "Payment Confirmation - AI Resume Builder",
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #3B82F6;">Payment Successful! 🎉</h2>
                            <p>Hi ${user.name},</p>
                            <p>Thank you for your purchase! Your points have been added to your account.</p>
                            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                <h3 style="margin-top: 0;">Purchase Details:</h3>
                                <p><strong>Points Added:</strong> ${points} points</p>
                                <p><strong>Amount Paid:</strong> $${(session.amount_total / 100).toFixed(2)} USD</p>
                                <p><strong>Current Balance:</strong> ${user.points} points</p>
                            </div>
                            <p>You can now use your points to:</p>
                            <ul>
                                <li>Download your professional resumes (1 point per download)</li>
                                <li>Unlock premium templates (2-4 points per template)</li>
                            </ul>
                            <p>Visit your <a href="${process.env.CLIENT_URL}/dashboard" style="color: #3B82F6;">dashboard</a> to start using your points.</p>
                            <p>Best regards,<br>AI Resume Builder Team</p>
                        </div>
                    `
                });
            } catch (emailError) {
                console.error("Failed to send receipt email:", emailError);
            }

            console.log(`✅ Payment successful: ${points} points added to user ${userId}`);
        } catch (error) {
            console.error("Error processing completed payment:", error);
            return res.status(500).json({ message: "Error processing payment" });
        }
    }

    res.json({ received: true });
};

// Get user transactions
export const getUserTransactions = async (req, res) => {
    try {
        const userId = req.userId;

        const transactions = await Transaction.find({ userId })
            .sort({ createdAt: -1 })
            .limit(20);

        return res.status(200).json({ transactions });
    } catch (error) {
        console.error("Get user transactions error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get points packages info
export const getPointsPackages = async (req, res) => {
    try {
        const packages = Object.entries(POINTS_PACKAGES).map(([id, pkg]) => ({
            id,
            ...pkg,
            price: pkg.price / 100 // Convert to dollars
        }));

        return res.status(200).json({ packages });
    } catch (error) {
        console.error("Get points packages error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
```

### 5. Update Resume Controller - `server/controllers/resumeController.js`

Add this import at the top:
```javascript
import User from "../models/User.js";
```

Add this function at the end of the file (before the closing):
```javascript
// Download resume with points deduction
export const downloadResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    // Get user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user has enough points
    if (user.points < 1) {
      return res.status(403).json({ 
        message: "Not enough points to download. Follow social media or purchase points.",
        required: 1,
        current: user.points
      });
    }

    // Get resume
    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Deduct 1 point
    user.points -= 1;
    user.downloads_count += 1;
    user.points_history.push({
      action: 'download_cv',
      points: -1,
      description: `Downloaded resume: ${resume.title}`
    });
    await user.save();

    // Return resume data for PDF generation on client side
    return res.status(200).json({
      message: "Resume download initiated",
      points: user.points,
      resume: resume
    });
  } catch (error) {
    console.error("Download resume error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
```

---

## 🛣️ Routes

### 6. Create Points Route - `server/routes/pointsRoute.js`

Create new file:

```javascript
import express from "express";
import { claimSocialPoints, getPointsInfo, unlockTemplate } from "../controllers/pointsController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get user points information
router.get("/info", verifyToken, getPointsInfo);

// Claim points for following social media
router.post("/claim-social", verifyToken, claimSocialPoints);

// Unlock premium template
router.post("/unlock-template", verifyToken, unlockTemplate);

export default router;
```

### 7. Create Payment Route - `server/routes/paymentRoute.js`

Create new file:

```javascript
import express from "express";
import { 
    createCheckoutSession, 
    handleStripeWebhook, 
    getUserTransactions,
    getPointsPackages 
} from "../controllers/paymentController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get points packages
router.get("/packages", getPointsPackages);

// Create Stripe checkout session
router.post("/create-checkout", verifyToken, createCheckoutSession);

// Stripe webhook (no auth required, Stripe signature verification instead)
router.post("/webhook", express.raw({ type: 'application/json' }), handleStripeWebhook);

// Get user transactions
router.get("/transactions", verifyToken, getUserTransactions);

export default router;
```

### 8. Update Resume Route - `server/routes/resumeRoute.js`

Add the import at the top:
```javascript
import { downloadResume } from "../controllers/resumeController.js";
```

Add this route with your other routes:
```javascript
router.post("/download-resume/:resumeId", protect, downloadResume);
```

### 9. Update Server Index - `server/index.js`

Add these imports:
```javascript
import pointsRoutes from "./routes/pointsRoute.js";
import paymentRoutes from "./routes/paymentRoute.js";
```

Update middleware section (BEFORE `app.use(express.json())`):
```javascript
// Stripe webhook needs raw body, so we add it before express.json()
app.use("/api/payment/webhook", express.raw({ type: 'application/json' }));
```

Add these routes with your other routes:
```javascript
app.use("/api/points", pointsRoutes);
app.use("/api/payment", paymentRoutes);
```

---

## ⚛️ Frontend - Redux

### 10. Create Points Slice - `client/src/redux/features/pointsSlice.js`

Create new file:

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    points: 0,
    social_follows: {
        instagram: false,
        facebook: false,
        tiktok: false
    },
    unlocked_templates: ['classic', 'ats'],
    downloads_count: 0,
    points_history: [],
    loading: false,
    error: null
};

const pointsSlice = createSlice({
    name: 'points',
    initialState,
    reducers: {
        setPointsData: (state, action) => {
            state.points = action.payload.points || 0;
            state.social_follows = action.payload.social_follows || initialState.social_follows;
            state.unlocked_templates = action.payload.unlocked_templates || initialState.unlocked_templates;
            state.downloads_count = action.payload.downloads_count || 0;
            state.points_history = action.payload.points_history || [];
        },
        updatePoints: (state, action) => {
            state.points = action.payload;
        },
        addPoints: (state, action) => {
            state.points += action.payload;
        },
        deductPoints: (state, action) => {
            state.points -= action.payload;
        },
        setSocialFollow: (state, action) => {
            const { platform } = action.payload;
            state.social_follows[platform] = true;
        },
        unlockTemplate: (state, action) => {
            const { templateName } = action.payload;
            if (!state.unlocked_templates.includes(templateName)) {
                state.unlocked_templates.push(templateName);
            }
        },
        incrementDownloads: (state) => {
            state.downloads_count += 1;
        },
        addPointsHistory: (state, action) => {
            state.points_history.unshift(action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetPoints: (state) => {
            return initialState;
        }
    }
});

export const {
    setPointsData,
    updatePoints,
    addPoints,
    deductPoints,
    setSocialFollow,
    unlockTemplate,
    incrementDownloads,
    addPointsHistory,
    setLoading,
    setError,
    resetPoints
} = pointsSlice.actions;

export default pointsSlice.reducer;
```

### 11. Update Redux Store - `client/src/redux/store.js`

Add the import:
```javascript
import pointsReducer from "./features/pointsSlice";
```

Update the reducer:
```javascript
export const store = configureStore({
    reducer: {
        auth: authReducer,
        points: pointsReducer
    },
})
```

---

## 🎨 Frontend - Components

### 12. Create EarnPoints Component - `client/src/components/points/EarnPoints.jsx`

Create new file:

```javascript
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSocialFollow, addPoints } from '../../redux/features/pointsSlice';
import { toast } from 'react-hot-toast';

const EarnPoints = () => {
    const dispatch = useDispatch();
    const { points, social_follows } = useSelector((state) => state.points);
    const [loading, setLoading] = useState({
        instagram: false,
        facebook: false,
        tiktok: false
    });

    const socialLinks = {
        instagram: 'https://instagram.com/your-page',
        facebook: 'https://facebook.com/your-page',
        tiktok: 'https://tiktok.com/@your-page'
    };

    const handleFollowClick = (platform) => {
        window.open(socialLinks[platform], '_blank');
    };

    const handleClaimPoints = async (platform) => {
        try {
            setLoading({ ...loading, [platform]: true });
            
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:3000/api/points/claim-social',
                { platform },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            dispatch(setSocialFollow({ platform }));
            dispatch(addPoints(1));
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to claim points');
        } finally {
            setLoading({ ...loading, [platform]: false });
        }
    };

    const socialPlatforms = [
        {
            name: 'instagram',
            label: 'Instagram',
            icon: '📷',
            color: 'bg-gradient-to-r from-purple-500 to-pink-500'
        },
        {
            name: 'facebook',
            label: 'Facebook',
            icon: '📘',
            color: 'bg-blue-600'
        },
        {
            name: 'tiktok',
            label: 'TikTok',
            icon: '🎵',
            color: 'bg-black'
        }
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Earn Free Points</h2>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold">
                    {points} Points
                </div>
            </div>
            
            <p className="text-gray-600 mb-6">
                Follow us on social media and earn 1 point for each platform! Use points to download resumes and unlock premium templates.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {socialPlatforms.map((platform) => (
                    <div
                        key={platform.name}
                        className={`${platform.color} text-white rounded-lg p-4 shadow-lg transform transition hover:scale-105`}
                    >
                        <div className="text-center mb-3">
                            <span className="text-4xl">{platform.icon}</span>
                            <h3 className="text-xl font-bold mt-2">{platform.label}</h3>
                        </div>

                        {social_follows[platform.name] ? (
                            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 text-center">
                                <span className="text-lg font-semibold">✓ Claimed</span>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <button
                                    onClick={() => handleFollowClick(platform.name)}
                                    className="w-full bg-white text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition"
                                >
                                    Follow Us
                                </button>
                                <button
                                    onClick={() => handleClaimPoints(platform.name)}
                                    disabled={loading[platform.name]}
                                    className="w-full bg-yellow-400 text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading[platform.name] ? 'Claiming...' : 'Claim 1 Point'}
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EarnPoints;
```

### 13. Create BuyPoints Component - `client/src/components/points/BuyPoints.jsx`

Create new file:

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const BuyPoints = ({ isOpen, onClose }) => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchPackages();
        }
    }, [isOpen]);

    const fetchPackages = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/payment/packages');
            setPackages(response.data.packages);
        } catch (error) {
            toast.error('Failed to load packages');
        }
    };

    const handlePurchase = async (packageId) => {
        try {
            setLoading(true);
            setSelectedPackage(packageId);

            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:3000/api/payment/create-checkout',
                { packageId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({
                sessionId: response.data.sessionId
            });

            if (error) {
                toast.error(error.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create checkout session');
        } finally {
            setLoading(false);
            setSelectedPackage(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold">Buy Points</h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 text-3xl font-bold"
                        >
                            ×
                        </button>
                    </div>
                    <p className="mt-2 text-blue-100">
                        Get more points to download resumes and unlock premium templates
                    </p>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.id}
                                className={`border-2 rounded-xl p-6 transition-all cursor-pointer hover:shadow-xl ${
                                    pkg.id === '10pts'
                                        ? 'border-blue-500 bg-blue-50 transform scale-105'
                                        : 'border-gray-200 hover:border-blue-300'
                                }`}
                            >
                                {pkg.id === '10pts' && (
                                    <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                                        BEST VALUE
                                    </div>
                                )}
                                
                                <div className="text-center mb-4">
                                    <div className="text-5xl font-bold text-blue-600 mb-2">
                                        {pkg.points}
                                    </div>
                                    <div className="text-gray-600 font-semibold">Points</div>
                                </div>

                                <div className="text-center mb-6">
                                    <div className="text-3xl font-bold text-gray-800">
                                        ${pkg.price.toFixed(2)}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        ${(pkg.price / pkg.points).toFixed(2)} per point
                                    </div>
                                </div>

                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-center text-gray-700">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Download {pkg.points} resumes
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Unlock premium templates
                                    </li>
                                    <li className="flex items-center text-gray-700">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Never expires
                                    </li>
                                </ul>

                                <button
                                    onClick={() => handlePurchase(pkg.id)}
                                    disabled={loading && selectedPackage === pkg.id}
                                    className={`w-full py-3 px-6 rounded-lg font-semibold transition ${
                                        pkg.id === '10pts'
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-gray-800 text-white hover:bg-gray-900'
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {loading && selectedPackage === pkg.id ? (
                                        'Processing...'
                                    ) : (
                                        'Purchase Now'
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">💳 Payment Information</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>✓ Secure payment processing via Stripe</li>
                            <li>✓ All major credit and debit cards accepted</li>
                            <li>✓ Points added instantly after payment</li>
                            <li>✓ Email receipt sent automatically</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyPoints;
```

### 14. Create PointsDisplay Component - `client/src/components/points/PointsDisplay.jsx`

Create new file:

```javascript
import React from 'react';
import { useSelector } from 'react-redux';

const PointsDisplay = ({ onBuyPoints }) => {
    const { points, downloads_count } = useSelector((state) => state.points);

    return (
        <div className="bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold mb-2">Your Points Balance</h2>
                    <div className="flex items-center space-x-4">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                            <div className="text-4xl font-bold">{points}</div>
                            <div className="text-sm opacity-90">Points</div>
                        </div>
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-3">
                            <div className="text-4xl font-bold">{downloads_count}</div>
                            <div className="text-sm opacity-90">Downloads</div>
                        </div>
                    </div>
                </div>

                <div className="text-center md:text-right">
                    <button
                        onClick={onBuyPoints}
                        className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition transform hover:scale-105 shadow-lg"
                    >
                        💰 Buy More Points
                    </button>
                    <p className="mt-2 text-sm opacity-90">
                        Starting from $2.99
                    </p>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                    <div className="font-semibold mb-1">📥 CV Download</div>
                    <div className="opacity-90">1 point per download</div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                    <div className="font-semibold mb-1">🎨 Unlock Templates</div>
                    <div className="opacity-90">2-4 points per template</div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
                    <div className="font-semibold mb-1">📱 Follow Social Media</div>
                    <div className="opacity-90">Earn 1 point each</div>
                </div>
            </div>
        </div>
    );
};

export default PointsDisplay;
```

---

## 📱 Usage Example in Dashboard

Add this to your Dashboard page:

```javascript
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setPointsData } from '../redux/features/pointsSlice';
import PointsDisplay from '../components/points/PointsDisplay';
import EarnPoints from '../components/points/EarnPoints';
import BuyPoints from '../components/points/BuyPoints';

function Dashboard() {
    const dispatch = useDispatch();
    const [showBuyPoints, setShowBuyPoints] = useState(false);

    useEffect(() => {
        fetchPointsData();
    }, []);

    const fetchPointsData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                'http://localhost:3000/api/points/info',
                { headers: { Authorization: `Bearer ${token}` } }
            );
            dispatch(setPointsData(response.data));
        } catch (error) {
            console.error('Failed to fetch points data');
        }
    };

    return (
        <div>
            <PointsDisplay onBuyPoints={() => setShowBuyPoints(true)} />
            <EarnPoints />
            <BuyPoints isOpen={showBuyPoints} onClose={() => setShowBuyPoints(false)} />
            {/* Your other dashboard content */}
        </div>
    );
}
```

## 🎯 Points Economy Details

### How to Earn Points

| Action | Points | Frequency |
|--------|---------|-----------|
| Sign Up Bonus | +100 | One-time |
| Complete Profile | +150 | One-time |
| Create Resume | +50 | Per resume |
| Daily Login | +10 | Daily |
| Weekly Streak | +50 | Weekly |
| Monthly Streak | +200 | Monthly |
| Social Media Follow | +20 | Per platform (one-time) |
| Referral Success | +300 | Per referral |
| Level Up | +100 | Per level |

### How Points are Spent

| Action | Cost | Type |
|--------|------|------|
| CV Download (Free Template) | 10 | Per download |
| CV Download (Premium Template) | 25 | Per download |
| CV Download (Elite Template) | 50 | Per download |
| Unlock Premium Template | 100 | One-time |
| Unlock Elite Template | 200 | One-time |
| Basic AI Suggestion | 5 | Per use |
| Advanced AI Optimization | 15 | Per use |

### Level Thresholds

| Level | Points Required | Badge |
|-------|----------------|-------|
| 🥉 Bronze | 0 - 99 | Beginner |
| 🥈 Silver | 100 - 299 | Rising Star |
| 🥇 Gold | 300 - 599 | Expert |
| 💎 Platinum | 600 - 999 | Master |
| 💠 Diamond | 1000+ | Elite |

---

## 🚀 Deployment Guide

### Deployment Options

This application can be deployed in multiple ways. Choose the option that best suits your needs:

#### ⭐ Option 1: Hostinger VPS (Recommended - Full Control)

Deploy both frontend and backend on a single VPS with full control over the environment.

**📚 Complete Hostinger Deployment Documentation:**
- **[Deploy.md](./Deploy.md)** - Complete step-by-step deployment guide
- **[HOSTINGER-DEPLOYMENT.md](./HOSTINGER-DEPLOYMENT.md)** - Quick start and reference guide
- **[PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md)** - Checklist before deployment
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues and solutions
- **[QUICK-REFERENCE.md](./QUICK-REFERENCE.md)** - Quick command reference

**Quick Start:**
```bash
# On your VPS
wget https://raw.githubusercontent.com/chamma08/ai-resume-builder/main/deploy.sh
chmod +x deploy.sh
sudo bash deploy.sh
```

**✅ Benefits:**
- Single server for both frontend and backend
- Full control over environment
- Cost-effective (~$4-20/month)
- Easy SSL setup with Let's Encrypt
- PM2 process management
- Nginx reverse proxy included

**📋 Requirements:**
- Hostinger VPS account ([Get VPS](https://greatstack.dev/go/hostinger-vps))
- Domain name
- SSH access
- Basic Linux knowledge

---

#### Option 2: Separate Deployment (Backend + Frontend)

Deploy backend and frontend separately on different platforms.

##### 2a. Backend Deployment (Railway/Render/Heroku)

**Environment Variables:**
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_jwt_secret
OPENAI_API_KEY=your_openai_api_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=your_email@gmail.com
FRONTEND_URL=https://your-frontend-url.com
CORS_ORIGIN=https://your-frontend-url.com
```

**Build Command:**
```bash
cd server && npm install
```

**Start Command:**
```bash
cd server && npm start
```

##### 2b. Frontend Deployment (Vercel/Netlify)

**Environment Variables:**
```env
VITE_BASE_URL=https://your-backend-url.com/api
```

**Build Command:**
```bash
cd client && npm run build
```

**Output Directory:**
```
client/dist
```

---

### Required Third-Party Services

#### 1. MongoDB Atlas Setup
1. Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Add database user with password
4. Whitelist IP addresses (0.0.0.0/0 for all IPs or your VPS IP)
5. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`
6. Add to `MONGO_URI` environment variable

#### 2. OpenAI API Setup
1. Create account at [platform.openai.com](https://platform.openai.com/)
2. Add payment method (minimum $5 credit)
3. Generate API key
4. Add to `OPENAI_API_KEY` environment variable
5. Monitor usage to control costs

#### 3. ImageKit Setup
1. Create ImageKit account at [imagekit.io](https://imagekit.io/)
2. Get Public Key, Private Key, and URL Endpoint from dashboard
3. Add to environment variables:
   - `IMAGEKIT_PUBLIC_KEY`
   - `IMAGEKIT_PRIVATE_KEY`
   - `IMAGEKIT_URL_ENDPOINT`
4. Free tier: 20GB bandwidth/month

#### 4. Email Setup (Gmail)
1. Use a Gmail account for sending emails
2. Enable 2-Factor Authentication
3. Generate App Password (not your regular password):
   - Go to Google Account → Security → 2-Step Verification → App Passwords
   - Generate 16-character password
4. Add to environment variables:
   - `EMAIL_USER`: your-email@gmail.com
   - `EMAIL_PASSWORD`: 16-character app password

---

### Environment Variables Reference

#### Backend (.env in server folder)
```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/ai-resume-builder

# Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# OpenAI API
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx

# ImageKit
IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_FROM=your-email@gmail.com

# Frontend URL
FRONTEND_URL=http://resume-builder.job-labs.lk
CORS_ORIGIN=http://resume-builder.job-labs.lk
```

#### Frontend (.env in client folder)
```env
# Backend API URL
VITE_BASE_URL=http://resume-builder.job-labs.lk/api
```

---

### 🔐 Security Checklist for Production

- [ ] All environment variables are set correctly
- [ ] `.env` files are NOT committed to Git
- [ ] Strong JWT secret (minimum 32 characters)
- [ ] MongoDB authentication enabled
- [ ] MongoDB IP whitelist configured
- [ ] Email using App Password (not regular password)
- [ ] CORS configured with specific origins
- [ ] SSL certificate installed (HTTPS enabled)
- [ ] Firewall rules configured
- [ ] Regular backups scheduled

---

### 📊 Deployment Costs Estimate

| Service | Plan | Monthly Cost |
|---------|------|--------------|
| **Hostinger VPS** | Entry Plan | $4-7 |
| **Hostinger VPS** | Standard Plan | $8-12 |
| **MongoDB Atlas** | Free Tier | $0 |
| **OpenAI API** | Pay-as-you-go | $5-20 (varies) |
| **ImageKit** | Free Tier | $0 |
| **Domain** | Annual | $10-15/year |
| **Total (Hostinger)** | - | **$5-35/month** |

**Alternative (Separate Deployment):**
- Railway/Render: $5-10/month
- Vercel/Netlify: Free
- Other services: Same as above
- **Total: $5-35/month**

---

### 🆘 Need Help with Deployment?

1. **Check Documentation:**
   - [Complete Deployment Guide](./Deploy.md)
   - [Troubleshooting Guide](./TROUBLESHOOTING.md)
   - [Quick Reference](./QUICK-REFERENCE.md)

2. **Common Issues:**
   - Backend won't start → Check environment variables
   - Frontend blank page → Check `VITE_BASE_URL`
   - CORS errors → Verify `FRONTEND_URL` and `CORS_ORIGIN`
   - 502 errors → Ensure backend is running

3. **Support Resources:**
   - [Hostinger Support](https://www.hostinger.com/support)
   - [MongoDB Docs](https://www.mongodb.com/docs/)
   - [OpenAI Platform](https://platform.openai.com/docs)

---

## 🔮 Future Enhancements

### Planned Features (Roadmap)

#### Phase 1: Payment Integration (In Progress)
- [ ] Stripe payment gateway integration
- [ ] Point purchase packages
- [ ] Subscription plans (Monthly/Yearly)
- [ ] Transaction history with payment details
- [ ] Refund mechanism
- [ ] Invoice generation

#### Phase 2: Advanced Features
- [ ] Resume analytics (views, downloads, shares)
- [ ] Cover letter builder with AI
- [ ] LinkedIn profile optimization
- [ ] Interview preparation tips
- [ ] Resume scoring and improvement suggestions
- [ ] Multiple resume versions (A/B testing)

#### Phase 3: Social Features
- [ ] Public resume gallery
- [ ] Resume templates marketplace
- [ ] Community templates
- [ ] Resume feedback from professionals
- [ ] Success stories showcase
- [ ] User achievements and milestones

#### Phase 4: Enterprise Features
- [ ] Team accounts and workspaces
- [ ] Bulk resume creation
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Custom branding for businesses
- [ ] API access for integrations

#### Phase 5: AI Enhancements
- [ ] Resume parsing from PDF/DOCX
- [ ] Job description matching
- [ ] Salary estimation based on skills
- [ ] Career path recommendations
- [ ] Industry-specific template suggestions
- [ ] Resume translation (multiple languages)

---

## � Known Issues & Limitations

### Current Limitations
1. **Email Service**: Requires email configuration for password reset
2. **File Upload**: Images stored temporarily, recommend using ImageKit
3. **PDF Export**: Browser-based PDF generation (quality depends on browser)
4. **AI Credits**: OpenAI API usage requires credits/billing
5. **Mobile**: Some templates may require scrolling on very small screens

### Planned Fixes
- Implement server-side PDF generation for better quality
- Add more template customization options
- Improve mobile responsiveness for all templates
- Add template preview before selection
- Implement drag-and-drop section reordering

---

## 🧪 Testing Checklist

### User Authentication
- [ ] User registration with points award
- [ ] User login
- [ ] Password reset with OTP
- [ ] JWT token expiration handling
- [ ] Protected route access

### Points System
- [ ] Points awarded on signup
- [ ] Points awarded on profile completion
- [ ] Points awarded on resume creation
- [ ] Points awarded on social media follow
- [ ] Referral system working
- [ ] Leaderboard updates correctly
- [ ] Activity history tracking

### Resume Builder
- [ ] Create new resume
- [ ] Edit existing resume
- [ ] Delete resume
- [ ] Template selection
- [ ] Color customization
- [ ] Live preview updates
- [ ] PDF download
- [ ] Image upload

### AI Features
- [ ] Professional summary enhancement
- [ ] Experience description enhancement
- [ ] Skill suggestions
- [ ] Project description enhancement

### Email Functionality
- [ ] Contact form email delivery
- [ ] OTP email delivery
- [ ] Password reset confirmation email
- [ ] Welcome email (if implemented)

---

## 📊 Performance Optimization

### Current Optimizations
- Compression middleware for response size reduction
- Image optimization via ImageKit
- React lazy loading for routes
- Vite build optimization
- MongoDB indexes on frequently queried fields
- JWT token caching

### Recommended Optimizations
- Implement Redis for session management
- Add CDN for static assets
- Implement server-side rendering (SSR)
- Add database query optimization
- Implement caching strategies
- Add rate limiting for API endpoints

---

## 🔐 Security Best Practices

### Implemented
✅ Password hashing with bcrypt  
✅ JWT token authentication  
✅ Environment variable protection  
✅ CORS configuration  
✅ Input validation  
✅ File upload restrictions  
✅ OTP expiration  
✅ Protected API routes  

### Recommended
- [ ] Implement rate limiting (express-rate-limit)
- [ ] Add HTTPS in production
- [ ] Implement CSRF protection
- [ ] Add SQL injection protection (already using Mongoose)
- [ ] Implement XSS protection
- [ ] Add security headers (helmet.js)
- [ ] Regular security audits
- [ ] Dependency vulnerability scanning

---

## 📝 Important Notes

1. **Social Media Links**: Update social media URLs in the social follow components
2. **Email Configuration**: Properly configure email settings for production
3. **API Keys**: Never commit API keys to version control
4. **Database Backup**: Regularly backup your MongoDB database
5. **Error Logging**: Implement proper error logging (Winston, Sentry)
6. **Monitoring**: Add application monitoring (New Relic, DataDog)

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation if needed
- Test your changes thoroughly
- Ensure no console errors

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Chamma08**
- GitHub: [@chamma08](https://github.com/chamma08)
- Repository: [ai-resume-builder](https://github.com/chamma08/ai-resume-builder)

---

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) - For GPT-4o-mini AI capabilities
- [ImageKit](https://imagekit.io/) - For image hosting and optimization
- [MongoDB](https://www.mongodb.com/) - For the database solution
- [Tailwind CSS](https://tailwindcss.com/) - For the amazing utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - For beautiful animations
- All open-source contributors whose libraries made this project possible

---

## 📞 Support & Contact

If you need help or have questions:

- **Issues**: Open an issue on [GitHub Issues](https://github.com/chamma08/ai-resume-builder/issues)
- **Discussions**: Join [GitHub Discussions](https://github.com/chamma08/ai-resume-builder/discussions)
- **Email**: Contact via GitHub profile
- **Documentation**: Check the `/docs` folder for detailed guides

---

## ⭐ Star This Repository

If you found this project helpful, please consider giving it a star! ⭐

It helps others discover the project and motivates continued development.

---

<div align="center">

**Made with ❤️ by [Chamma08](https://github.com/chamma08)**

**© 2025 AI Resume Builder. All rights reserved.**

</div>
