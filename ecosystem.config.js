module.exports = {
  apps: [
    {
      name: 'beauty-academy-api',
      script: './backend-node/server.js',
      cwd: './',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 5000,
        JWT_SECRET: 'your-jwt-secret-here',
        JWT_EXPIRE: '30d',
        MONGODB_URI: 'mongodb://localhost:27017/sajosajo_beauty'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
        JWT_SECRET: process.env.JWT_SECRET || 'production-jwt-secret-change-this',
        JWT_EXPIRE: '7d',
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/sajosajo_beauty'
      },
      // Logging
      log_file: './logs/beauty-academy.log',
      out_file: './logs/beauty-academy-out.log',
      error_file: './logs/beauty-academy-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Process management
      max_memory_restart: '1G',
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s',
      
      // Monitoring
      watch: false,
      ignore_watch: [
        'node_modules',
        'logs',
        'dist',
        'public',
        'src'
      ],
      
      // Auto restart on file changes (for development only)
      watch_options: {
        followSymlinks: false
      },
      
      // Advanced PM2 features
      kill_timeout: 5000,
      listen_timeout: 3000,
      
      // Health check
      health_check_http: {
        url: 'http://localhost:5000/api/health',
        interval: 30000,
        timeout: 5000
      }
    },
    {
      name: 'beauty-academy-frontend',
      script: 'serve',
      args: '-s dist -l 3000',
      cwd: './',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      
      // Logging
      log_file: './logs/frontend.log',
      out_file: './logs/frontend-out.log',
      error_file: './logs/frontend-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Process management
      max_memory_restart: '500M',
      restart_delay: 2000,
      max_restarts: 5,
      min_uptime: '5s',
      
      // Monitoring
      watch: false,
      kill_timeout: 3000,
      listen_timeout: 3000
    }
  ],
  
  // Deployment configuration
  deploy: {
    production: {
      user: 'deploy',
      host: ['your-server-ip'],
      ref: 'origin/main',
      repo: 'https://github.com/SajoSajao/sajosajao-pro.git',
      path: '/var/www/beauty-academy',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production && pm2 save',
      'pre-setup': 'apt-get update && apt-get install -y git nodejs npm mongodb',
      env: {
        NODE_ENV: 'production'
      }
    },
    staging: {
      user: 'deploy',
      host: ['staging-server-ip'],
      ref: 'origin/staging',
      repo: 'https://github.com/SajoSajao/sajosajao-pro.git',
      path: '/var/www/beauty-academy-staging',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env staging && pm2 save',
      env: {
        NODE_ENV: 'staging'
      }
    }
  },
  
  // PM2+ monitoring (optional)
  monitoring: {
    enabled: true,
    instance_name: 'beauty-academy',
    public_key: 'your-keymetrics-public-key',
    secret_key: 'your-keymetrics-secret-key'
  }
};