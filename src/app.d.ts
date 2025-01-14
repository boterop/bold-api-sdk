declare module 'bold-api-sdk' {
  /**
   * Represents an order to be processed.
   */
  export interface Order {
    amountType: 'OPEN' | 'CLOSE';
    description: string;
    payerEmail: string;
    amount: number;
    callbackUrl: string;
    expirationMinutes: number;
    currency: string;
  }

  /**
   * Response for creating a payment link.
   */
  export interface LinkResponse {
    payment_link: string;
    url: string;
  }

  /**
   * Response for listing payment methods.
   */
  export interface MethodsResponse {
    payment_methods: {
      [key: string]: {
        max: number;
        min: number;
      };
    };
  }

  /**
   * Represents an error returned by the API.
   */
  export interface Error {
    type?: string;
    title?: string;
    status_code?: number;
    detail?: string;
  }

  /**
   * Generic API response.
   */
  export interface BoldResponse<T = any> {
    payload: T;
    errors: Error[];
  }

  /**
   * Bold API key.
   */
  export type BoldApiKey = string | undefined | null;

  /**
   * Payment link operations.
   */
  export const paymentLink: {
    create: (
      apiKey: BoldApiKey,
      order: Order,
    ) => Promise<BoldResponse<LinkResponse>>;
  };

  /**
   * Payment methods operations.
   */
  export const paymentMethods: {
    list: (apiKey: BoldApiKey) => Promise<BoldResponse<MethodsResponse>>;
  };
}
