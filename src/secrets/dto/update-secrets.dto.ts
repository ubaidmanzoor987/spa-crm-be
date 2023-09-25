import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsArray
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSecretsDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly secret_code: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly secret_key: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly campaign_email: string;

}
