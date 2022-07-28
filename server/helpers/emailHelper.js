const fs = require('./fileSystemHelper');
const helper = require('./nodemailerHelper');

const isEmailExist = async (email) => {
  try {
    const emails = await fs.readFile();
    const filtered = emails.filter((e) => e.email === email);
    return !!filtered.length;
  } catch (e) {
    if (e.code.includes('ENOENT')) {
      await fs.writeFile([]);
      return false;
    }
    throw new Error(`subscribeHelper.js:isEmailExist:25::Error:${e.message}`);
  }
};

const save = async (email) => {
  try {
    const emails = await fs.readFile();

    const data = {
      id: emails.length + 1,
      email,
    };
    emails.push(data);
    await fs.writeFile(emails);
  } catch (e) {
    throw new Error(`subscribeHelper.js:save::Error:${e.message}`);
  }
};

const sendEmails = async (rate) => {
  try {
    const emails = await fs.readFile();
    if (emails.length) {
      await helper.send(emails, rate)
      return 'E-mailʼи відправлено';
    } else {
      return 'Не додано жодного E-mailʼу';
    }
  } catch (e) {
    throw new Error(`emailHelper.js:sendEmails::Error:${e.message}`);
  }
}

module.exports = {
  isEmailExist,
  save,
  sendEmails,
}
