declare module 'bold-api-sdk' {
  export interface Order {
    amountType?: 'OPEN' | 'CLOSE';
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

  export type BoldApiKey = string | undefined | null;

  export const paymentLink: {
    create: (
      apiKey: BoldApiKey,
      order: Order,
    ) => Promise<BoldResponse<LinkResponse>>;
  };

  export const paymentMethods: {
    list: (apiKey: BoldApiKey) => Promise<BoldResponse<MethodsResponse>>;
  };
}
