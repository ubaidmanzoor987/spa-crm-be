import { Currency } from '../currency.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetCurrencyResponseDto {
    @ApiProperty()
    readonly id: string;
    
    @ApiProperty()
    readonly currencyType: string;

    @ApiProperty()
    readonly exchangeRate: string;

    constructor(currency: Currency) {
        this.id = currency.id;
        this.currencyType = currency.currencyType;
        this.exchangeRate = currency.exchangeRate;
    }
}
