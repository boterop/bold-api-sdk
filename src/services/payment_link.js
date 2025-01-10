const { httpClient } = require('../shared');

exports.create = async (apiKey, order, amount, callback_url) => {
  const expirationMinutes = 30;
  const currentNanoseconds = Date.now() * 1e6;
  const minutesInNanoseconds = expirationMinutes * 60 * 1e9;
  const futureNanoseconds = currentNanoseconds + minutesInNanoseconds;

  return httpClient.fetch({
    endpoint: '/online/link/v1',
    apiKey,
    options: {
      method: 'POST',
      body: JSON.stringify({
        amount_type: 'CLOSE',
        amount: {
          total_amount: amount,
          currency: 'COP',
        },
        description: `Payment for order ${order.id}`,
        expiration_date: futureNanoseconds,
        callback_url,
        payer_email: order.email,
      }),
    },
  });
};
