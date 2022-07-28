const helper = require('../helpers/emailHelper');
const rateHelper = require('../helpers/rateHelper');

const subscribe = async (ctx, next) => {
  //todo check if email is correct
  try {
    const email = ctx?.request?.body?.email;
    const isExist = await helper.isEmailExist(email)
    if (isExist) {
      Object.assign(ctx, {
        body: 'E-mail вже існує',
        status: 409,
      });
      await next();
    } else {
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
