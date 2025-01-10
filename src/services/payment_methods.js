const httpClient = require('../shared/http_client');

exports.list = async apiKey =>
  await httpClient.fetch({
    endpoint: '/online/link/v1/payment_methods',
    apiKey,
  });
