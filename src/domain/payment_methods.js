const { paymentMethodsService } = require('../services');

const paymentMethods = {
  list: async apiKey => paymentMethodsService.list(apiKey),
};

module.exports = paymentMethods;
