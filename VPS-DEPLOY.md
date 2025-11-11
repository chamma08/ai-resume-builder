# 🚀 VPS Deployment Instructions

## Quick Deploy (After Code Changes)

SSH into your VPS and run:

```bash
cd /var/www/ai-resume-builder
./deploy-vps.sh
```

Or manually:

```bash
# Navigate to project
cd /var/www/ai-resume-builder

# Pull latest changes
git pull origin main

# Install dependencies
cd server && npm install --production
cd ../client && npm install

# Build frontend
npm run build

# Restart services
cd ../server && pm2 restart ai-resume-backend
sudo systemctl reload nginx
```

## Recent Fixes Applied

### ✅ Fixed Lucide-React Import Issues
- Created centralized icons utility at `client/src/utils/icons.js`
- Updated all 24 component files to import from utils instead of directly from lucide-react
- This prevents tree-shaking issues in production Vite builds

### ✅ Fixed CORS Configuration
- Updated `server/index.js` to use `FRONTEND_URL` and `CORS_ORIGIN` environment variables
- Changed from `process.env.CLIENT_URL` to `process.env.FRONTEND_URL || process.env.CORS_ORIGIN`

### Files Changed:
1. **New File**: `client/src/utils/icons.js` - Centralized icon exports
2. **New File**: `client/scripts/fix-lucide-imports.js` - Automated import fixer
3. **Updated**: 24+ component files (pages and templates)
4. **Updated**: `server/index.js` - CORS configuration

## Verification Checklist

After deployment, verify:

1. **Application Loads**
   ```bash
   curl -I https://resume-builder.job-labs.lk
   # Should return: HTTP/2 200
   ```

2. **No Console Errors**
   - Open https://resume-builder.job-labs.lk in browser
   - Open DevTools Console (F12)
   - Should see no "Cannot set properties of undefined" errors

3. **Backend Running**
   ```bash
   pm2 status
   # ai-resume-backend should be "online"
   ```

4. **PM2 Logs Clean**
   ```bash
   pm2 logs ai-resume-backend --lines 50
   # Should show "Connected to MongoDB", "Server running on port 5000"
   ```

5. **Nginx Running**
   ```bash
   sudo systemctl status nginx
   # Should be "active (running)"
   ```

## Troubleshooting

### If deployment fails:

1. **Check Git Pull**
   ```bash
   cd /var/www/ai-resume-builder
   git status
   git log -1
   ```

2. **Check Build Errors**
   ```bash
   cd /var/www/ai-resume-builder/client
   npm run build
   # Look for any build errors
   ```

3. **Check PM2 Status**
   ```bash
   pm2 describe ai-resume-backend
   pm2 logs ai-resume-backend --err
   ```

4. **Check Nginx Errors**
   ```bash
   sudo nginx -t
   sudo tail -f /var/log/nginx/error.log
   ```

### If icons still don't work:

1. **Verify utils/icons.js exists**
   ```bash
   cat /var/www/ai-resume-builder/client/src/utils/icons.js | head -20
   ```

2. **Check imports in components**
   ```bash
   cd /var/www/ai-resume-builder/client
   grep -r "from 'lucide-react'" src/
   # Should return NO results (or only in utils/icons.js)
   ```

3. **Rebuild with cache clear**
   ```bash
   cd /var/www/ai-resume-builder/client
   rm -rf node_modules/.vite
   npm run build
   ```

## Environment Variables

Make sure these are set correctly on the VPS:

**Backend** (`/var/www/ai-resume-builder/server/.env`):
```env
PORT=5000
FRONTEND_URL=https://resume-builder.job-labs.lk
CORS_ORIGIN=https://resume-builder.job-labs.lk
MONGODB_URI=mongodb+srv://...
JWT_SECRET=joblabs
```

**Frontend** (`/var/www/ai-resume-builder/client/.env`):
```env
VITE_BASE_URL=https://resume-builder.job-labs.lk/api
```

## Rollback (If Needed)

```bash
cd /var/www/ai-resume-builder
git log --oneline -5
git reset --hard <previous-commit-hash>
cd client && npm run build
cd ../server && pm2 restart ai-resume-backend
```

## Next Steps After Successful Deployment

1. ✅ Test all features:
   - Sign up / Sign in
   - Resume builder
   - AI suggestions
   - Template previews
   - Download resume
   - Points system
   - Referral system

2. ✅ Monitor logs for 24 hours:
   ```bash
   pm2 monit
   ```

3. ✅ Set up automated backups
4. ✅ Configure monitoring (e.g., UptimeRobot)
5. ✅ Document any remaining issues

## Support

- GitHub Repo: https://github.com/chamma08/ai-resume-builder
- Live Site: https://resume-builder.job-labs.lk
- VPS: srv1118555 (Hostinger)
