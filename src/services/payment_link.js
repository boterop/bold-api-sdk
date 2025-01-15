const { httpClient } = require('../shared');

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
  amount = amount || 0;
  tipAmount = tipAmount || 0;
  callbackUrl = callbackUrl || null;
  expirationMinutes = expirationMinutes || 30;
  currency = currency || 'COP';
  iva = iva || false;

  if (amountType !== 'CLOSE' && amountType !== 'OPEN') {
    throw new Error('Invalid amount type, must be CLOSE or OPEN');
  }

  const currentNanoseconds = Date.now() * 1e6;
  const minutesInNanoseconds = expirationMinutes * 60 * 1e9;
  const futureNanoseconds = currentNanoseconds + minutesInNanoseconds;

  const tip = Math.abs(tipAmount);
  const totalAmount = Math.abs(amount) + tip;

  const taxes = iva
    ? { type: 'VAT', base: totalAmount, value: totalAmount * 0.19 }
    : {};

  const amountOpt =
    amountType === 'CLOSE'
      ? {
          amount: {
            total_amount: totalAmount,
            currency,
            tip_amount: tip,
            taxes,
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
        description,
        expiration_date: futureNanoseconds,
        callback_url: callbackUrl,
        payer_email: payerEmail,
      }),
    },
  });
};
