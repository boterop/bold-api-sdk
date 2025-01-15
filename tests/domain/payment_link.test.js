const paymentLink = require('../../src/domain/payment_link');

describe('paymentLink', () => {
  const PAYMENT_LINK = 'bold.co/payment';

  describe('create', () => {
    const amountType = 'CLOSE';
    const description = 'Payment for order order-id';
    const payerEmail = 'test@example.org';
    const amount = 1000;
    const callbackUrl = 'https://example.org/return';
    const expirationMinutes = 30;
    const currency = 'COP';
    const apiKey = process.env.BOLD_API_KEY || 'bold-api-key';

    beforeEach(() => {
      process.env.BOLD_API_URL = 'https://integrations.api.bold.co';
    });

    it('should return a payment link', async () => {
      const response = await paymentLink.create(apiKey, {
        amountType,
        description,
        payerEmail,
        amount,
        callbackUrl,
        expirationMinutes,
        currency,
      });

      const { payload, errors } = response;

      expect(errors).toHaveLength(0);

      expect(payload.url).toContain(PAYMENT_LINK);
    });

    it('should not send amount if type is OPEN', async () => {
      const response = await paymentLink.create(apiKey, {
        description,
        payerEmail,
        amount,
        callbackUrl,
        expirationMinutes,
        currency,
      });

      const { payload, errors } = response;

      expect(errors).toHaveLength(0);

      expect(payload.url).toContain(PAYMENT_LINK);
    });

    it('should set default values if not provided', async () => {
      const response = await paymentLink.create(apiKey);

      const { payload, errors } = response;

      expect(errors).toHaveLength(0);

      expect(payload.url).toContain(PAYMENT_LINK);
    });

    it('should create a payment link with iva', async () => {
      const response = await paymentLink.create(apiKey, {
        amountType: 'CLOSE',
        amount: 1000,
        tipAmount: 100,
        iva: true,
      });

      const { payload, errors } = response;

      expect(errors).toHaveLength(0);

      expect(payload.url).toContain(PAYMENT_LINK);
    });

    it('should send error if amount type is not CLOSE or OPEN', async () => {
      try {
        await paymentLink.create(apiKey, {
          amountType: 'INVALID',
          description,
          payerEmail,
          amount,
          callbackUrl,
          expirationMinutes,
          currency,
        });
      } catch (error) {
        expect(error.message).toBe(
          'Invalid amount type, must be CLOSE or OPEN',
        );
      }
    });
  });
});
