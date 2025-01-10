const paymentMethods = require('../../src/domain/payment_methods');

describe('paymentMethods', () => {
  describe('list', () => {
    it('should return a list of payment methods', async () => {
      process.env.BOLD_API_URL = 'https://example.org';
      const response = await paymentMethods.list('bold-api-key');
      const { url, options } = response;

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Object);
      expect(url).toBe('https://example.org/online/link/v1/payment_methods');
      expect(options.headers.Authorization).toBe('x-api-key bold-api-key');
    });
  });
});
