#!/bin/bash

# AI Resume Builder - Quick Deploy Script
# This script pulls the latest code and rebuilds the application

set -e  # Exit on error

echo "================================"
echo "AI Resume Builder - Deployment"
echo "================================"
echo ""

# Navigate to project directory
cd /var/www/ai-resume-builder

echo "📥 Pulling latest changes from GitHub..."
git pull origin main

echo ""
echo "🔧 Installing dependencies..."

# Backend dependencies
echo "  → Backend dependencies..."
cd server
npm install --production

# Frontend dependencies and build
echo "  → Frontend dependencies..."
cd ../client
npm install

echo ""
echo "🏗️  Building frontend..."
npm run build

echo ""
echo "🔄 Restarting backend..."
cd ../server
pm2 restart ai-resume-backend

echo ""
echo "🔄 Reloading Nginx..."
sudo systemctl reload nginx

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "🌐 Your application is live at: https://resume-builder.job-labs.lk"
echo ""
echo "📊 Check PM2 logs: pm2 logs ai-resume-backend"
echo "📊 Check Nginx logs: sudo tail -f /var/log/nginx/error.log"
