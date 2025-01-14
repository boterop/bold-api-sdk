const httpClient = require('../../src/shared/http_client');

describe('httpClient', () => {
  const URL = 'https://example.org';
  const ENDPOINT = '/test';
  const API_KEY = 'api-key';

  describe('fetch', () => {
    it('should return a response', async () => {
      const response = await httpClient.fetch({
        url: URL,
        endpoint: ENDPOINT,
        apiKey: API_KEY,
      });
      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(Object);
      expect(response.url).toBe(`${URL}${ENDPOINT}`);
      expect(response.options.headers.Authorization).toBe(
        `x-api-key ${API_KEY}`,
      );
      expect(response.options.headers['Content-Type']).toBe('application/json');
    });

    it('should parse url with / at the end', async () => {
      const response = await httpClient.fetch({
        url: URL + '/',
        endpoint: ENDPOINT.replace('/', ''),
        apiKey: API_KEY,
      });
      expect(response.url).toBe(`${URL}${ENDPOINT}`);
    });

    it('should get api key from process.env if not provided', async () => {
      process.env.BOLD_API_KEY = API_KEY;

      const response = await httpClient.fetch({
        url: URL,
        endpoint: ENDPOINT,
      });

      expect(response.url).toBe(`${URL}${ENDPOINT}`);
      expect(response.options.headers.Authorization).toBe(
        `x-api-key ${API_KEY}`,
      );
    });

    it('should use just url if no endpoint is provided', async () => {
      const response = await httpClient.fetch({
        url: URL,
      });
      expect(response.url).toBe(`${URL}/`);
    });

    it('should use default url if no url is provided', async () => {
      const response = await httpClient.fetch({
        endpoint: ENDPOINT,
      });
      expect(response.url).toBe(`https://integrations.api.bold.co${ENDPOINT}`);
    });

    it('should get url from process.env if not provided', async () => {
      process.env.BOLD_API_URL = URL;

      const response = await httpClient.fetch({
        endpoint: ENDPOINT,
      });
      expect(response.url).toBe(`${URL}${ENDPOINT}`);
    });
  });
});
