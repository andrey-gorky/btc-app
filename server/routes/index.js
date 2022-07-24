const Router = require('koa-router');
const serviceController = require('../controllers/serviceController');

const routesPrivate = new Router();

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
