const Router = require('koa-router');
const yamljs = require('yamljs');
const { koaSwagger } = require('koa2-swagger-ui');
const serviceController = require('../controllers/serviceController');
const { subscribe } = require('../controllers/emailController');
const { getRate } = require('../controllers/rateController');

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
  // .get('/api/rate', 'https://api.nomics.com/v1/currencies/ticker?key=c1628140e82888c6ee523ae08fe8f1a6c163e346&ids=BTC,UAH')
  // fetch("https://api.nomics.com/v1/exchange-rates?key=your-key-here")
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  // .get('/api/rate', 'https://blockchain.info/ru/ticker')
  // https://coinlayer.com/target UAH included

  // .get('/api/rate', 'https://blockchain.info/ru/tobtc?currency=USD&value=500')!!!!
  // https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json  НБУ
  .get('/api/rate', getRate)

  .post('/api/subscribe', subscribe)

module.exports = {
  routesPrivate() {
    return routesPrivate.routes();
  },
};
