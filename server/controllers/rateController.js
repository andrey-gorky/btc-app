const helper = require("../helpers/rateHelper");

const getRate = async (ctx, next) => {
  try {
    const btcUahRate = await helper.getBtcUahRate();
    Object.assign(ctx, {
      body: btcUahRate,
      status: 200,
    });
    await next();
  } catch (e) {
    console.error(`[*] rateController.js::getRate::${e.message}`);
    ctx.status = 400;
    ctx.body = 'Invalid status value'
    ctx.message = 'Invalid status value'
    await next();
  }
};

module.exports = {
  getRate,
}
