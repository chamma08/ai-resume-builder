#!/bin/bash

# 🚨 EMERGENCY CACHE CLEAR & REDEPLOY SCRIPT
# Run this on your Hostinger VPS to fix the Redux error

set -e  # Exit on any error

echo "=================================================="
echo "🚨 EMERGENCY FIX - Clearing Cache & Redeploying"
echo "=================================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PROJECT_DIR="/var/www/ai-resume-builder"
CLIENT_DIR="$PROJECT_DIR/client"
BACKUP_DIR="$PROJECT_DIR/dist-backup-$(date +%Y%m%d-%H%M%S)"

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run with sudo or as root${NC}"
    exit 1
fi

# Navigate to project directory
cd "$PROJECT_DIR" || exit 1

echo -e "${YELLOW}Step 1: Backing up current dist folder...${NC}"
if [ -d "$CLIENT_DIR/dist" ]; then
    cp -r "$CLIENT_DIR/dist" "$BACKUP_DIR"
    echo -e "${GREEN}✓ Backup created at: $BACKUP_DIR${NC}"
fi

echo -e "${YELLOW}Step 2: Pulling latest code from GitHub...${NC}"
git fetch origin
git reset --hard origin/main
echo -e "${GREEN}✓ Latest code pulled${NC}"

echo -e "${YELLOW}Step 3: Removing old dist folder...${NC}"
rm -rf "$CLIENT_DIR/dist"
rm -rf "$CLIENT_DIR/node_modules/.vite"
echo -e "${GREEN}✓ Old build removed${NC}"

echo -e "${YELLOW}Step 4: Installing client dependencies...${NC}"
cd "$CLIENT_DIR"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"

echo -e "${YELLOW}Step 5: Building fresh client...${NC}"
npm run build
echo -e "${GREEN}✓ Client built successfully${NC}"

echo -e "${YELLOW}Step 6: Clearing Nginx cache...${NC}"
# Clear nginx cache if it exists
if [ -d "/var/cache/nginx" ]; then
    rm -rf /var/cache/nginx/*
fi
echo -e "${GREEN}✓ Nginx cache cleared${NC}"

echo -e "${YELLOW}Step 7: Restarting Nginx...${NC}"
systemctl restart nginx
echo -e "${GREEN}✓ Nginx restarted${NC}"

echo -e "${YELLOW}Step 8: Checking PM2 backend...${NC}"
cd "$PROJECT_DIR/server"
pm2 restart ai-resume-backend
echo -e "${GREEN}✓ Backend restarted${NC}"

echo ""
echo "=================================================="
echo -e "${GREEN}✓ DEPLOYMENT COMPLETE!${NC}"
echo "=================================================="
echo ""
echo "Next steps:"
echo "1. Clear your browser cache (Ctrl+Shift+Delete)"
echo "2. Do a hard refresh (Ctrl+Shift+R)"
echo "3. Check browser console for errors"
echo ""
echo "Build info:"
echo "- Old backup: $BACKUP_DIR"
echo "- New build: $CLIENT_DIR/dist"
echo ""
echo "To check logs:"
echo "  - Nginx: sudo tail -f /var/log/nginx/error.log"
echo "  - Backend: pm2 logs ai-resume-backend"
echo ""
