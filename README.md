[![Coverage Status](https://coveralls.io/repos/github/boterop/bold-api-sdk/badge.svg?branch=add-types)](https://coveralls.io/github/boterop/bold-api-sdk?branch=add-types)
![NPM Type Definitions](https://img.shields.io/npm/types/bold-api-sdk)

# bold-api-sdk

A Node.js library for interacting with the Bold API, providing seamless integration to manage payments, customers, and transactions efficiently.

## Installation

```bash
npm install bold-api-sdk
```

## Usage

[Create api key](https://www.developers.bold.co/pagos-en-linea/llaves-de-integracion)

### Payment Link

## Get

```js
import { paymentLink } from 'bold-api-sdk';

const response = await paymentLink.get('bold-identity-key', 'LNK_EX95SG8SZT');

console.log(response);
```

#### Response

```json
{
  "id": "LNK_EX95SG8SZT",
  "total": 0,
  "status": "ACTIVE",
  "expiration_date": 1736984191779000000,
  "description": null,
  "api_version": 1,
  "subtotal": 0,
  "tip_amount": 0,
  "taxes": [],
  "creation_date": 1736982392918743600,
  "payment_method": null,
  "transaction_id": null,
  "amount_type": "OPEN",
  "is_sandbox": true,
  "callback_url": null
}
```

## Create

```js
import { paymentLink } from 'bold-api-sdk';

const response = await paymentLink.create('bold-identity-key', {
  amountType: 'CLOSE',
  description: 'Payment for order order-id',
  payerEmail: 'test@example.org',
  amount: 300,
  tipAmount: 0,
  currency: 'USD',
  callbackUrl: 'https://example.org/return',
  expirationMinutes: 30,
  iva: 19,
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
