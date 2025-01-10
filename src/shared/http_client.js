const path = require('path');

const httpClient = {
  async fetch({ url, endpoint, options = {} }) {
    const response = await fetch(
      path.join(url || process.env.BOLD_API_URL, endpoint),
      {
        ...options,
        headers: {
          Authorization: `x-api-key ${process.env.BOLD_API_KEY}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      },
    );
    return await response.json();
  },
};

module.exports = httpClient;
