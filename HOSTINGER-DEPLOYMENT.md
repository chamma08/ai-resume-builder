# HOSTINGER DEPLOYMENT GUIDE

Quick reference guide for deploying AI Resume Builder to Hostinger VPS.

## 🚀 Quick Start

### Method 1: Automated Deployment (Recommended)

1. **Connect to your VPS:**
   ```bash
   ssh root@your_vps_ip
   ```

2. **Download and run the deployment script:**
   ```bash
   wget https://raw.githubusercontent.com/chamma08/ai-resume-builder/main/deploy.sh
   chmod +x deploy.sh
   sudo bash deploy.sh
   ```

3. **Configure environment variables:**
   ```bash
   nano /var/www/ai-resume-builder/server/.env
   ```

4. **Restart backend:**
   ```bash
   pm2 restart ai-resume-backend
   ```

### Method 2: Manual Deployment

Follow the detailed guide in [Deploy.md](./Deploy.md)

## 📋 Pre-Deployment Checklist

Before deploying, make sure you have:

- [ ] Hostinger VPS account
- [ ] Domain name pointed to VPS IP
- [ ] MongoDB connection string (MongoDB Atlas recommended)
- [ ] OpenAI API key
- [ ] ImageKit credentials (Public Key, Private Key, URL Endpoint)
- [ ] Email credentials for nodemailer (Gmail with App Password recommended)
- [ ] GitHub repository access

## 🔑 Required Environment Variables

### Backend (.env in server folder)

```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
OPENAI_API_KEY=sk-...
IMAGEKIT_PUBLIC_KEY=public_...
IMAGEKIT_PRIVATE_KEY=private_...
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
FRONTEND_URL=http://resume-builder.job-labs.lk
CORS_ORIGIN=http://resume-builder.job-labs.lk
```

### Frontend (.env in client folder)

```env
VITE_BASE_URL=http://resume-builder.job-labs.lk/api
```

## 🔄 Updating Your Application

After pushing changes to GitHub:

```bash
ssh root@your_vps_ip
cd /var/www/ai-resume-builder
bash update.sh
```

Or manually:

```bash
cd /var/www/ai-resume-builder
git pull origin main

# Update backend
cd server
npm install
pm2 restart ai-resume-backend

# Update frontend
cd ../client
npm install
npm run build
sudo systemctl reload nginx
```

## 🔍 Monitoring & Troubleshooting

### Check Application Status

```bash
# Check PM2 processes
pm2 status
pm2 logs ai-resume-backend

# Check Nginx
sudo systemctl status nginx
sudo nginx -t

# Check logs
sudo tail -f /var/log/nginx/ai-resume-builder_error.log
```

### Common Issues

**Backend not starting:**
```bash
pm2 logs ai-resume-backend --lines 50
cd /var/www/ai-resume-builder/server
cat .env  # Check environment variables
```

**Frontend not loading:**
```bash
ls -la /var/www/ai-resume-builder/client/dist
cd /var/www/ai-resume-builder/client
npm run build
sudo systemctl reload nginx
```

**502 Bad Gateway:**
```bash
pm2 restart ai-resume-backend
sudo systemctl restart nginx
netstat -tulpn | grep :5000  # Check if port is listening
```

## 🛡️ Security Best Practices

1. **Use strong passwords** for all services
2. **Enable firewall:**
   ```bash
   sudo ufw enable
   sudo ufw allow OpenSSH
   sudo ufw allow 'Nginx Full'
   ```
3. **Keep SSL certificates updated** (auto-renewal is enabled)
4. **Regular backups** of your MongoDB database
5. **Use environment variables** for all secrets (never commit .env files)

## 📊 Performance Optimization

Your Nginx configuration includes:

- ✅ Gzip compression
- ✅ Static asset caching (1 year)
- ✅ Extended timeouts for AI operations (300s)
- ✅ Security headers

## 🌐 DNS Configuration

Point your domain to your VPS IP:

**A Records:**
- `@` → Your VPS IP
- `www` → Your VPS IP

**Propagation:** Wait 1-24 hours for DNS to propagate globally.

## 📁 Directory Structure on Server

```
/var/www/ai-resume-builder/
├── server/
│   ├── index.js
│   ├── .env (your environment variables)
│   ├── package.json
│   └── ... (other backend files)
├── client/
│   ├── dist/ (built React app)
│   ├── .env (frontend environment variables)
│   ├── package.json
│   └── ... (other frontend files)
├── deploy.sh
└── update.sh
```

## 🔐 How to Generate Secure Keys

### JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Gmail App Password
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. App Passwords → Generate new password
4. Use this password in `EMAIL_PASSWORD`

## 📞 Support

- **Hostinger Support:** [https://www.hostinger.com/support](https://www.hostinger.com/support)
- **MongoDB Atlas:** [https://www.mongodb.com/docs/atlas/](https://www.mongodb.com/docs/atlas/)
- **OpenAI:** [https://platform.openai.com/docs](https://platform.openai.com/docs)

## 📝 Notes

- **Port 5000** is used for the backend API
- **Port 80/443** for HTTP/HTTPS (handled by Nginx)
- PM2 ensures your backend runs continuously and restarts on crashes
- SSL certificates auto-renew every 90 days

---

**Happy Deploying! 🚀**
