const config = require('config');
const fetch = require('node-fetch');

const getBtcUsdRate = async () => {
  try {
    return await fetch(config.thirdPartyApiUrls.bitpay)
      .then((res) => res.json())
      .then((data) => {
        const btcUsdObj = data.find((d) => d.code === 'USD');
        return btcUsdObj.rate;
      })
  } catch (e) {
    throw new Error(`rateHelper.js::getBtcUsdRate::Error:${e.message}`);
  }
};

const getUsdUahRate = async () => {
  try {
    return await fetch(config.thirdPartyApiUrls.nbu)
      .then((res) => res.json())
      .then((data) => data[0].rate);
  } catch (e) {
    throw new Error(`rateHelper.js::getUsdUahRate::Error:${e.message}`);
  }
};

const calculateBtcUahRate = (usdUahRate, usdBtcRate) => (usdBtcRate * usdUahRate).toFixed(2);

const getBtcUahRate = async () => {
  try {
    const usdBtcRate = await getBtcUsdRate()
    const usdUahRate = await getUsdUahRate()
    return await calculateBtcUahRate(usdUahRate, usdBtcRate)
  } catch (e) {
    throw new Error(`rateHelper.js::calculateBtcUahRate::${e.message}`);
  }
}

module.exports = {
  getBtcUahRate,
}
