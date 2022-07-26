const fs = require('node:fs/promises');
const config = require("config");

const emailsFile = config.data.emailsFile;

const writeFile = async (data) => {
  await fs.writeFile(emailsFile, JSON.stringify(data, null, 2));
};

const readFile = async () => {
  const data = await fs.readFile(emailsFile);
  return JSON.parse(data.toString());
};

module.exports = {
  writeFile,
  readFile,
}
