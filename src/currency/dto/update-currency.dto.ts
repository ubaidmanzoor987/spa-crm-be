import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCurrencyDto {
    @ApiProperty()
    @IsString()
    readonly id: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly currencyType?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly exchangeRate?: string;
}
