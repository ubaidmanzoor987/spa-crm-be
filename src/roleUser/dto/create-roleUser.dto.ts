import {
    IsString,
    IsNotEmpty
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly role_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly role_description: string;

}
