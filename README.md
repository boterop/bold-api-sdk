[![Coverage Status](https://coveralls.io/repos/github/boterop/bold/badge.svg?branch=main)](https://coveralls.io/github/boterop/bold?branch=main)

# bold-api-sdk

A Node.js library for interacting with the Bold API, providing seamless integration to manage payments, customers, and transactions efficiently.

## Installation

```bash
npm install bold-api-sdk
```

## Usage

### Payment Link

```js
import { paymentLink } from 'bold-api-sdk';

const response = await paymentLink.create('bold-identity-key', {
  amountType: 'CLOSE',
  description: 'Payment for order order-id',
  payerEmail: 'test@example.org',
  amount: 300,
  currency: 'USD',
  callbackUrl: 'https://example.org/return',
  expirationMinutes: 30,
});

console.log(response);
```

or

```js
import { paymentLink } from 'bold-api-sdk';

const response = await paymentLink.create('bold-identity-key', {
  amountType: 'OPEN',
  description: 'Payment for order order-id',
  payerEmail: 'test@example.org',
  callbackUrl: 'https://example.org/return',
  expirationMinutes: 30,
});

console.log(response);
```

#### Response

```json
{
  "payload": {
    "payment_link": "LNK_EX95SG8SZT",
    "url": "https://checkout.bold.co/payment/LNK_EX95SG8SZT"
  },
  "errors": []
}
```

### Payment Methods

```js
import { paymentMethods } from 'bold-api-sdk';

const response = await paymentMethods.list('bold-identity-key');

console.log(response);
```

#### Response

```json
{
  "payload": {
    "payment_methods": {
      "CREDIT_CARD": {
        "max": 10000000,
        "min": 1000
      },
      "PSE": {
        "max": 10000000,
        "min": 1000
      },
      "BOTON_BANCOLOMBIA": {
        "max": 10000000,
        "min": 1000
      },
      "NEQUI": {
        "max": 10000000,
        "min": 1000
      }
    }
  },
  "errors": []
}
```
