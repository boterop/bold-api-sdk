global.fetch = jest.fn((url, options) =>
  Promise.resolve({
    json: () => Promise.resolve({ url, options }),
  }),
);
