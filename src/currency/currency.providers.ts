import { Currency } from './currency.entity';

export const currencyProviders = [
    { provide: 'CurrencyRepository', useValue: Currency },
];
