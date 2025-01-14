const { paymentLinkService } = require('../services');

const paymentLink = {
  create: async (apiKey, order) => paymentLinkService.create(apiKey, order),
};

module.exports = paymentLink;
