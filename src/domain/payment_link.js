const { paymentLinkService } = require('../services');

const paymentLink = {
  get: async (apiKey, id) => paymentLinkService.get(apiKey, id),
  create: async (apiKey, order) => paymentLinkService.create(apiKey, order),
};

module.exports = paymentLink;
