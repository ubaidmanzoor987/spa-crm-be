import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsArray
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly permission_name: string;

    // @ApiProperty()
    // @IsNotEmpty()
    // @IsNumber()
    // readonly role_id: number;

    // @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    // readonly is_allowed: string;

}
