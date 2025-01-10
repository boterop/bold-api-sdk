const paymentMethodsService = require('../services/payment_methods');

const paymentMethods = {
  list: apiKey => paymentMethodsService.list(apiKey),
};

module.exports = paymentMethods;
