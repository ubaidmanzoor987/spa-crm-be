import { Gender } from './../../shared/enum/gender';
import { Roles } from './../../shared/enum/roles';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsISO8601 } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly id?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly firstName?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly lastName?: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(Gender)
    readonly gender?: Gender;

    @ApiProperty()
    @IsOptional()
    @IsISO8601()
    readonly dob?: string;

    @ApiProperty()
    @IsOptional()
    @IsEnum(Roles)
    readonly role?: Roles;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly branch_id?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly phone?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly department?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly salary?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly presentAddress?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly permanentAddress?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly passport?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly idCard?: string;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly commission_per_service?: string;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly profile_picture?: string;
}
