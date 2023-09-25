import { Currency } from './../currency.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CurrencyDto {

    @ApiProperty()
    readonly currencyType: string;

    @ApiProperty()
    readonly exchangeRate: string;

    constructor(currency: Currency) {
        this.currencyType = currency.currencyType;
        this.exchangeRate = currency.exchangeRate;
    }
}
