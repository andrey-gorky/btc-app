const helper = require('../helpers/subscribeHelper');

const subscribe = async (ctx, next) => {
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
    ctx.message = 'Щось пішло не так :('
    await next();
  }
};

module.exports = {
  subscribe,
}
