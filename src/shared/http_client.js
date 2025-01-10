const httpClient = {
  async fetch({ url, endpoint = '', apiKey, options = {} }) {
    const response = await fetch(
      new URL(endpoint, url || process.env.BOLD_API_URL).href,
      {
        ...options,
        headers: {
          Authorization: `x-api-key ${apiKey || process.env.BOLD_API_KEY}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      },
    );
    return await response.json();
  },
};

module.exports = httpClient;
