import dotenv from "dotenv";
// Load environment variables FIRST before any other imports
dotenv.config();

import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import { connectDB } from "./configs/db.js";
import userRoutes from "./routes/userRoute.js";
import resumeRoutes from "./routes/resumeRoute.js";
import aiRouter from "./routes/aiRoute.js";
import contactRoutes from "./routes/contactRoute.js";
import pointsRoutes from "./routes/pointsRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

//Database Connection
await connectDB();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Adjust based on your needs
  crossOriginEmbedderPolicy: false
}));

// Enable GZIP compression for all responses
app.use(compression());

// CORS with optimized settings
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
}));

// Parse JSON with size limit to prevent payload attacks
app.use(express.json({ limit: '10mb' }));

// Add cache control headers for better performance
app.use((req, res, next) => {
  // Cache static assets for 1 year
  if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  // Don't cache API responses by default
  else if (req.url.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/resumes", resumeRoutes);

app.use("/api/ai", aiRouter)
app.use("/api/contact", contactRoutes);

app.use("/api/points", pointsRoutes)

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
