const config = require('config');
const nodemailer = require('nodemailer');

const send = async (emails, rate) => {
  try {
    const smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: config.serviceEmail.address,
        pass: config.serviceEmail.pass,
      }
    });
    await Promise.all(emails.map(async (email) => {
      const username = email.email.split("@")[0];
      const mailOptions = {
        to: email.email,
        from: config.serviceEmail.address,
        subject: "The most up-to-date and the most accurate BTC to UAH rate",
        html: `Greetings ${username}, <br><br>   The BTC to UAH rate is ${rate}<br><br>  Have a nice trading!`
      };
      await smtpTransport.sendMail(mailOptions);
    }));
  } catch (e) {
    throw new Error(`${e}`);
  }
}

module.exports = {
  send,
}
