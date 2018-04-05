require('isomorphic-fetch');

export default event => {
  const stEndpoint = `http://1.phisix-api.appspot.com/stocks/${event.data.symbol}.json`;

  return fetch(stEndpoint)
    .then(response => response.json())
    .then(resposeData => {
      //{"stock":[{"name":"Ayala Corp","price":{"currency":"PHP","amount":910.00},"percent_change":-0.55,"volume":24550,"symbol":"AC"}],"as_of":"2018-04-05T10:06:00+08:00"}

      let returnData = {};
      let stock = resposeData.stock[0]

      returnData.as_of = resposeData.as_of;
      returnData.name = stock.name;
      returnData.price = stock.price.currency + stock.price.amount;
      returnData.volume = stock.volume;
      returnData.symbol = stock.symbol;
      returnData.percent_change = stock.percent_change;

      return {
        data: returnData
      };
    });
}