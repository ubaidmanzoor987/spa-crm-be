import {
    IsString,
    IsNotEmpty
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRolePermissionDto {
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
