const fetch = require('node-fetch');

const getRate = async () => {
  console.log('=======  =======', )
  const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json');
  const body = await response.json();
  console.log('======= body =======', body)
};

module.exports = {
  getRate,
}
