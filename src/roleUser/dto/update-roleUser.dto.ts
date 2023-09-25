import {
    IsString,
    IsNotEmpty,
    IsNumber
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly role_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly role_description: string;

}
