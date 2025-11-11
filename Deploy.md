# Deploying AI Resume Builder to Hostinger VPS

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Step 1: Preparing the VPS Environment](#step-1-preparing-the-vps-environment)
- [Step 2: Setting Up MongoDB Database](#step-2-setting-up-mongodb-database)
- [Step 3: Deploying the Backend (Server)](#step-3-deploying-the-backend-server)
- [Step 4: Building and Deploying the Frontend (Client)](#step-4-building-and-deploying-the-frontend-client)
- [Step 5: Configuring Nginx](#step-5-configuring-nginx)
- [Step 6: Setting Up SSL Certificate](#step-6-setting-up-ssl-certificate)
- [Step 7: Environment Variables Setup](#step-7-environment-variables-setup)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting, ensure you have:
- ✅ Hostinger VPS account (Get it here: [Hostinger VPS](https://greatstack.dev/go/hostinger-vps))
- ✅ Domain name pointed to your VPS IP
- ✅ MongoDB connection string (MongoDB Atlas or local MongoDB)
- ✅ OpenAI API key
- ✅ ImageKit account credentials
- ✅ Email credentials for nodemailer
- ✅ GitHub repository access

---

## Step 1: Preparing the VPS Environment

### 1.1 Connect to Your VPS

```bash
ssh root@your_vps_ip
```

### 1.2 Update System Packages

```bash
sudo apt update
sudo apt upgrade -y
```

### 1.3 Install Node.js and npm

```bash
# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js v22
nvm install 22
nvm use 22
nvm alias default 22

# Verify installation
node --version
npm --version
```

### 1.4 Install Git

```bash
sudo apt install -y git
```

### 1.5 Install PM2 (Process Manager)

```bash
npm install -g pm2
```

### 1.6 Install Nginx

```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## Step 2: Setting Up MongoDB Database

### Option A: Using MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Whitelist your VPS IP address in Network Access
5. Save the connection string for later

### Option B: Install MongoDB on VPS

Follow this guide: [MongoDB Setup on VPS](https://github.com/GreatStackDev/notes/blob/main/MongoDB_Setup_on_VPS.md)

---

## Step 3: Deploying the Backend (Server)

### 3.1 Create Application Directory

```bash
mkdir -p /var/www
cd /var/www
```

### 3.2 Clone Your Repository

```bash
git clone https://github.com/chamma08/ai-resume-builder.git
cd ai-resume-builder
```

### 3.3 Install Server Dependencies

```bash
cd server
npm install
```

### 3.4 Create Environment Variables File

```bash
nano .env
```

Add the following environment variables (press `Ctrl+X`, then `Y`, then `Enter` to save):

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB
MONGO_URI=your_mongodb_connection_string

# JWT Secret (Generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# Email Configuration (for Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=your_email@gmail.com

# Frontend URL (will be your domain)
FRONTEND_URL=http://resume-builder.job-labs.lk

# CORS Origin
CORS_ORIGIN=http://resume-builder.job-labs.lk
```

### 3.5 Start Backend with PM2

```bash
pm2 start index.js --name ai-resume-backend
pm2 startup
pm2 save
```

### 3.6 Verify Backend is Running

```bash
pm2 status
pm2 logs ai-resume-backend
```

---

## Step 4: Building and Deploying the Frontend (Client)

### 4.1 Navigate to Client Directory

```bash
cd /var/www/ai-resume-builder/client
```

### 4.2 Create Environment Variables File

```bash
nano .env
```

Add the following:

```env
VITE_BASE_URL=http://resume-builder.job-labs.lk/api
```

### 4.3 Install Client Dependencies

```bash
npm install
```

### 4.4 Build the React Application

```bash
npm run build
```

This will create a `dist` folder with optimized production files.

---

## Step 5: Configuring Nginx

### 5.1 Create Nginx Configuration File

```bash
sudo nano /etc/nginx/sites-available/ai-resume-builder
```

Add the following configuration:

```nginx
# Backend API Server
upstream backend {
    server localhost:5000;
}

# Main Server Block
server {
    listen 80;
    listen [::]:80;
    server_name resume-builder.job-labs.lk;

    # Redirect HTTP to HTTPS (will be uncommented after SSL setup)
    # return 301 https://$server_name$request_uri;

    # Frontend - Serve React Build Files
    root /var/www/ai-resume-builder/client/dist;
    index index.html;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    # Frontend Routes - SPA Support
    location / {
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API Proxy
    location /api/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Increase timeouts for AI operations
        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
    }

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Logs
    access_log /var/log/nginx/ai-resume-builder_access.log;
    error_log /var/log/nginx/ai-resume-builder_error.log;
}
```

### 5.2 Enable the Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/ai-resume-builder /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 5.3 Configure Firewall

```bash
# Allow Nginx through firewall
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

---

## Step 6: Setting Up SSL Certificate

### 6.1 Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 6.2 Obtain SSL Certificate

```bash
sudo certbot --nginx -d resume-builder.job-labs.lk
```

Follow the prompts:
- Enter your email address
- Agree to terms of service
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

### 6.3 Auto-Renewal Setup

Certbot automatically sets up renewal. Test it:

```bash
sudo certbot renew --dry-run
```

### 6.4 Update Nginx Configuration for HTTPS

After SSL is installed, your Nginx config will be automatically updated. Verify:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 7: Environment Variables Setup

### 7.1 Backend Environment Variables Checklist

Ensure your `/var/www/ai-resume-builder/server/.env` contains:

- ✅ `PORT` - Backend port (5000)
- ✅ `MONGO_URI` - MongoDB connection string
- ✅ `JWT_SECRET` - JWT secret key
- ✅ `OPENAI_API_KEY` - OpenAI API key
- ✅ `IMAGEKIT_PUBLIC_KEY` - ImageKit public key
- ✅ `IMAGEKIT_PRIVATE_KEY` - ImageKit private key
- ✅ `IMAGEKIT_URL_ENDPOINT` - ImageKit URL
- ✅ `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD` - Email config
- ✅ `FRONTEND_URL` - Your domain URL

### 7.2 Frontend Environment Variables

Ensure your `/var/www/ai-resume-builder/client/.env` contains:

- ✅ `VITE_BASE_URL` - Backend API URL (http://resume-builder.job-labs.lk/api)

---

## 🔄 Deployment Workflow

### Update Application After Code Changes

```bash
# Navigate to project directory
cd /var/www/ai-resume-builder

# Pull latest changes
git pull origin main

# Update Backend
cd server
npm install
pm2 restart ai-resume-backend

# Update Frontend
cd ../client
npm install
npm run build
sudo systemctl reload nginx
```

### Check Application Status

```bash
# Check PM2 processes
pm2 status
pm2 logs ai-resume-backend

# Check Nginx status
sudo systemctl status nginx

# Check Nginx logs
sudo tail -f /var/log/nginx/ai-resume-builder_error.log
sudo tail -f /var/log/nginx/ai-resume-builder_access.log
```

---

## Troubleshooting

### Backend Not Starting

```bash
# Check PM2 logs
pm2 logs ai-resume-backend --lines 100

# Check environment variables
cd /var/www/ai-resume-builder/server
cat .env

# Restart backend
pm2 restart ai-resume-backend
```

### Frontend Not Loading

```bash
# Check if build was successful
ls -la /var/www/ai-resume-builder/client/dist

# Rebuild if needed
cd /var/www/ai-resume-builder/client
npm run build

# Check Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Database Connection Issues

```bash
# Test MongoDB connection
cd /var/www/ai-resume-builder/server
node -e "import('./configs/db.js').then(m => m.connectDB())"
```

### CORS Errors

Ensure your backend has proper CORS configuration. Update `server/index.js` if needed:

```javascript
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://resume-builder.job-labs.lk',
    credentials: true
}));
```

### 502 Bad Gateway Error

```bash
# Check if backend is running
pm2 status

# Check backend port
netstat -tulpn | grep :5000

# Restart services
pm2 restart ai-resume-backend
sudo systemctl restart nginx
```

---

## 🎉 Success Checklist

- ✅ VPS is configured with Node.js, npm, PM2, and Nginx
- ✅ MongoDB is connected (Atlas or local)
- ✅ Backend is running on PM2
- ✅ Frontend is built and served by Nginx
- ✅ Domain is pointed to VPS IP
- ✅ SSL certificate is installed
- ✅ All environment variables are set
- ✅ Application is accessible at http://resume-builder.job-labs.lk

---

## 📚 Additional Resources

- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

**Need Help?** Check the logs and troubleshooting section above. For more support, consult the Hostinger support team or relevant documentation 

```bash
 sudo ufw status
```
If firewall is disable then enable it using 
```bash
 sudo ufw enable
```
```bash
 sudo ufw allow 'OpenSSH'
```
```bash
 sudo ufw allow 4000
```

### 4. Deploying the React Frontends

Creating Build of React Applications
```bash
 cd path-to-your-first-react-app
```
```bash
 npm install
```
If you have ".env" file in your project

Create .env file and paste the variables
```bash
 nano .env
```
Create build of project
```bash
 npm run build
```

Repeat for the second or mulitiple React app.

Install Nginx

```bash
 sudo apt install -y nginx
```

adding Nginx in firewall

```bash
 sudo ufw status
```
```bash
 sudo ufw allow 'Nginx Full'
```


Configure Nginx for React Frontends


```bash
 nano /etc/nginx/sites-available/yourdomain1.com.conf
```

```bash
 server {
    listen 80;
    server_name yourdomain1.com www.yourdomain1.com;

    location / {
        root /var/www/your-repo/frontend/dist;
        try_files $uri /index.html;
    }
}
```
Save and exit (Ctrl + X, then Y and Enter).

Create a similar file for the second or multiple React app.

```bash
 nano /etc/nginx/sites-available/yourdomain2.com.conf
```

```bash
server {
    listen 80;
    server_name yourdomain2.com www.yourdomain2.com;

    location / {
        root /var/www/react-app-2/dist;
        try_files $uri /index.html;
    }
}
```

Create symbolic links to enable the sites.

```bash
ln -s /etc/nginx/sites-available/yourdomain1.com.conf /etc/nginx/sites-enabled/
```

```bash
ln -s /etc/nginx/sites-available/yourdomain2.com.conf /etc/nginx/sites-enabled/
```

Test the Nginx configuration for syntax errors.

```bash
nginx -t
```

```bash
systemctl restart nginx
```

### 5. Configuring Nginx as a Reverse Proxy

Update Backend Nginx Configuration

```bash
nano /etc/nginx/sites-available/api.yourdomain.com.conf
```
```bash
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Create symbolic links to enable the sites.

```bash
ln -s /etc/nginx/sites-available/api.yourdomain.com.conf /etc/nginx/sites-enabled/
```

Restart nginx

```bash
systemctl restart nginx
```

### Connect Domain Name with Website

Point all your domain & sub-domain on VPS IP address by adding DNS records in your domain manager 

Now your website will be live on domain name

### 6. Setting Up SSL Certificates 

Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

Obtain SSL Certificates

```bash
certbot --nginx -d yourdomain1.com -d www.yourdomain1.com -d yourdomain2.com -d api.yourdomain.com
```

Verify Auto-Renewal

```bash
certbot renew --dry-run
```

If you still need help in deployment:

Contact us on email : greatstackdev@gmail.com