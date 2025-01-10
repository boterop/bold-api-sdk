const paymentMethodsService = require('../services/payment_methods');

const paymentMethods = {
  list: async apiKey => paymentMethodsService.list(apiKey),
};

module.exports = paymentMethods;
