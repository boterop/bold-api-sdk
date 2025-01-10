const paymentLinkService = require('../../src/services/payment_link');

describe('paymentLinkService', () => {
  describe('create', () => {
    const amountType = 'CLOSE';
    const description = 'Payment for order order-id';
    const payerEmail = 'test@example.org';
    const amount = 300;
    const callbackUrl = 'https://example.org/return';
    const expirationMinutes = 30;
    const currency = 'USD';

    it('should return a payment link', async () => {
      process.env.BOLD_API_URL = 'https://example.org';

      const response = await paymentLinkService.create('bold-api-key', {
        amountType,
        description,
        payerEmail,
        amount,
        callbackUrl,
        expirationMinutes,
        currency,
      });
      const { url, options } = response;
      const body = JSON.parse(options.body);

      expect(url).toBe('https://example.org/online/link/v1');
      expect(options.headers.Authorization).toBe('x-api-key bold-api-key');
      expect(options.method).toBe('POST');
      expect(body.amount_type).toBe(amountType);
      expect(body.amount.total_amount).toBe(amount);
      expect(body.amount.currency).toBe(currency);
      expect(body.description).toBe(description);
      expect(body.expiration_date).toBeGreaterThan(Date.now() * 1e6);
      expect(body.callback_url).toBe(callbackUrl);
      expect(body.payer_email).toBe(payerEmail);
    });

    it('should not send amount if type is not CLOSE', async () => {
      process.env.BOLD_API_URL = 'https://example.org';

      const response = await paymentLinkService.create('bold-api-key', {
        amountType: 'OPEN',
        description,
        payerEmail,
        amount,
        callbackUrl,
        expirationMinutes,
        currency,
      });
      const { url, options } = response;
      const body = JSON.parse(options.body);

      expect(url).toBe('https://example.org/online/link/v1');
      expect(body.amount).toBeUndefined();
    });
  });
});
