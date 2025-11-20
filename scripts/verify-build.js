#!/usr/bin/env node

/**
 * Build Verification Script
 * 
 * Verifies that the Beauty Academy project is properly built and ready for deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.dirname(__dirname);

console.log('🔍 Verifying Build Status for SajoSajao Beauty Academy');
console.log('==================================================\n');

let allChecks = true;

// Check functions
const checkExists = (filePath, description) => {
  const exists = fs.existsSync(filePath);
  console.log(`${exists ? '✅' : '❌'} ${description}: ${exists ? 'Found' : 'Missing'}`);
  if (!exists) allChecks = false;
  return exists;
};

const checkDirectory = (dirPath, description) => {
  const exists = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  console.log(`${exists ? '✅' : '❌'} ${description}: ${exists ? 'Found' : 'Missing'}`);
  if (!exists) allChecks = false;
  return exists;
};

const getFileSize = (filePath) => {
  try {
    const stats = fs.statSync(filePath);
    const sizeInBytes = stats.size;
    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
    return `${sizeInMB} MB`;
  } catch (error) {
    return 'Unknown';
  }
};

// 1. Frontend Build Verification
console.log('1️⃣ Frontend Build Verification');
console.log('==============================');

const distDir = path.join(projectRoot, 'dist');
checkDirectory(distDir, 'Production build directory');

if (fs.existsSync(distDir)) {
  checkExists(path.join(distDir, 'index.html'), 'Main HTML file');
  checkExists(path.join(distDir, 'robots.txt'), 'Robots.txt file');
  checkExists(path.join(distDir, 'sitemap.xml'), 'Sitemap.xml file');
  
  const assetsDir = path.join(distDir, 'assets');
  if (checkDirectory(assetsDir, 'Assets directory')) {
    const assets = fs.readdirSync(assetsDir);
    const jsFiles = assets.filter(file => file.endsWith('.js'));
    const cssFiles = assets.filter(file => file.endsWith('.css'));
    
    console.log(`   📦 JavaScript files: ${jsFiles.length}`);
    jsFiles.forEach(file => {
      const filePath = path.join(assetsDir, file);
      console.log(`      - ${file} (${getFileSize(filePath)})`);
    });
    
    console.log(`   🎨 CSS files: ${cssFiles.length}`);
    cssFiles.forEach(file => {
      const filePath = path.join(assetsDir, file);
      console.log(`      - ${file} (${getFileSize(filePath)})`);
    });
  }
}

console.log('\n2️⃣ Backend Configuration Verification');
console.log('=====================================');

const backendDir = path.join(projectRoot, 'backend-node');
checkDirectory(backendDir, 'Backend directory');

if (fs.existsSync(backendDir)) {
  checkExists(path.join(backendDir, 'server.js'), 'Main server file');
  checkExists(path.join(backendDir, 'package.json'), 'Backend package.json');
  checkExists(path.join(backendDir, '.env'), 'Environment configuration');
  checkExists(path.join(backendDir, 'node_modules'), 'Backend dependencies');
  
  // Check migrations
  const migrationsDir = path.join(backendDir, 'migrations');
  if (checkDirectory(migrationsDir, 'Migrations directory')) {
    checkExists(path.join(migrationsDir, 'MigrationManager.js'), 'Migration manager');
    
    const versionsDir = path.join(migrationsDir, 'versions');
    if (checkDirectory(versionsDir, 'Migration versions')) {
      const migrations = fs.readdirSync(versionsDir).filter(file => file.endsWith('.js'));
      console.log(`   📋 Migration files: ${migrations.length}`);
    }
  }
}

console.log('\n3️⃣ Production Configuration Verification');
console.log('=======================================');

// Check environment file
const envFile = path.join(backendDir, '.env');
if (fs.existsSync(envFile)) {
  const envContent = fs.readFileSync(envFile, 'utf8');
  
  const requiredVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'NODE_ENV',
    'PORT',
    'CORS_ORIGIN',
    'DOMAIN'
  ];
  
  requiredVars.forEach(varName => {
    const hasVar = envContent.includes(`${varName}=`);
    console.log(`${hasVar ? '✅' : '❌'} ${varName}: ${hasVar ? 'Configured' : 'Missing'}`);
    if (!hasVar) allChecks = false;
  });
  
  // Check if production environment
  const isProduction = envContent.includes('NODE_ENV=production');
  console.log(`${isProduction ? '✅' : '⚠️'} Production environment: ${isProduction ? 'Enabled' : 'Development mode'}`);
  
  // Check JWT secret strength
  const jwtSecretMatch = envContent.match(/JWT_SECRET=(.+)/);
  if (jwtSecretMatch) {
    const jwtSecret = jwtSecretMatch[1].trim();
    const isSecure = jwtSecret.length >= 64 && jwtSecret !== 'your-jwt-secret-here';
    console.log(`${isSecure ? '✅' : '❌'} JWT secret: ${isSecure ? 'Secure' : 'Weak or default'}`);
    if (!isSecure) allChecks = false;
  }
}

console.log('\n4️⃣ Deployment Files Verification');
console.log('================================');

checkExists(path.join(projectRoot, 'ecosystem.config.js'), 'PM2 ecosystem config');
checkExists(path.join(projectRoot, 'PRODUCTION-DEPLOYMENT.md'), 'Deployment guide');
checkExists(path.join(backendDir, '.env.production'), 'Production env template');

console.log('\n' + '='.repeat(50));

if (allChecks) {
  console.log('🎉 BUILD VERIFICATION SUCCESSFUL!');
  console.log('Your Beauty Academy project is ready for deployment!');
  console.log('\n📋 Next steps:');
  console.log('1. Upload to your production server');
  console.log('2. Configure domain DNS settings');
  console.log('3. Install SSL certificates');
  console.log('4. Start with PM2: npm run pm2:start');
  console.log('\n🌐 Your site will be live at: https://sajosajao.com');
} else {
  console.log('❌ BUILD VERIFICATION FAILED!');
  console.log('Please fix the issues above before deploying.');
  process.exit(1);
}

console.log('\n✨ Happy deploying! ✨');