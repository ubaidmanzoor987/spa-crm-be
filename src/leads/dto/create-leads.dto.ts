import {
    IsString,
    IsNotEmpty,
    IsNumber
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLeadsDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly visit_phone_number: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly branch_id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly visit_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly visit_date: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly visit_time: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly social_platform: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly action_performed: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly secret_id: number;


}
