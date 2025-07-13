import User from '@/models/user/user.model';

export type CardType = 'CREDIT' | 'DEBIT' | 'PREPAID' | 'VCN' | string;
export type CardNetwork = 'Mastercard' | 'Visa' | 'American Express' | 'Discover' | string;
export type Currency = 'USD' | 'CAD' | 'MXN' | string;

export enum CurrencySymbols {
  USD = '$', CAD = 'CA$', MXN = 'MX$', EUR = '€', GBP = '£',
  JPY = '¥', AUD = 'AU$', CHF = 'CHF', CNY = 'CN¥', HKD = 'HK$',
  INR = '₹', KRW = '₩', NZD = 'NZ$', RUB = '₽', SGD = 'S$',
  ZAR = 'R', BRL = 'R$',
}
export enum CryptoCurrencies {
  BTC = 'BTC', ETH = 'ETH', LTC = 'LTC', XRP = 'XRP', SOL = 'SOL'
}

export enum CardIssuersUS {
  Chase = 'Chase',
  BankOfAmerica = 'Bank of America',
  Citi = 'Citi',
  WellsFargo = 'Wells Fargo',
  AmericanExpress = 'American Express',
  CapitalOne = 'Capital One',
  Discover = 'Discover',
  Mastercard = 'Mastercard',
  Visa = 'Visa',
  Synchrony = 'Synchrony',
  USBancorp = 'US Bancorp',
  Barclays = 'Barclays',
  GoldmanSachs = 'Goldman Sachs',
  TDBank = 'TD Bank',
  USAA = 'USAA',
}
export type CardIssuer = keyof typeof CardIssuersUS;

export type PaymentType = {
  id: string; // paymentId
  cardholder: User;
  alias?: string;
  currency: Currency;
  issuer: CardIssuer;
  cardType: CardType;
  network: CardNetwork;
  brand?: string;
  lastFour: string;
  expiresMonth: string;
  expiresYear: string;
  creationDate?: Date;
  lastUpdateDate?: Date;
  isDefault?: boolean;
  isVCN?: boolean;
  displayIcon?: string;
}
