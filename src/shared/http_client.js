const formatUrl = (base, endpoint) => {
  const baseUrl = base.endsWith('/') ? base.slice(0, -1) : base;
  const formattedEndpoint = endpoint.startsWith('/')
    ? endpoint.slice(1)
    : endpoint;

  return `${baseUrl}/${formattedEndpoint}`;
};

const httpClient = {
  fetch: async ({ url, endpoint = '', apiKey, options = {} }) =>
    fetch(
      formatUrl(
        url || process.env.BOLD_API_URL || 'https://integrations.api.bold.co',
        endpoint,
      ),
      {
        ...options,
        headers: {
          Authorization: `x-api-key ${apiKey || process.env.BOLD_API_KEY}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      },
    ).then(response => response.json()),
};

module.exports = httpClient;
