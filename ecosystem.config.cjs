module.exports = {
  apps: [{
    name: 'lucy-app',
    script: './build/index.js',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      ORIGIN: 'https://lucyterryprince.deerfield-ma.org/'
    }
  }]
}
