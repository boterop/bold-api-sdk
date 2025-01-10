const { httpClient } = require('../shared');

exports.create = async (
  apiKey,
  {
    amountType = 'OPEN',
    description,
    payerEmail,
    amount,
    callbackUrl,
    expirationMinutes,
    currency,
  },
) => {
  if (amountType !== 'CLOSE' && amountType !== 'OPEN') {
    throw new Error('Invalid amount type, must be CLOSE or OPEN');
  }

  const currentNanoseconds = Date.now() * 1e6;
  const minutesInNanoseconds = (expirationMinutes || 30) * 60 * 1e9;
  const futureNanoseconds = currentNanoseconds + minutesInNanoseconds;

  const amountOpt =
    amountType === 'CLOSE'
      ? {
          amount: {
            total_amount: amount || 0,
            currency: currency || 'COP',
          },
        }
      : {};

  return httpClient.fetch({
    endpoint: '/online/link/v1',
    apiKey,
    options: {
      method: 'POST',
      body: JSON.stringify({
        amount_type: amountType,
        ...amountOpt,
        description: description || '',
        expiration_date: futureNanoseconds,
        callback_url: callbackUrl || '',
        payer_email: payerEmail || '',
      }),
    },
  });
};
