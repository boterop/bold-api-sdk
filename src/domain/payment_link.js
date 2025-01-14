const paymentLinkService = require('../services/payment_link');

const paymentLink = {
  create: async (apiKey, order) => paymentLinkService.create(apiKey, order),
};

module.exports = paymentLink;
