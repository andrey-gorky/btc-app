const http = require('http');
const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const { routesPrivate } = require('./routes');
const serviceController = require('./controllers/serviceController');

const serviceHeaders = serviceController.serviceHeaders(config.app)

const app = new Koa();

app.use(bodyParser());

app.use(serviceHeaders);

app.use(async (ctx, next) => {
  if (ctx.status >= 500) {
    const error = new Error();
    error.message = `Status->${ctx.status} Method->${ctx.method} headers-> ${JSON.stringify(ctx.request.headers)}`;
    console.error(error);
  }
  await next();
});
app.on('error', (err, ctx) => {
  if (!ctx.status || ctx.status >= 500) {
    console.error(`[*] Request:${ctx.request}::${err}`);
  }
});

app.use(routesPrivate());

const server = http.createServer(app.callback())
  .listen(config.server.port, () => {
    // eslint-disable-next-line no-console
    console.table({
      Application: config.app.name,
      Version: config.app.version,
      Environment: config.app.env,
      ['Swagger Docs']: config.swagger.link,
    });
  });

module.exports = () => ({
  server,
  closeServer() {
    server.close();
  },
});
