const formatUrl = (base, endpoint) => {
  const baseUrl = base.endsWith('/') ? base.slice(0, -1) : base;
  const formattedEndpoint = endpoint.startsWith('/')
    ? endpoint.slice(1)
    : endpoint;

  return `${baseUrl}/${formattedEndpoint}`;
};

const httpClient = {
  async fetch({ url, endpoint = '', apiKey, options = {} }) {
    const response = await fetch(
      formatUrl(url || process.env.BOLD_API_URL, endpoint),
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
