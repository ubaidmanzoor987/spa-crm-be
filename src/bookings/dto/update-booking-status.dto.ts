import { IsString, IsNumber, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookingStatusDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly status: string;

    @ApiProperty()
    readonly cash_payment: string;

    @ApiProperty()
    readonly card_payment: string;
}
