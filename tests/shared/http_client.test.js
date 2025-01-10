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
  });
});
