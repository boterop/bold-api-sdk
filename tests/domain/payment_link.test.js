const paymentLink = require('../../src/domain/payment_link');

describe('paymentLink', () => {
  describe('create', () => {
    it('should return a payment link', async () => {
      process.env.BOLD_API_URL = 'https://example.org';
      const response = await paymentLink.create(
        'bold-api-key',
        {
          id: 'order-id',
          email: 'test@example.org',
          amount: 100,
          products: [
            {
              id: 'product-id',
              name: 'Test product',
              price: 100,
              quantity: 2,
            },
          ],
        },
        200,
        'https://example.org/return',
      );
      const { url, options } = response;
      const body = JSON.parse(options.body);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Object);
      expect(url).toBe('https://example.org/online/link/v1');
      expect(options.headers.Authorization).toBe('x-api-key bold-api-key');
      expect(options.method).toBe('POST');
      expect(body.amount_type).toBe('CLOSE');
      expect(body.amount.total_amount).toBe(200);
      expect(body.amount.currency).toBe('COP');
      expect(body.description).toBe('Payment for order order-id');
      expect(body.expiration_date).toBeGreaterThan(Date.now() * 1e6);
      expect(body.callback_url).toBe('https://example.org/return');
      expect(body.payer_email).toBe('test@example.org');
    });
  });
});
