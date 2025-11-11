#!/bin/bash

# AI Resume Builder - Update Script
# Use this script to update your application after pushing new changes

set -e

echo "🔄 Updating AI Resume Builder..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Navigate to project directory
cd /var/www/ai-resume-builder

# Pull latest changes
print_info "Pulling latest changes from GitHub..."
git pull origin main
print_success "Code updated"

# Update Backend
print_info "Updating backend..."
cd server
npm install
pm2 restart ai-resume-backend
print_success "Backend updated and restarted"

# Update Frontend
print_info "Updating frontend..."
cd ../client
npm install
npm run build
print_success "Frontend rebuilt"

# Reload Nginx
print_info "Reloading Nginx..."
sudo systemctl reload nginx
print_success "Nginx reloaded"

echo ""
echo "=========================================="
echo -e "${GREEN}✓ Update Complete!${NC}"
echo "=========================================="
echo ""
echo "Application Status:"
pm2 status
