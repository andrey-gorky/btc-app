const Router = require('koa-router');
const yamljs = require('yamljs');
const { koaSwagger } = require('koa2-swagger-ui');
const serviceController = require('../controllers/serviceController');
const { subscribe, sendEmails } = require('../controllers/emailController');
const { getRate } = require('../controllers/rateController');

const routesPrivate = new Router();

const spec = yamljs.load(`${__dirname}/../../gses2swagger.yaml`);

routesPrivate.get('/docs', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }));

routesPrivate
  .get('/', (ctx) => {
    Object.assign(ctx, {
      body: serviceController.about(),
    });
  })
  .get('/api/rate', getRate)

  .post('/api/subscribe', subscribe)
  .post('/api/sendEmails', sendEmails)

module.exports = {
  routesPrivate() {
    return routesPrivate.routes();
  },
};
