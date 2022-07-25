const Router = require('koa-router');
const yamljs = require('yamljs');
const { koaSwagger } = require('koa2-swagger-ui');
const serviceController = require('../controllers/serviceController');

const routesPrivate = new Router();

const spec = yamljs.load(`${__dirname}/../../gses2swagger.yaml`);

routesPrivate.get('/docs', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }));

routesPrivate
  // service routes
  .get('/', (ctx) => {
    Object.assign(ctx, {
      body: serviceController.about(),
    });
  })

module.exports = {
  routesPrivate() {
    return routesPrivate.routes();
  },
};
