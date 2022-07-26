const config = require('config');

const timer = (() => {
  const mark = Date.now();
  return () => Date.now() - mark;
})();

const {
  name,
  version,
  description,
  env,
} = config.app;

const serviceHeaders = () => async (ctx, next) => {
  ctx.set('Service-Version', version ?? 'x.x.x');
  ctx.set('Service-Name', name ?? 'UNDEFINED');
  await next();
};

const about = () => {
  return {
    app: {
      name,
      version,
      description,
      env,
    },
    uptime: String(timer()),
    swaggerLink: config.swagger.link,
  }
};

module.exports = {
  serviceHeaders,
  about,
};
