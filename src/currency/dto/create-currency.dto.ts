import { ApiProperty } from '@nestjs/swagger';

export class CreateCurrencyDto {
    @ApiProperty()
    readonly currencyType: string;

    @ApiProperty()
    readonly exchangeRate: string;
}
