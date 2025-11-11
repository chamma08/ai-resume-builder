#!/bin/bash

# AI Resume Builder - Quick Deployment Script for Hostinger VPS
# Usage: bash deploy.sh

set -e

echo "🚀 AI Resume Builder - Deployment Script"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    print_error "Please run as root or with sudo"
    exit 1
fi

# Step 1: Update system
print_info "Updating system packages..."
apt update && apt upgrade -y
print_success "System updated"

# Step 2: Install Node.js using NVM
print_info "Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install 22
    nvm use 22
    nvm alias default 22
    print_success "Node.js installed"
else
    print_success "Node.js already installed"
fi

# Step 3: Install Git
print_info "Installing Git..."
apt install -y git
print_success "Git installed"

# Step 4: Install PM2
print_info "Installing PM2..."
npm install -g pm2
print_success "PM2 installed"

# Step 5: Install Nginx
print_info "Installing Nginx..."
apt install -y nginx
systemctl start nginx
systemctl enable nginx
print_success "Nginx installed and started"

# Step 6: Install Certbot
print_info "Installing Certbot for SSL..."
apt install -y certbot python3-certbot-nginx
print_success "Certbot installed"

# Step 7: Clone repository
print_info "Setting up project directory..."
mkdir -p /var/www
cd /var/www

if [ -d "ai-resume-builder" ]; then
    print_info "Project directory exists. Pulling latest changes..."
    cd ai-resume-builder
    git pull
else
    print_info "Cloning repository..."
    read -p "Enter your GitHub repository URL: " REPO_URL
    git clone $REPO_URL ai-resume-builder
    cd ai-resume-builder
fi
print_success "Repository ready"

# Step 8: Setup Backend
print_info "Setting up backend..."
cd server

if [ ! -f ".env" ]; then
    print_info "Creating .env file for backend..."
    cat > .env << EOF
PORT=5000
NODE_ENV=production
MONGO_URI=
JWT_SECRET=
OPENAI_API_KEY=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASSWORD=
EMAIL_FROM=
FRONTEND_URL=
CORS_ORIGIN=
EOF
    print_info "Please edit /var/www/ai-resume-builder/server/.env with your credentials"
fi

npm install
print_success "Backend dependencies installed"

# Step 9: Setup Frontend
print_info "Setting up frontend..."
cd ../client

read -p "Enter your domain (e.g., yourdomain.com): " DOMAIN

if [ ! -f ".env" ]; then
    cat > .env << EOF
VITE_BASE_URL=https://$DOMAIN/api
EOF
fi

npm install
npm run build
print_success "Frontend built successfully"

# Step 10: Configure Nginx
print_info "Configuring Nginx..."
cat > /etc/nginx/sites-available/ai-resume-builder << EOF
upstream backend {
    server localhost:5000;
}

server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    root /var/www/ai-resume-builder/client/dist;
    index index.html;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    location / {
        try_files \$uri \$uri/ /index.html;
        
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    location /api/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    access_log /var/log/nginx/ai-resume-builder_access.log;
    error_log /var/log/nginx/ai-resume-builder_error.log;
}
EOF

ln -sf /etc/nginx/sites-available/ai-resume-builder /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

nginx -t && systemctl reload nginx
print_success "Nginx configured"

# Step 11: Configure Firewall
print_info "Configuring firewall..."
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable
print_success "Firewall configured"

# Step 12: Start Backend with PM2
print_info "Starting backend with PM2..."
cd /var/www/ai-resume-builder/server
pm2 delete ai-resume-backend 2>/dev/null || true
pm2 start index.js --name ai-resume-backend
pm2 startup
pm2 save
print_success "Backend started"

# Step 13: Setup SSL
print_info "Setting up SSL certificate..."
read -p "Enter your email for SSL certificate: " EMAIL
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email $EMAIL --redirect
print_success "SSL certificate installed"

echo ""
echo "=========================================="
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Edit /var/www/ai-resume-builder/server/.env with your credentials"
echo "2. Restart backend: pm2 restart ai-resume-backend"
echo "3. Visit your site: https://$DOMAIN"
echo ""
echo "Useful commands:"
echo "  - Check backend: pm2 status"
echo "  - View logs: pm2 logs ai-resume-backend"
echo "  - Check Nginx: sudo systemctl status nginx"
echo ""
