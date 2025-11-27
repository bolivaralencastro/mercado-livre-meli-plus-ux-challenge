export enum ViewState {
  ENTRY = 'ENTRY',
  DETAILS = 'DETAILS',
  SELECTION = 'SELECTION',
  ADD_CARD = 'ADD_CARD',
  MANAGEMENT = 'MANAGEMENT',
  METHOD_INFO = 'METHOD_INFO',
  ADD_BALANCE = 'ADD_BALANCE',
  ADD_METHOD_SELECTION = 'ADD_METHOD_SELECTION'
}

export interface PaymentMethod {
  id: string;
  type: 'mastercard' | 'visa' | 'account' | 'new' | 'apple_pay' | 'pix' | 'boleto' | 'debit_account' | 'pix_recurring' | 'paypal' | 'ticket';
  title: string;
  subtitle?: string;
  last4?: string;
  iconColor?: string[];
  isPrimary?: boolean; 
}
