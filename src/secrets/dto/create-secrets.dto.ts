import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsArray
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSecretsDto {
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
