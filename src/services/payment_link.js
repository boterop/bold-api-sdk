const { httpClient } = require('../shared');

const URL = '/online/link/v1';

exports.get = async (apiKey, id) =>
  httpClient.fetch({
    endpoint: `${URL}/${id}`,
    apiKey,
  });

exports.create = async (
  apiKey,
  {
    amountType,
    description,
    payerEmail,
    amount,
    tipAmount,
    callbackUrl,
    expirationMinutes,
    currency,
    iva,
  } = {},
) => {
  amountType = amountType || 'OPEN';
  description = description || '';
  payerEmail = payerEmail || '';
  amount = Math.abs(amount || 0);
  tipAmount = Math.abs(tipAmount || 0);
  callbackUrl = callbackUrl || null;
  expirationMinutes = expirationMinutes || 30;
  currency = currency || 'COP';
  iva = iva || 0;

  if (amountType !== 'CLOSE' && amountType !== 'OPEN') {
    throw new Error('Invalid amount type, must be CLOSE or OPEN');
  }

  const ivaValue = iva / 100;

  const currentNanoseconds = Date.now() * 1e6;
  const minutesInNanoseconds = expirationMinutes * 60 * 1e9;
  const futureNanoseconds = currentNanoseconds + minutesInNanoseconds;

  const hasTaxes = iva > 0;
  const ivaTax =
    iva > 0 ? { type: 'VAT', base: amount, value: amount * ivaValue } : null;

  const amountOpt =
    amountType === 'CLOSE'
      ? {
          amount: {
            total_amount: amount * (ivaValue + 1) + tipAmount,
            currency,
            tip_amount: tipAmount,
            taxes: hasTaxes ? [ivaTax] : [],
          },
        }
      : {};

  return httpClient.fetch({
    endpoint: URL,
    apiKey,
    options: {
      method: 'POST',
      body: JSON.stringify({
        amount_type: amountType,
        ...amountOpt,
        description,
        expiration_date: futureNanoseconds,
        callback_url: callbackUrl,
        payer_email: payerEmail,
      }),
    },
  });
};
