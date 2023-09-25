import {
    IsString,
    IsNotEmpty,
    IsNumber
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRolePermissionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly role_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly permission_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly is_allowed: string;

}
