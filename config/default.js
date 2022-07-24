const pkg = require('../package.json');

module.exports= {
  app: {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    env: process.env.NODE_ENV,
  },
  server: {
    port: process.env.NODE_APP_INSTANCE,
  },
  swagger: {
    fileName: process.env.SWAGGER_FILE_NAME
  },
};
