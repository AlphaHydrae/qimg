var config = {
  port: process.env.PORT || '3000',
  env: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'postgres://localhost/qimg',
  adminToken: process.env.QIMG_ADMIN_TOKEN || 'admin',
  imageQuota: parseEnvInt('QIMG_IMAGE_QUOTA', 1) || 10
};

config.appUrl = process.env.QIMG_URL || 'http://localhost:' + config.port;

module.exports = config;

function parseEnvInt(name, min, max) {
  const value = process.env[name];
  if (value === undefined) {
    return;
  }

  const parsed = parseInt(process.env[name]);
  if (isNaN(parsed) || (min !== undefined && parsed < min) || (max !== undefined && parsed > max)) {
    throw new Error(`Environment variable $${name} must be a valid integer between ${min || '-Infinity'} and ${max || 'Infinity'}`);
  }

  return parsed;
}