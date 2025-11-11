/**
 * Image Optimization Script
 * 
 * This script helps identify and optimize large images in your project.
 * Run: node scripts/optimize-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all image files recursively
function getAllImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      getAllImages(filePath, fileList);
    } else if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file)) {
      fileList.push({
        path: filePath,
        size: stat.size,
        name: file
      });
    }
  });
  
  return fileList;
}

// Format bytes to human readable
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Main function
function analyzeImages() {
  console.log('🔍 Analyzing images in your project...\n');
  
  const srcDir = path.join(__dirname, '..', 'src');
  const publicDir = path.join(__dirname, '..', 'public');
  
  let images = [];
  
  if (fs.existsSync(srcDir)) {
    images = [...images, ...getAllImages(srcDir)];
  }
  if (fs.existsSync(publicDir)) {
    images = [...images, ...getAllImages(publicDir)];
  }
  
  // Sort by size (largest first)
  images.sort((a, b) => b.size - a.size);
  
  const totalSize = images.reduce((sum, img) => sum + img.size, 0);
  const largeImages = images.filter(img => img.size > 100000); // > 100KB
  
  console.log('📊 Image Analysis Report\n');
  console.log('━'.repeat(80));
  console.log(`Total images found: ${images.length}`);
  console.log(`Total size: ${formatBytes(totalSize)}`);
  console.log(`Images over 100KB: ${largeImages.length}`);
  console.log('━'.repeat(80));
  console.log('\n🔴 Large Images (> 100KB) - NEED OPTIMIZATION:\n');
  
  largeImages.forEach((img, index) => {
    const priority = img.size > 1000000 ? '⚠️  CRITICAL' : 
                     img.size > 500000 ? '🔴 HIGH' : '🟡 MEDIUM';
    console.log(`${index + 1}. ${img.name}`);
    console.log(`   Size: ${formatBytes(img.size)} ${priority}`);
    console.log(`   Path: ${img.path.replace(process.cwd(), '.')}`);
    console.log('');
  });
  
  console.log('\n💡 Optimization Tips:\n');
  console.log('1. Use online tools:');
  console.log('   • TinyPNG.com - Great for PNG/JPG compression');
  console.log('   • Squoosh.app - Convert to WebP format');
  console.log('   • ImageOptim - Desktop app for Mac');
  console.log('');
  console.log('2. Convert to WebP format (60-80% smaller):');
  console.log('   • Install: npm install --save-dev sharp');
  console.log('   • Or use: https://cloudconvert.com/');
  console.log('');
  console.log('3. Target sizes:');
  console.log('   • Hero images: < 100 KB');
  console.log('   • Content images: < 50 KB');
  console.log('   • Thumbnails: < 20 KB');
  console.log('   • Icons: < 10 KB');
  console.log('');
  console.log('4. Use the OptimizedImage component we created:');
  console.log('   <OptimizedImage src="/path/to/image.jpg" alt="..." />');
  console.log('\n━'.repeat(80));
  
  // Calculate potential savings
  const potentialSavings = largeImages.reduce((sum, img) => {
    // Estimate 70% reduction with WebP + optimization
    return sum + (img.size * 0.7);
  }, 0);
  
  console.log(`\n🚀 Potential Savings: ${formatBytes(potentialSavings)} (≈70% reduction)`);
  console.log(`   This would improve your Lighthouse score by 20-30 points!\n`);
}

// Run the analysis
try {
  analyzeImages();
} catch (error) {
  console.error('Error analyzing images:', error.message);
}
