declare module 'bold-api-sdk' {
  export type AmountType = 'OPEN' | 'CLOSE';

  export interface Order {
    amountType?: AmountType;
    description?: string;
    payerEmail?: string;
    amount?: number;
    tipAmount?: number;
    callbackUrl?: string;
    expirationMinutes?: number;
    currency?: string;
    iva?: number;
  }

  export interface LinkResponse {
    payment_link: string;
    url: string;
  }

  export interface MethodsResponse {
    payment_methods: {
      [key: string]: {
        max: number;
        min: number;
      };
    };
  }

  export interface BoldError {
    type?: string;
    title?: string;
    status_code?: number;
    detail?: string;
  }

  export interface BoldResponse<T = any> {
    payload: T;
    errors: BoldError[];
  }

  export interface Tax {
    type: string;
    base: number;
    value: number;
  }

  export interface GetLinkResponse {
    id: string;
    total: number;
    status: 'ACTIVE' | 'PROCESSING' | 'PAID' | 'EXPIRED';
    expiration_date: number;
    description: string | null;
    api_version: number;
    subtotal: number;
    tip_amount: number;
    taxes: Tax[];
    creation_date: number;
    payment_method: string | null;
    transaction_id: string | null;
    amount_type: AmountType;
    is_sandbox: boolean;
    callback_url: string | null;
  }

  export type BoldApiKey = string | undefined | null;

  export const paymentLink: {
    get: (apiKey: BoldApiKey, id: string) => Promise<GetLinkResponse>;
    create: (
      apiKey: BoldApiKey,
      order: Order,
    ) => Promise<BoldResponse<LinkResponse>>;
  };

  export const paymentMethods: {
    list: (apiKey: BoldApiKey) => Promise<BoldResponse<MethodsResponse>>;
  };
}
