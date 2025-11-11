# 🔧 Hostinger Deployment Troubleshooting Guide

Common issues and solutions when deploying AI Resume Builder to Hostinger VPS.

## 🚨 Backend Issues

### Issue: Backend Won't Start

**Symptoms:**
- PM2 shows status as "errored" or "stopped"
- Application not accessible

**Solutions:**

1. **Check PM2 logs:**
   ```bash
   pm2 logs ai-resume-backend --lines 50
   ```

2. **Check environment variables:**
   ```bash
   cd /var/www/ai-resume-builder/server
   cat .env
   ```
   - Ensure all required variables are set
   - No trailing spaces or quotes
   - MongoDB URI is correct

3. **Test MongoDB connection:**
   ```bash
   cd /var/www/ai-resume-builder/server
   node -e "import('./configs/db.js').then(m => m.connectDB())"
   ```

4. **Check port availability:**
   ```bash
   netstat -tulpn | grep :5000
   lsof -i :5000
   ```

5. **Restart with verbose logging:**
   ```bash
   pm2 delete ai-resume-backend
   pm2 start index.js --name ai-resume-backend --log-date-format 'YYYY-MM-DD HH:mm:ss'
   pm2 logs ai-resume-backend
   ```

### Issue: MongoDB Connection Failed

**Error Messages:**
- "MongoServerError: Authentication failed"
- "MongoNetworkError: failed to connect"
- "MongooseServerSelectionError"

**Solutions:**

1. **Verify MongoDB Atlas:**
   - Check username and password are correct
   - Database name exists
   - IP whitelist includes VPS IP (or 0.0.0.0/0)
   - Connection string format: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`

2. **Test connection string:**
   ```bash
   mongosh "mongodb+srv://user:pass@cluster.mongodb.net/dbname"
   ```

3. **Check network connectivity:**
   ```bash
   ping cluster.mongodb.net
   curl -I https://cloud.mongodb.com
   ```

4. **Verify firewall rules:**
   ```bash
   sudo ufw status
   ```

### Issue: OpenAI API Errors

**Error Messages:**
- "Invalid API key"
- "Rate limit exceeded"
- "Insufficient quota"

**Solutions:**

1. **Verify API key:**
   ```bash
   cd /var/www/ai-resume-builder/server
   grep OPENAI_API_KEY .env
   ```

2. **Test API key:**
   ```bash
   curl https://api.openai.com/v1/models \
     -H "Authorization: Bearer sk-proj-your-key"
   ```

3. **Check billing:**
   - Visit: https://platform.openai.com/account/billing
   - Ensure payment method is added
   - Check usage limits

4. **Check rate limits:**
   - Implement exponential backoff
   - Add request queuing
   - Monitor usage dashboard

### Issue: ImageKit Upload Failing

**Solutions:**

1. **Check credentials:**
   ```bash
   grep IMAGEKIT .env
   ```

2. **Verify ImageKit account:**
   - Login to https://imagekit.io/dashboard
   - Check API keys are active
   - Verify storage limits not exceeded

3. **Test upload manually:**
   ```javascript
   // Create test script
   node -e "
   import ImageKit from 'imagekit';
   const imagekit = new ImageKit({
     publicKey: 'your_public_key',
     privateKey: 'your_private_key',
     urlEndpoint: 'your_url_endpoint'
   });
   console.log('ImageKit configured successfully');
   "
   ```

---

## 🌐 Frontend Issues

### Issue: Frontend Shows Blank Page

**Symptoms:**
- White/blank screen
- Console errors in browser

**Solutions:**

1. **Check build output:**
   ```bash
   ls -la /var/www/ai-resume-builder/client/dist
   ```

2. **Rebuild frontend:**
   ```bash
   cd /var/www/ai-resume-builder/client
   rm -rf dist node_modules
   npm install
   npm run build
   ```

3. **Check VITE_BASE_URL:**
   ```bash
   cd /var/www/ai-resume-builder/client
   cat .env
   ```
   Should be: `VITE_BASE_URL=https://yourdomain.com/api`

4. **Check browser console:**
   - Press F12 in browser
   - Look for errors in Console tab
   - Check Network tab for failed requests

### Issue: API Calls Failing (CORS Errors)

**Error Messages:**
- "Access to fetch has been blocked by CORS policy"
- "No 'Access-Control-Allow-Origin' header"

**Solutions:**

1. **Update backend CORS:**
   ```javascript
   // server/index.js
   app.use(cors({
       origin: process.env.FRONTEND_URL || 'https://yourdomain.com',
       credentials: true
   }));
   ```

2. **Check environment variables match:**
   ```bash
   # Backend
   grep FRONTEND_URL /var/www/ai-resume-builder/server/.env
   
   # Frontend
   grep VITE_BASE_URL /var/www/ai-resume-builder/client/.env
   ```

3. **Restart services:**
   ```bash
   pm2 restart ai-resume-backend
   sudo systemctl reload nginx
   ```

### Issue: Static Assets Not Loading

**Symptoms:**
- CSS not applied
- Images not showing
- JS files 404

**Solutions:**

1. **Check Nginx config:**
   ```bash
   sudo nginx -t
   sudo cat /etc/nginx/sites-available/ai-resume-builder
   ```

2. **Verify root path:**
   ```nginx
   root /var/www/ai-resume-builder/client/dist;
   ```

3. **Check file permissions:**
   ```bash
   ls -la /var/www/ai-resume-builder/client/dist
   sudo chown -R www-data:www-data /var/www/ai-resume-builder/client/dist
   sudo chmod -R 755 /var/www/ai-resume-builder/client/dist
   ```

---

## 🔒 Nginx & SSL Issues

### Issue: 502 Bad Gateway

**Solutions:**

1. **Check backend is running:**
   ```bash
   pm2 status
   pm2 restart ai-resume-backend
   ```

2. **Check backend port:**
   ```bash
   netstat -tulpn | grep :5000
   ```

3. **Check Nginx upstream:**
   ```bash
   sudo nano /etc/nginx/sites-available/ai-resume-builder
   ```
   Verify: `upstream backend { server localhost:5000; }`

4. **Test backend directly:**
   ```bash
   curl http://localhost:5000
   ```

5. **Check Nginx logs:**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

### Issue: SSL Certificate Not Working

**Solutions:**

1. **Check certificate status:**
   ```bash
   sudo certbot certificates
   ```

2. **Renew certificate:**
   ```bash
   sudo certbot renew --dry-run
   sudo certbot renew
   ```

3. **Re-obtain certificate:**
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com --force-renewal
   ```

4. **Check Nginx SSL config:**
   ```bash
   sudo grep ssl /etc/nginx/sites-available/ai-resume-builder
   ```

### Issue: Nginx Won't Start

**Solutions:**

1. **Test configuration:**
   ```bash
   sudo nginx -t
   ```

2. **Check syntax errors:**
   ```bash
   sudo nginx -t 2>&1 | grep error
   ```

3. **View detailed errors:**
   ```bash
   sudo systemctl status nginx
   sudo journalctl -xe -u nginx
   ```

4. **Common fixes:**
   ```bash
   # Fix permissions
   sudo chown -R www-data:www-data /var/www/ai-resume-builder
   
   # Fix config
   sudo nano /etc/nginx/sites-available/ai-resume-builder
   
   # Restart
   sudo systemctl restart nginx
   ```

---

## 🔥 Firewall Issues

### Issue: Cannot Access Website

**Solutions:**

1. **Check firewall status:**
   ```bash
   sudo ufw status
   ```

2. **Allow Nginx:**
   ```bash
   sudo ufw allow 'Nginx Full'
   sudo ufw allow OpenSSH
   ```

3. **Check open ports:**
   ```bash
   sudo netstat -tulpn | grep LISTEN
   ```

4. **Verify DNS:**
   ```bash
   nslookup yourdomain.com
   ping yourdomain.com
   ```

---

## 📧 Email Issues

### Issue: Emails Not Sending

**Solutions:**

1. **Check email config:**
   ```bash
   grep EMAIL_ /var/www/ai-resume-builder/server/.env
   ```

2. **Verify Gmail App Password:**
   - Not regular password
   - Must be 16 characters
   - 2FA must be enabled

3. **Test email sending:**
   ```javascript
   // Create test script
   node -e "
   import nodemailer from 'nodemailer';
   const transporter = nodemailer.createTransport({
     host: 'smtp.gmail.com',
     port: 587,
     secure: false,
     auth: {
       user: 'your-email@gmail.com',
       pass: 'your-app-password'
     }
   });
   
   transporter.sendMail({
     from: 'your-email@gmail.com',
     to: 'test@example.com',
     subject: 'Test',
     text: 'Test email'
   }).then(console.log).catch(console.error);
   "
   ```

---

## 💾 Performance Issues

### Issue: Application Running Slow

**Solutions:**

1. **Check server resources:**
   ```bash
   top
   htop
   free -h
   df -h
   ```

2. **Check PM2 memory:**
   ```bash
   pm2 monit
   ```

3. **Optimize Node.js:**
   ```bash
   pm2 delete ai-resume-backend
   pm2 start index.js --name ai-resume-backend --max-memory-restart 500M
   ```

4. **Enable Nginx caching:**
   - Already configured in deployment
   - Check browser cache headers

5. **Monitor logs:**
   ```bash
   pm2 logs ai-resume-backend --lines 100
   ```

---

## 🔍 Debugging Commands

### System Information
```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check system resources
free -h && df -h

# Check running processes
ps aux | grep node
```

### Application Logs
```bash
# PM2 logs
pm2 logs ai-resume-backend

# Nginx access logs
sudo tail -f /var/log/nginx/ai-resume-builder_access.log

# Nginx error logs
sudo tail -f /var/log/nginx/ai-resume-builder_error.log

# System logs
sudo journalctl -xe
```

### Network Testing
```bash
# Test backend
curl http://localhost:5000

# Test API endpoint
curl http://localhost:5000/api/users/test

# Test external access
curl https://yourdomain.com/api
```

---

## 🆘 Emergency Recovery

### Complete Service Restart
```bash
# Stop everything
pm2 kill
sudo systemctl stop nginx

# Start fresh
cd /var/www/ai-resume-builder/server
pm2 start index.js --name ai-resume-backend
sudo systemctl start nginx

# Check status
pm2 status
sudo systemctl status nginx
```

### Nuclear Option - Fresh Deployment
```bash
# Backup current setup
cd /var/www
sudo tar -czf ai-resume-builder-backup-$(date +%Y%m%d).tar.gz ai-resume-builder

# Remove and redeploy
sudo rm -rf ai-resume-builder
# Then follow deployment guide again
```

---

## 📞 Get Help

If issues persist:

1. **Check Documentation:**
   - [Deploy.md](./Deploy.md)
   - [HOSTINGER-DEPLOYMENT.md](./HOSTINGER-DEPLOYMENT.md)

2. **Contact Support:**
   - Hostinger Support: https://www.hostinger.com/support
   - MongoDB Support: https://www.mongodb.com/support
   - OpenAI Support: https://help.openai.com/

3. **Community Resources:**
   - Stack Overflow
   - GitHub Issues
   - Reddit: r/webdev, r/node

---

**Last Updated:** November 11, 2025
