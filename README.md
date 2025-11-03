# 🚀 AI Resume Builder

A modern, full-stack MERN application that helps users create professional resumes with AI-powered content enhancement. Built with React, Node.js, Express, and MongoDB, featuring multiple professional templates and intelligent content suggestions.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)

## ✨ Features

- 🤖 **AI-Powered Content Enhancement** - Leverage OpenAI to enhance professional summaries, experience descriptions, and skills
- 📄 **Multiple Professional Templates** - Choose from 6 beautifully designed resume templates:
  - Classic Template
  - Modern Template
  - Minimal Template
  - Minimal Image Template
  - Elegant Template
  - Corporate Template
- 🎨 **Customizable Color Themes** - Personalize your resume with custom color schemes
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 👤 **User Authentication** - Secure JWT-based authentication system
- 💾 **Save & Manage Resumes** - Create, save, and manage multiple resumes
- 📸 **Image Upload** - Add profile pictures with ImageKit integration
- 📥 **Export to PDF** - Download your resume as a PDF file
- 🔍 **Live Preview** - Real-time preview of your resume as you edit
- 🎯 **ATS-Friendly** - Templates optimized for Applicant Tracking Systems

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icon set
- **React Toastify** - Toast notifications
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **OpenAI API** - AI content enhancement
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **ImageKit** - Image hosting and optimization
- **Multer** - File upload handling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **OpenAI API Key**
- **ImageKit Account** (for image uploads)

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

## 📁 Project Structure

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
│   │   ├── imageKit.js   # ImageKit configuration
│   │   └── multer.js     # File upload configuration
│   ├── controllers/      # Route controllers
│   │   ├── aiController.js       # AI enhancement logic
│   │   ├── resumeController.js   # Resume CRUD operations
│   │   └── userController.js     # User authentication
│   ├── middlewares/      # Custom middlewares
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/           # MongoDB schemas
│   │   ├── Resume.js     # Resume model
│   │   └── User.js       # User model
│   ├── routes/           # API routes
│   │   ├── aiRoute.js
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
The application uses OpenAI's GPT models to enhance various sections of your resume:
- **Professional Summary**: Generate compelling summaries based on your experience
- **Experience Descriptions**: Improve job descriptions with action verbs and achievements
- **Skills**: Suggest relevant skills based on your profile
- **Project Descriptions**: Enhance project descriptions for better impact

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

## 🔒 Security Features

- Password hashing with Bcrypt
- JWT-based authentication
- Protected API routes
- Secure file upload handling
- Environment variable protection
- CORS configuration

## 🎨 UI/UX Features

- Smooth animations with Framer Motion
- Responsive design for all screen sizes
- Toast notifications for user feedback
- Loading states and error handling
- Breadcrumb navigation
- Collapsible sections for better organization

## 📚 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/get-user` - Get authenticated user

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

## 🎯 Future Enhancements

- [ ] LinkedIn profile import
- [ ] Cover letter generator
- [ ] More template options
- [ ] Multi-language support
- [ ] Resume scoring and suggestions
- [ ] Export to Word format
- [ ] Social media integration
- [ ] Collaborative editing

---

⭐ If you found this project helpful, please give it a star!

Made with ❤️ by Chamma08
