const paymentMethods = require('../../src/domain/payment_methods');

describe('paymentMethods', () => {
  describe('list', () => {
    it('should return a list of payment methods', async () => {
      process.env.BOLD_API_URL = 'https://integrations.api.bold.co';
      const response = await paymentMethods.list();
      const { payload, errors } = response;

      expect(errors).toBeDefined();
      expect(errors).toHaveLength(0);

      expect(payload).toBeDefined();
      expect(payload.payment_methods).toBeDefined();
      expect(payload.payment_methods.CREDIT_CARD).toBeDefined();
    });
  });
});
