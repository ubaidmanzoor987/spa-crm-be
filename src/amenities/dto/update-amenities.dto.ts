import {
    IsString,
    IsNumber,
    IsNotEmpty
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAmenitieDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;


    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly branch_id: number;
}
