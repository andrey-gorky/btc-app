const helper = require('../helpers/emailHelper');
const rateHelper = require('../helpers/rateHelper');

const subscribe = async (ctx, next) => {
  try {
    const email = ctx?.request?.body?.email;
    const isEmailValid = await helper.validateEmail(email);
    const isExist = await helper.isEmailExist(email);
    switch (true) {
      case !isEmailValid:
        Object.assign(ctx, {
          body: 'E-mail адреса недійсна',
          status: 404,
        });
        await next();
        break;
      case isExist:
        Object.assign(ctx, {
          body: 'E-mail вже існує',
          status: 409,
        });
        await next();
        break;
      default:
        await helper.save(email)
        Object.assign(ctx, {
          body: 'E-mail додано',
          status: 200,
        });
        await next();
    }
  } catch (e) {
    console.error(`[*] emailController.js::subscribe::${e.message}`);
    ctx.status = 404;
    ctx.body = 'Щось пішло не так :(';
    ctx.message = 'Щось пішло не так :(';
    await next();
  }
};

const sendEmails = async (ctx, next) => {
  try {
    const btcUahRate = await rateHelper.getBtcUahRate();
    const result = await helper.sendEmails(btcUahRate);

    Object.assign(ctx, {
      body: result,
      status: 200,
    });
    await next();
  } catch (e) {
    console.error(`[*] emailController.js::sendEmails::${e.message}`);
    ctx.status = 404;
    ctx.body = 'Щось пішло не так :(';
    ctx.message = 'Щось пішло не так :(';
    await next();
  }
}

module.exports = {
  subscribe,
  sendEmails,
}
