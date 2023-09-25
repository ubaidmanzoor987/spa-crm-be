import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsArray
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly actual_price: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly required_therapist: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    readonly amenitiesId: Array<number>;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly branch_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly duration: string;
}
