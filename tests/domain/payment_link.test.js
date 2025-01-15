const paymentLink = require('../../src/domain/payment_link');

describe('paymentLink', () => {
  const PAYMENT_LINK = 'bold.co/payment';
  const apiKey = process.env.BOLD_API_KEY || 'bold-api-key';

  describe('get', () => {
    it('should return a payment link', async () => {
      const { payload } = await paymentLink.create();
      const { payment_link: id } = payload;

      const { status } = await paymentLink.get(apiKey, id);

      expect(status).toBe('ACTIVE');
    });

    it('should return an error if payment link does not exist', async () => {
      const invalidId = 'non-existent-id';
      const { errors } = await paymentLink.get(apiKey, invalidId);

      expect(errors).toHaveLength(1);
      expect(errors[0].errors).toBe(`Link ${invalidId} not valid`);
    });
  });

  describe('create', () => {
    const amountType = 'CLOSE';
    const description = 'Payment for order order-id';
    const payerEmail = 'test@example.org';
    const amount = 1000;
    const callbackUrl = 'https://example.org/return';
    const expirationMinutes = 30;
    const currency = 'COP';

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
        iva: 19,
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
