const fs = require('fs');
const path = require('path');
const boldApiSdk = require('../src/app');

const fileToExportKey = key => {
  const newKey = key
    .split('.')
    .shift()
    .split('_')
    .map(s => s[0].toUpperCase() + s.slice(1))
    .join('');

  return newKey[0].toLowerCase() + newKey.slice(1);
};

describe('boldApiSdk', () => {
  it('should export all domains', () => {
    const domains = fs.readdirSync(path.join(__dirname, '../src/domain'));

    for (const domain of domains) {
      const key = fileToExportKey(domain);
      expect(boldApiSdk[key]).toBeDefined();
    }
  });
});
