const paymentLinkService = require('../services/payment_link');

const paymentLink = {
  create: async (apiKey, order, amount, callback_url) =>
    paymentLinkService.create(apiKey, order, amount, callback_url),
};

module.exports = paymentLink;
